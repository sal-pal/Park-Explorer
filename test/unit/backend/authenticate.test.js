const chai = require('chai')
const expect = chai.expect
const Authentication = require("../../../src/backend/authenticate.js")
const authenticate = (new Authentication()).authenticate

//Database dependencies and data
const mongo = require('mongodb').MongoClient
const url = "mongodb://user1:password1@ds145828.mlab.com:45828/salsdatabase"
const dumbyData = {username: 'actual_username', password: 'actual_password'}




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
    const credentials = {username: "fake_username", password: "fake_password"}
    it("returns json containing 'success' string when username and password are both found in database", () => {
        const credentials = dumbyData
        const json = JSON.stringify(credentials)
        const expected = JSON.stringify({result: 'success'})
        return expect(authenticate(json)).to.eventually.equal(expected)
    })
    it("returns json containing 'failure' string when username is not found in database", () => {
        const json = JSON.stringify(credentials)
        const expected = JSON.stringify({result: 'failure'})
        return expect(authenticate(json)).to.eventually.equal(expected)
    })
    it("returns json containing 'failure' string when password is not found in database", () => {
        const json = JSON.stringify(credentials)
        const expected = JSON.stringify({result: 'failure'})
        return expect(authenticate(json)).to.eventually.equal(expected)
    })
    it("returns json containing 'failure' string when username and password are both not found in database", () => {
        const json = JSON.stringify(credentials)
        const expected = JSON.stringify({result: 'failure'})
        return expect(authenticate(json)).to.eventually.equal(expected)
    })
    it("returns json containing 'Error' if an error occured inside queryDatabase()", () => {
        const json = JSON.stringify(credentials)
        const expected = JSON.stringify({result: 'error'})
        return expect(mockAuthenticate(json)).to.eventually.equal(expected)
    })
})