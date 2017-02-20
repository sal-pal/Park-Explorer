/**
    Goal: hash the passwords before inserting them into the database
        Input: password
        Output: an object containing hashed password with salt
        
        Make function called saltHashThePassword
        
        1) Convert password with the salt
        2) Insert salted hash into database
**/


const chai = require('chai')
const expect = chai.expect
const chaiAsPromised = require('chai-as-promised')
const fs = require('fs')

const authenticate = require("../../../src/backend/authenticate.js")
const authenticateWithError = require("../../../src/backend/authenticateWithError.js")

//Code for hashing passwords
const getRandomString = require("../../../src/backend/helper-functions/getRandomString.js")
const sha512 = require("../../../src/backend/helper-functions/sha512.js")

//Database dependencies and data
const mongo = require('mongodb').MongoClient
const connect = require("../../../src/backend/helper-functions/dbPromises.js").connect
const filename = require('path').resolve(__dirname, '../../../.dburl')
const url = fs.readFileSync(filename).toString()
const dumbyData = {username: 'actual_username', password: 'actual_password'}

//Configuring chai to use chai-as-promised
chai.use(chaiAsPromised)




function saltHashThePassword (password) {
    const salt = getRandomString(5)
    return sha512(password, salt)
}



describe("authenticate", () => {
    before(() => {
        mongo.connect(url, (err, db) => {
            if (err) {throw err}
            dumbyData.password = saltHashThePassword(dumbyData.password)
            db.collection('Users').insert(dumbyData)
            db.close()
        })        
    })
    after(() => {
        mongo.connect(url, (err, db) => {
            if (err) {throw err}
            db.collection('Users').remove({username: 'actual_username'})
            db.close()
        })
    })
    it("returns json containing 'success' string when username and password are both found in database", () => {
        const promise = connect(url).then((db) => {
            const credentials = dumbyData
            const json = JSON.stringify(credentials)
            return authenticate(json, db)
        })
        const expected = JSON.stringify({result: 'success'})
        return expect(promise).to.eventually.equal(expected)
    })
    it("returns json containing 'failure' string when username is not found in database", () => {
        const promise = connect(url).then((db) => {
            const credentials = {username: "fake_username", password: "actual_password"}
            const json = JSON.stringify(credentials)
            return authenticate(json, db)
        })
        const expected = JSON.stringify({result: 'failure'})
        return expect(promise).to.eventually.equal(expected)
    })
    it("returns json containing 'failure' string when password is not found in database", () => {
        const promise = connect(url).then((db) => {
            const credentials = {username: "actual_username", password: "fake_password"}
            const json = JSON.stringify(credentials)
            return authenticate(json, db)
        })
        const expected = JSON.stringify({result: 'failure'})
        return expect(promise).to.eventually.equal(expected)
    })
    it("returns json containing 'failure' string when username and password are both not found in database", () => {
        const promise = connect(url).then((db)=> {
            const credentials = {username: "fake_username", password: "fake_password"}
            const json = JSON.stringify(credentials)
            return authenticate(json, db)
        })
        const expected = JSON.stringify({result: 'failure'})
        return expect(promise).to.eventually.equal(expected)
    })
    it("returns json containing 'error' string when error occurs during authenticate's asynchronous operations", () => {
        const promise = connect(url).then((db) => {
            const credentials = {username: "fake_username", password: "fake_password"}
            const json = JSON.stringify(credentials)
            return authenticateWithError(json, db)
        })
        const expected = JSON.stringify({result: 'error'})
        return expect(promise).to.eventually.equal(expected)
    })
    it("throws an error when not passed a json string for json parameter", () => {
        const promise = connect(url).then((db) => {
            return authenticate("Not JSON", db)
        })
        const errorMsg = "Need a valid json string to be passed for json parameter"
        return expect(promise).to.eventually.be.rejectedWith(errorMsg)
    })
    it("throws an error when not passed a db object for db parameter", () => {
        const promise = connect(url).then((db) => {
            const credentials = {username: "fake_username", password: "fake_password"}
            const json = JSON.stringify(credentials)            
            return authenticate(json, "Not a db objectgetRandomString")
        })
        const errorMsg = "Need a db object to be passed for db parameter"
        return expect(promise).to.eventually.be.rejectedWith(errorMsg)
    })
})