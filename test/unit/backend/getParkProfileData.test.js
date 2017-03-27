const chai = require("chai")
const expect = chai.expect
const chaiAsPromised = require('chai-as-promised')
const getParkProfileData = require('../../../src/backend/helper-functions/getParkProfileData.js')

chai.use(chaiAsPromised)


describe('getParkProfileData', () => {
    it("returns a promise fullfilling to an object containing correct park profile data when passed a parkIndex", () => {
        const promise = getParkProfileData()
        expect(promise).to.eventually.have.property("fullName")
        expect(promise).to.eventually.have.property("websiteURL")
        expect(promise).to.eventually.have.property("description")
        return expect(promise).to.eventually.have.property("profileImage")
    })
})