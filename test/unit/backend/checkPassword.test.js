const chai = require('chai')
const expect = chai.expect
const mongo = require('mongodb').MongoClient
const checkUsername = require('../../../src/backend/checkUsername.js')
const checkPassword = require('../../../src/backend/checkPassword.js')
const url = "mongodb://user1:password1@ds145828.mlab.com:45828/salsdatabase"



describe("checkUsername", () => {       
    var collection = null
    before(() => {
        mongo.connect(url, (err, db) => {
            if (err) {throw err}
            collection = db.collection('Users')
        })
    })
    it("returns false wrapped in json when username not found in collection", () => {
        const expected = JSON.stringify({result: false})
        const answer = checkUsername("jack_smith", collection)
        expect(answer).to.equal(expected)  
    })
    it("returns document when username is found in collection", () => {
        //Test that output is object with property called username
        const document = checkUsername("john_smith", collection)
        expect(document).to.have.property("username")
    })
})

describe("checkPassword", () => {       
    it("returns true wrapped in json when passwords match", () => {
        const expected = JSON.stringify({result: true})
        const answer = checkPassword(password, result)
        expect(answer).to.equal(expected)
    })
    it("returns false wrapped in json when passwords don't match", () => {
        const expected = JSON.stringify({result: false})
        expect(checkPassword(password, result)).to.equal(expected)
    })
})