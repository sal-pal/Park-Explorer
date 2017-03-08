const chai = require("chai")
const expect = chai.expect
const changePageState = require("../../../src/backend/helper-functions/changePageState.js")

const state = {page1Rendered: false, page2Rendered: false, page3Rendered: false}


describe("changePageState", () => {
    it("returns an object with its page1Rendered property set to true, while all its other properties are set to false", () => {
        const result = changePageState('page1Rendered', state)
        expect(result.page1Rendered).to.be.true
        expect(result.page2Rendered).to.be.false
        expect(result.page3Rendered).to.be.false
    })
    it("returns an object with its page2Rendered property set to true, while all its other properties are set to false", () => {
        const result = changePageState('page2Rendered', state)
        expect(result.page1Rendered).to.be.false
        expect(result.page2Rendered).to.be.true
        expect(result.page3Rendered).to.be.false  
    })
    it("returns an object with its page3Rendered property set to true, while all its other properties are set to false", () => {
        const result = changePageState('page3Rendered', state)
        expect(result.page1Rendered).to.be.false
        expect(result.page2Rendered).to.be.false
        expect(result.page3Rendered).to.be.true
    })
    it("throws an error when not passed a string", () => {
        expect(changePageState.bind(this, 0, state)).to.throw("Need to pass a string")
    })
    it("throws an error when passed a string that does not represent a property of state", () => {
        expect(changePageState.bind(this, "Wrong property", state)).to.throw("Need to pass a string that represents a property of state")
    })
})