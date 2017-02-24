const chai = require("chai")
const expect = chai.expect
const chaiAsPromised = require('chai-as-promised')
const fs = require('fs')
const signup = require("../../../src/backend/signup.js")

//Database dependencies and data
const filename = require('path').resolve(__dirname, '../../../.dburl')
const url = fs.readFileSync(filename).toString()
const connect = require("../../../src/backend/helper-functions/dbPromises.js").connect

//Configuring chai to use chai-as-promised
chai.use(chaiAsPromised)

const emptyJSON = JSON.stringify({})
const credentials = JSON.stringify({username: "actual_username", password: "actual_password"})


describe("signup", () => {
    after((done) => {
        connect(url).then((db) => {
            db.collection('Users').remove({username: credentials.username})
            db.close()
            done()
        })
    })
    it("throws an error when not passed a database object for db parameter", () => {
        const promise = signup(emptyJSON, "Users")
        const errorMsg = "Need a database object to be passed for db parameter"
        return expect(promise).to.eventually.be.rejectedWith(errorMsg)
    })
    it("throws an error when not passed a string for collectionName parameter", () => {
        const promise = connect(url).then((db) => {
            return signup(emptyJSON, null, db)
        })
        const errorMsg = "Need a string to be passed for collectionName parameter"
        return expect(promise).to.eventually.be.rejectedWith(errorMsg)
    })
    it("throws an error when not passed a json string for credentials parameter", () => {
        const promise = connect(url).then((db) => {
            return signup("Not JSON", "Users", db)
        })
        const errorMsg = "Need a json string to be passed for credentials parameter"
        return expect(promise).to.eventually.be.rejectedWith(errorMsg)
    })
    it("throws an error when not passed a json string containing correct properties for credentials parameter", () => {
        const promise = connect(url).then((db) => {
            return signup(emptyJSON, "Users", db)
        })
        const errorMsg = "Need a json string containing correct properties to be passed for credentials parameter"
        return expect(promise).to.eventually.be.rejectedWith(errorMsg)
    })
    it("returns json containing 'success' when a new account is successfully created", () => {
        const promise = connect(url).then((db) => {
            return signup(credentials, "Users", db)
        })
        const expected = JSON.stringify({result: 'success'})
        return expect(promise).to.eventually.equal(expected)
    })
    it("returns json containing 'failure' when the user already has an account", () => {
        const promise = connect(url).then((db) => {
            return signup(credentials, "Users", db)
        })
        const expected = JSON.stringify({result: 'failure'})
        return expect(promise).to.eventually.equal(expected)
    })
    it("returns json containing 'error' when an error arises while checking that the user doesn't already have an account", () => {
        const promise = connect(url).then((db) => {
            return signup(credentials, "Users", db)
        })
        const expected = JSON.stringify({result: 'error'})
        return expect(promise).to.eventually.equal(expected)  
    })
})