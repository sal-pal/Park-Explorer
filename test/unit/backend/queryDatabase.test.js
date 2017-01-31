const chai = require('chai')
const expect = chai.expect
const queryDatabase = require('../../../src/backend/queryDatabase.js')

//Database dependencies and data
const mongo = require('mongodb').MongoClient
const url = "mongodb://user1:password1@ds145828.mlab.com:45828/salsdatabase"





describe("queryDatabase", () => {    
    const docs = [{queryGroup: "single_result"}, {queryGroup: "multi_result1"}, {queryGroup: "multi_result2"}, {queryGroup: "multi_result3"}]    
    before((done) => {
        mongo.connect(url, (err, db) => {
            if (err) {done(err)}
            db.collection('Users').insert(docs)
            db.close()
            done()
        })       
    })
    after((done) => {
        mongo.connect(url, (err, db) => {
            if (err) {done(err)}
            for (var i=0; i < docs.length; i++) {
                db.collection('Users').remove(docs[i])  
            }
            db.close()
            done()
        })    
    })
    it("returns false when username not found in database", (done) => {
        const query = {username: "fake_username"}
    })
})



//Goal: How to deconstruct an array into a list of arguments