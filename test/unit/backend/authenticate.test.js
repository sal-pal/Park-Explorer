const chai = require('chai')
const expect = chai.expect
const authenticate = require("../../../src/backend/authenticate.js")


describe("authenticate", () => {
    it("returns true when auth data from user and database match", () => {
        const authData = {username: "john_smith", password: "secretpassword11"}
        const authObj = JSON.stringify(authData)
        expect(authenticate(authObj)).to.equal(true)
    })
    it("returns false when username is not found in database", () => {
        const authData = {username: "fake_username", password: "password125"}
        const authObj = JSON.stringify(authData)
        expect(authenticate(authObj)).to.equal(false)
    })
    it("returns false when passwords do not match", () => {
        const authData = {username: "john_smith", password: "password"}
        const authObj = JSON.stringify(authData)
        expect(authenticate(authObj)).to.equal(false)
    })
})