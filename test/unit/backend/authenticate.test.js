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
const connect = require("../../../src/backend/dbPromises.js").connect
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
        const promise = connect(url).then((db) => {
            const credentials = dumbyData
            const json = JSON.stringify(credentials)
            return authenticate(json)
        })
        const expected = JSON.stringify({result: 'success'})
        return expect(promise).to.eventually.equal(expected)
    })
    it("returns json containing 'failure' string when username is not found in database", () => {
        const promise = connect(url).then((db) => {
            const credentials = {username: "fake_username", password: "actual_password"}
            const json = JSON.stringify(credentials)
            return authenticate(json, db)
        })
        const expected = JSON.stringify({result: 'failure'})
        return expect(promise).to.eventually.equal(expected)
    })
    it("returns json containing 'failure' string when password is not found in database", () => {
        const promise = connect(url).then((db) => {
            const credentials = {username: "actual_username", password: "fake_password"}
            const json = JSON.stringify(credentials)
            return authenticate(json, db)
        })
        const expected = JSON.stringify({result: 'failure'})
        return expect(promise).to.eventually.equal(expected)
    })
    it("returns json containing 'failure' string when username and password are both not found in database", () => {
        const promise = connect(url).then((db)=> {
            const credentials = {username: "fake_username", password: "fake_password"}
            const json = JSON.stringify(credentials)
            return authenticate(json, db)
        })
        const expected = JSON.stringify({result: 'failure'})
        return expect(promise).to.eventually.equal(expected)
    })
    it("returns json containing 'error' string when error occurs during authenticate's asynchronous operations", () => {
        const promise = connect(url).then((db) => {
            const credentials = {username: "fake_username", password: "fake_password"}
            const json = JSON.stringify(credentials)
            return authenticateWithError(json, db)
        })
        const expected = JSON.stringify({result: 'error'})
        return expect(promise).to.eventually.equal(expected)
    })
})