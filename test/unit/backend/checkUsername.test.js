const chai = require('chai')
const expect = chai.expect
const mongo = require('mongodb').MongoClient
const checkUsername = require('../../../src/backend/checkUsername.js')
const url = "mongodb://user1:password1@ds145828.mlab.com:45828/salsdatabase"


describe("checkUsername", () => {    
    var collection = undefined
    const dummbyData = {username: 'john_smith', password: 'secretpassword11'}
    before(() => {
        mongo.connect(url, (err, db) => {
            if (err) {throw err}
            db.collection('Users').insert(dumbyData)
            collection = db.collection('Users')
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
    it("returns an error message when not passed a string for username parameter", () => {
        const errorMsg = "Need to pass a string for username parameter"
        expect(checkUsername.bind(null, null, collection)).to.throw(errorMsg)
    })
    it("returns an error message when not passed a collection object for collection parameter", () => {
        const errorMsg = "Need to pass a collection object for collection parameter"
        expect(checkUsername.bind(null, "john_smith", "Not a collection")).to.throw(errorMsg) 
    })
})