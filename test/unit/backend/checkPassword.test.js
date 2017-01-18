const chai = require('chai')
const expect = chai.expect
const mongo = require('mongodb').MongoClient
const checkUsername = require('../../../src/backend/checkUsername.js')
const checkPassword = require('../../../src/backend/checkPassword.js')
const url = "mongodb://user1:password1@ds145828.mlab.com:45828/salsdatabase"


describe("Authentication code has", () => {
    var collection = null    
    before(() => {
        mongo.connect(url, (err, db) => {
            if (err) {throw err}
            collection = db.collection('Users')
        })
    })
    describe("checkUsername", () => {       
        it("returning false wrapped in json when username not found in collection", () => {
            const expected = JSON.stringify({result: false})
            const answer = checkUsername("jack_smith", collection)
            expect(answer).to.equal(expected)  
        })
        it("returning document when username is found in collection", () => {
            //Test that output is object with property called username
            const document = checkUsername("john_smith", collection)
            expect(document).to.have.property("username")
        })
        it("returning an error message when not passed a string for username parameter", () => {
            const errorMsg = "Need to pass a string for username parameter"
            expect(checkUsername.bind(null, null, collection)).to.throw(errorMsg)
        })
        it("returning an error message when not passed a collection object for collection parameter", () => {
            const errorMsg = "Need to pass a collection object for collection parameter"
            expect(checkUsername.bind(null, "john_smith", "Not a collection")).to.throw(errorMsg) 
        })

    })   
})