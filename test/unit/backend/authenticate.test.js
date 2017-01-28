const chai = require('chai')
const expect = chai.expect
const authenticate = require("../../../src/backend/authenticate.js")

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
            db.collection('Users').remove(dumbyData)
            db.close()
        })    
    })
    it("returns json containing 'success' string when username and password are both found in database", (done) => {
        const credentials = dumbyData
        const json = JSON.stringify(credentials)
        authenticate(json)
            .then(result => {
                const expected = JSON.stringify({result: 'success'})
                expect(result).to.equal(expected)
                done()
            })
            .catch(done)
    })
    it("returns json containing 'failure' string when username is not found in database", (done) => {
        const credentials = {username: "fake_username", password: "actual_password"}
        const json = JSON.stringify(credentials)
        authenticate(json)
            .then(result => {
                const expected = JSON.stringify({result: 'failure'})
                expect(result).to.equal(expected)
                done()
            })
            .catch(done)
    })
    it("returns json containing 'failure' string when password is not found in database", (done) => {
        const credentials = {username: "actual_username", password: "fake_password"}
        const json = JSON.stringify(credentials)
        authenticate(json)
            .then(result => {
                const expected = JSON.stringify({result: 'failure'})
                expect(result).to.equal(expected)
                done()
            })
            .catch(done)
    })
    it("returns json containing 'failure' string when username and password are both not found in database", (done) => {
        const credentials = {username: "fake_username", password: "fake_password"}
        const json = JSON.stringify(credentials)
        authenticate(json) 
            .then(result => {
                const expected = JSON.stringify({result: 'failure'})
                expect(result).to.equal(expected)
                done()
            })
            .catch(done)
    })
})