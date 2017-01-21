const expect = require('chai').expect
const Db = require('mongodb').Db
const Collection = require('mongodb').Collection
const connectSynchToDb = require('../../../src/backend/authenticate.js')

describe('connectSynchToDb', () => {
    it('passes a database object to callback', () => {
        const output = connectSynchToDb(url, (db) => db)
        expect(output instanceof Db).to.equal(true)
    })
    it('returns a collection object when passed a callback that retrieves a collection', () => {
        const callback = (db) => db.collection('Users')
        const output = connectSynchToDb(url, callback)
        expect(output instanceof Collection).to.equal(true)
    })
    it('returns null when callback does not return a value', () => {
        const output = connectSynchToDb(url, (db) => {})
        expect(output).to.equal(null)
    })
})