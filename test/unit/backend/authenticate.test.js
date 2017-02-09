const chai = require('chai')
const expect = chai.expect
const chaiAsPromised = require('chai-as-promised')
const fs = require('fs')

const Authentication = require("../../../src/backend/authenticate.js")
const authenticate = (new Authentication()).authenticate
const AsynchErrorInAuthentication = require("../../../src/backend/asynchErrorInAuthentication.js")
const authenticateWithError = (new AsynchErrorInAuthentication).authenticate

//Database dependencies and data
const mongo = require('mongodb').MongoClient
const filename = require('path').resolve(__dirname, '../../../.dburl')
const url = fs.readFileSync(filename).toString()
const dumbyData = {username: 'actual_username', password: 'actual_password'}

//Configuring chai to use chai-as-promised
chai.use(chaiAsPromised)




describe("authenticate", () => {
    before(() => {
        mongo.connect(url, (err, db) => {
            if (err) {throw err}
            db.collection('Users').insert(dumbyData)
            db.close()
        })        
    })
    after(() => {
        mongo.connect(url, (err, db) => {
            if (err) {throw err}
            db.collection('Users').remove({username: 'actual_username'})
            db.close()
        })    
    })
    it("returns json containing 'success' string when username and password are both found in database", () => {
        const credentials = dumbyData
        const json = JSON.stringify(credentials)
        const expected = JSON.stringify({result: 'success'})
        return expect(authenticate(json)).to.eventually.equal(expected)
    })
    it("returns json containing 'failure' string when username is not found in database", () => {
        const credentials = {username: "fake_username", password: "actual_password"}
        const json = JSON.stringify(credentials)
        const expected = JSON.stringify({result: 'failure'})
        return expect(authenticate(json)).to.eventually.equal(expected)
    })
    it("returns json containing 'failure' string when password is not found in database", () => {
        const credentials = {username: "actual_username", password: "fake_password"}
        const json = JSON.stringify(credentials)
        const expected = JSON.stringify({result: 'failure'})
        return expect(authenticate(json)).to.eventually.equal(expected)
    })
    it("returns json containing 'failure' string when username and password are both not found in database", () => {
        const credentials = {username: "fake_username", password: "fake_password"}
        const json = JSON.stringify(credentials)
        const expected = JSON.stringify({result: 'failure'})
        return expect(authenticate(json)).to.eventually.equal(expected)
    })
    it("returns json containing 'error' string when error occurs during authenticate's asynchronous operations", () => {
        const credentials = {username: "fake_username", password: "fake_password"}
        const json = JSON.stringify(credentials)
        const expected = JSON.stringify({result: 'error'})
        const answer = authenticateWithError(json)
        return expect(answer).to.eventually.equal(expected)
    })
})