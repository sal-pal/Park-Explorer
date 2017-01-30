const chai = require('chai')
const expect = chai.expect
const queryDatabase = require('../../../src/backend/queryDatabase.js')

//Database dependencies and data
const mongo = require('mongodb').MongoClient
const url = "mongodb://user1:password1@ds145828.mlab.com:45828/salsdatabase"
const singleResult = {queryGroup: "single_result"}




describe("queryDatabase", () => {    
    before(() => {
        mongo.connect(url, (err, db) => {
            if (err) {throw err}
            db.collection('Users').insert(singleResult)
            db.close()
        })       
    })
    after(() => {
        mongo.connect(url, (err, db) => {
            if (err) {throw err}
            db.collection('Users').remove(singleResult)
            db.close()
        })               
    })
    it("returns false when username not found in database", (done) => {
        const query = {username: "fake_username"}
    })
})