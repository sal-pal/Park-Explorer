const chai = require('chai')
const expect = chai.expect
const queryDatabase = require('../../../src/backend/queryDatabase.js')
const mongo = require('mongodb').MongoClient
const url = "mongodb://user1:password1@ds145828.mlab.com:45828/salsdatabase"

const singleResult = {queryGroup: 'single_result'}
const mulitDoc = null



describe("queryDatabase", () => {
    before(() => {
        mongo.connect(url, (err, db) => {
            if (err) {throw err}
            db.collection('Users').insert(singleResult)
            db.close()
        })        
    })
    it("returns a single object for a query result of a single document", () => {
        
    })
    it("returns an array of objects that corresponds to a query result of muliple documents", () => {
        
    })
    it('returns null when no documents are found', () => {
        
    })    
})