const chai = require("chai")
const expect = chai.expect
const prepURLForGettingNationalParkData = require('../../../src/backend/helper-functions/prepURLForGettingNationalParkData.js')


describe('prepURLForGettingNationalParkData', () => {
    it('returns correct URL when passed all correct data', () => {
        const resourceProperties = ['fullName', 'description']
        const output = prepURLForGettingNationalParkData('ACAD', resourceProperties)
        const expected = "https://developer.nps.gov/api/v0/parks?parkCode=ACAD&sort=fullName,description"
        expect(output).to.equal(expected)
    })
    it('throws error when not passed string for parkCode parameter', () => {
        const resourceProperties = ['fullName', 'description']
        const output = prepURLForGettingNationalParkData.bind(null, null, resourceProperties) 
        expect(output).to.throw("Need to pass a string for parkCode parameter")
    })
    it('throws error when not passed an array for resourceProperties parameter', () => {
        const output = prepURLForGettingNationalParkData.bind(null, 'ACAD', null) 
        expect(output).to.throw("Need to pass an array for resourceProperties parameter")
    })
})

