const chai = require('chai')
const expect = chai.expect
const authenticate = require("../../../src/backend/authenticate.js")


describe("authenticate", () => {
    it("returns true wrapped in JSON when auth data from user and database match", () => {
        const authData = {username: "john_smith", password: "secretpassword11"}
        const authObj = JSON.stringify(authData)
        const expected = JSON.stringify({result: true})
        expect(authenticate(authObj)).to.equal(expected)
    })
    
    const expected = JSON.stringify({result: false})
    it("returns false wrapped in JSON when username is not found in database", () => {
        const authData = {username: "fake_username", password: "password125"}
        const authObj = JSON.stringify(authData)
        expect(authenticate(authObj)).to.equal(expected)
    })
    it("returns false wrapped in JSON when passwords do not match", () => {
        const authData = {username: "john_smith", password: "password"}
        const authObj = JSON.stringify(authData)
        expect(authenticate(authObj)).to.equal(expected)
    })
})