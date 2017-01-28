const chai = require('chai')
const expect = chai.expect
const checkPassword = require('../../../src/backend/checkPassword.js')



describe("checkPassword", () => {       
    it("returns true when user password matches password in the database", () => {
        const userPassword = "actual_password"
        const dbPassword = "actual_password"
        const answer = checkPassword(userPassword, dbPassword)
        expect(answer).to.be.true
    })
    it("returns false when user password doesn't match password in the database ", () => {
        const userPassword = "actual_password"
        const dbPassword = "fake_password"
        const answer = checkPassword(userPassword, dbPassword)
        expect(answer).to.be.false
    })
})