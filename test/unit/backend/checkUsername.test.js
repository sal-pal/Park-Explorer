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
const dumbyData = {username: 'john_smith', password: 'secretpassword11'}




describe("checkUsername", () => {    
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
    it("returns false when username not found in database", (done) => {
        const query = {username: "wrong_username"}
        connect(url)
            .then(db => find(db, "Users", query))
            .then(cursor => convertCursorToDoc(cursor))
            .then(doc => {
                const answer = checkUsername(query.username, doc)                    
                expect(answer).to.be.false
                done()
            })
            .catch(done)
    })
    it("returns true when username is found in database", (done) => {
        //Test that output is object with property called username
        const query = {username: "john_smith"}
        connect(url)
            .then(db => find(db, "Users", query))
            .then(cursor => convertCursorToDoc(cursor))
            .then(doc => {
                const answer = checkUsername(query.username, doc)
                expect(answer).to.be.true
                done()
            })
            //then() treats failed expectations as an actual error, so need to pass error to mocha's done() to avoid inaccurate tests.
            .catch(done)
    })
    it("returns an error message when not passed a string for username parameter", () => {
        const errorMsg = "Need to pass a string for username parameter"
        expect(checkUsername.bind(null, null, {})).to.throw(errorMsg)
    })
    it("returns an error message when not passed a document object for document parameter", () => {
        //pass a null value for document parameter
        const errorMsg = "Need to pass a document object for document parameter"
        expect(checkUsername.bind(null, "username", null)).to.throw(errorMsg)
    })
})