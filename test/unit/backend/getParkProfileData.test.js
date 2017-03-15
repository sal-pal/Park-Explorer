const chai = require("chai")
const expect = chai.expect
const chaiAsPromised = require('chai-as-promised')
const getParkProfileData = require('../../../src/backend/helper-functions/getParkProfileData.js')

chai.use(chaiAsPromised)


describe('getParkProfileData', () => {
    it("returns a promise fullfilling to an object containing correct park profile data when passed a parkIndex", () => {
        parkImgURL = "https://www.nps.gov/common/uploads/structured_data/3C7B45AE-1DD8-B71B-0B7EE131C7DFC2F5.jpg"
        const promise = getParkProfileData(1)
        expect(promise).to.eventually.have.property("profileImage", parkImgURL)
        return expect(promise).to.eventually.have.property("fullName", 'Acadia National Park')
    })
    it("throws an error when not passed a number", () => {
        const promise = getParkProfileData(null)
        return expect(promise).to.eventually.be.rejectedWith("Need to pass a number as the parkIndex")
    })
})