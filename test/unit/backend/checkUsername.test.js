const chai = require('chai')
const expect = chai.expect

//Target function and prerequisite functions
const checkUsername = require('../../../src/backend/checkUsername.js')
const connect = require('../../../src/backend/dbPromises.js').connect
const find = require('../../../src/backend/dbPromises.js').find
const convertCursorToDoc = require('../../../src/backend/dbPromises.js').convertCursorToDoc

//Database dependencies and data
const mongo = require('mongodb').MongoClient
const url = "mongodb://user1:password1@ds145828.mlab.com:45828/salsdatabase"
const dumbyData = {username: 'actual_username', password: 'actual_password'}




describe("checkUsername", () => {    
    before((done) => {
        mongo.connect(url, (err, db) => {
            if (err) {done(err)}
            db.collection('Users').insert(dumbyData)
            db.close()
            done()
        })        
    })
    after((done) => {
        mongo.connect(url, (err, db) => {
            if (err) {done(err)}
            db.collection('Users').remove({username: 'actual_username'})
            done()
        })    
    })
    it("returns false when username not found in database", (done) => {
        const query = {username: "fake_username"}
        connect(url)
            .then(db => find(db, "Users", query))
            .then(cursor => convertCursorToDoc(cursor))
            .then(doc => {
                const answer = checkUsername(doc)                    
                expect(answer).to.be.false
                done()
            })
            .catch(done)
    })
    it("returns true when username is found in database", (done) => {
        //Test that output is object with property called username
        const query = {username: "actual_username"}
        connect(url)
            .then(db => find(db, "Users", query))
            .then(cursor => convertCursorToDoc(cursor))
            .then(doc => {
                const answer = checkUsername(doc)
                expect(answer).to.be.true
                done()
            })
            .catch(done)
    })
})