const chai = require("chai")
const expect = chai.expect
const makeURLForCallingNPSAPI = require('../../../src/backend/helper-functions/makeURLForCallingNPSAPI.js')


describe('makeURLForCallingNPSAPI', () => {
    it('returns correct URL when passed all correct data', () => {
        const resourceProperties = ['fullName', 'description']
        const output = makeURLForCallingNPSAPI('ACAD', resourceProperties)
        const expected = "https://developer.nps.gov/api/v0/parks?parkCode=ACAD&sort=fullName,description"
        expect(output).to.equal(expected)
    })
    it('throws error when not passed string for parkCode parameter', () => {
        const resourceProperties = ['fullName', 'description']
        const output = makeURLForCallingNPSAPI.bind(null, null, resourceProperties) 
        expect(output).to.throw("Need to pass a string for parkCode parameter")
    })
    it('throws error when not passed an array for resourceProperties parameter', () => {
        const output = makeURLForCallingNPSAPI.bind(null, 'ACAD', null) 
        expect(output).to.throw("Need to pass an array for resourceProperties parameter")
    })
})

