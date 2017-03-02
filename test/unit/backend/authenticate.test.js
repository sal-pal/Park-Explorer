const chai = require("chai")
const expect = chai.expect
const chaiAsPromised = require('chai-as-promised')
const fs = require('fs')

const authenticate = require("../../../src/backend/authenticate.js")
const authenticateWithError = require("../../../src/backend/authenticateWithError.js")


//Database dependencies and data
const mongo = require('mongodb').MongoClient
const connect = require("../../../src/backend/helper-functions/dbPromises.js").connect
const filename = require('path').resolve(__dirname, '../../../.dburl')
const url = fs.readFileSync(filename).toString()
const dumbyData = {username: 'actual_username', password: 'actual_password'}
var db = null 

const saltHashThePassword = require('../../../src/backend/helper-functions/saltHashThePassword.js')

//Configuring chai to use chai-as-promised
chai.use(chaiAsPromised)





describe("authenticate", () => {
    before((done) => {
        mongo.connect(url, (err, db) => {
            if (err) {throw err}
            dumbyData.password = saltHashThePassword(dumbyData.password)
            db.collection('Users').insert(dumbyData)
            db.close()
            done()
        })
    })
    after((done) => {
        mongo.connect(url, (err, db) => {
            if (err) {throw err}
            db.collection('Users').remove({username: dumbyData.username})
            db.close()
            done()
        })
    })
    it("returns json containing 'success' string when username and password are both found in database", () => {
        const promise = connect(url).then((database) => {
            db = database 
            const credentials = {username: "actual_username", password: "actual_password"}
            const json = JSON.stringify(credentials)
            return authenticate(json, db)
        })
        const expected = JSON.stringify({result: 'success'})
        return expect(promise).to.eventually.equal(expected)
    })
    it("returns json containing 'failure' string when username is not found in database", () => {
        const credentials = {username: "fake_username", password: "actual_password"}
        const json = JSON.stringify(credentials)
        const promise =  authenticate(json, db)
        const expected = JSON.stringify({result: 'failure'})
        return expect(promise).to.eventually.equal(expected)
    })
    it("returns json containing 'failure' string when password is not found in database", () => {
        const credentials = {username: "actual_username", password: "fake_password"}
        const json = JSON.stringify(credentials)        
        const promise = authenticate(json, db)
        const expected = JSON.stringify({result: 'failure'})
        return expect(promise).to.eventually.equal(expected)
    })
    it("returns json containing 'failure' string when username and password are both not found in database", () => {
        const credentials = {username: "fake_username", password: "fake_password"}
        const json = JSON.stringify(credentials)        
        const promise = authenticate(json, db)
        const expected = JSON.stringify({result: 'failure'})
        return expect(promise).to.eventually.equal(expected)
    })
    it("returns json containing 'error' string when error occurs during authenticate's asynchronous operations", () => {
        const credentials = {username: "fake_username", password: "fake_password"}
        const json = JSON.stringify(credentials)        
        const promise = authenticateWithError(json, db)
        const expected = JSON.stringify({result: 'error'})
        return expect(promise).to.eventually.equal(expected)
    })
    it("throws an error when not passed a json string for json parameter", () => {
        const promise = authenticate("Not JSON", db)
        const errorMsg = "Need a valid json string to be passed for json parameter"
        return expect(promise).to.eventually.be.rejectedWith(errorMsg)
    })
    it("throws an error when not passed a db object for db parameter", () => {
        const credentials = {username: "fake_username", password: "fake_password"}
        const json = JSON.stringify(credentials)                    
        const promise = authenticate(json, "Not a db objectgetRandomString")
        const errorMsg = "Need a db object to be passed for db parameter"
        return expect(promise).to.eventually.be.rejectedWith(errorMsg)
    })
})