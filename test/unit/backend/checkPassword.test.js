const chai = require('chai')
const expect = chai.expect
const mongo = require('mongodb').MongoClient
const checkPassword = require('../../../src/backend/checkPassword.js')
const url = "mongodb://user1:password1@ds145828.mlab.com:45828/salsdatabase"



describe("checkPassword", () => {       
    const dummbyData = {username: 'john_smith', password: 'secretpassword11'}
    var document = undefined
    before(() => {
        mongo.connect(url, (err, db) => {
            if (err) {throw err}
            db.collection('Users').insert(dumbyData)
            document = checkUsername("john_smith", collection)
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
    it("returns true wrapped in json when passwords match", () => {
        console.log(document)
        const expected = JSON.stringify({result: true})
        const answer = checkPassword("secretpassword11", document)
        expect(answer).to.equal(expected)
    })
    it("returns false wrapped in json when passwords don't match", () => {
        const expected = JSON.stringify({result: false})
        const answer = checkPassword("fakepassword", document)
        expect(answer).to.equal(expected)
    })
})   