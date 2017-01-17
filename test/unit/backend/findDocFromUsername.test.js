const chai = require('chai')
const expect = chai.expect

const mongoModule = require('mongodb') 
const mongo = mongoModule.MongoClient
const Cursor = mongoModule.Cursor

const findDocFromUsername = require('../../../src/backend/findDocFromUsername.js')
const url = "mongodb://user1:password1@ds145828.mlab.com:45828/salsdatabase"




describe("findDocFromUsername", () => {
    var collection = null    
    before(() => {
        mongo.connect(url, (err, db) => {
            if (err) {throw err}
            collection = db.collection('Users')
        })
    })
    it("returns a cursor object representing the document when passed a valid username and collection object", () => {
        const output = findDocFromUsername("john_smith", collection)
        expect(output instanceof Cursor).to.equal(true)
    })
    it("returns false when passed an invalid username or collection object", () => {
        expect(findDocFromUsername("wrong_username", collection)).to.equal(false)
    })
    
})