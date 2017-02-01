const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
const expect = chai.expect
const queryDatabase = require('../../../src/backend/queryDatabase.js')

//Database dependencies and data
const mongo = require('mongodb').MongoClient
const url = "mongodb://user1:password1@ds145828.mlab.com:45828/salsdatabase"

//Configuring chai to use chai-as-promised
chai.use(chaiAsPromised)





describe("queryDatabase", () => {    
    const docs = [{queryGroup: "single_result"}, {queryGroup: "multi_result"}, {queryGroup: "multi_result"}, {queryGroup: "multi_result"}]
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
    it("returns a single object for a query result of a single document", () => {
        const promise = queryDatabase({queryGroup: "single_result"})
        return expect(promise).to.eventually.have.property("queryGroup").to.equal("single_result")
    })
    it("returns an array of objects that corresponds to a query result of muliple documents", () => {
        const promise = queryDatabase({queryGroup: "multi_result"})
        const result = docs.slice(1,4)
        return expect(promise).to.eventually.deep.equal(result)
    })
    it('returns null when no documents are found', () => {
        
    }) 
})















