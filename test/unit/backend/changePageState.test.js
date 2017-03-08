const chai = require("chai")
const expect = chai.expect
const changePageState = require("../../../src/backend/helper-functions/changePageState.js")

this.state = {prop1: false, prop2: false, prop3: false}


describe("changePageState", () => {
    it("sets this.state.prop1 to true and all other properties of this.state to false when passed 'prop1'", () => {
        const result = changePageState.bind(this, 'prop1')
        expect(result.prop1).to.be.true
        expect(result.prop2).to.be.false
        expect(result.prop3).to.be.false
    })
    it("sets this.state.prop2 to true and all other properties of this.state to false when passed 'prop2'", () => {
        const result = changePageState.bind(this, 'prop2')
        expect(result.prop1).to.be.false
        expect(result.prop2).to.be.true
        expect(result.prop3).to.be.false  
    })
    it("sets this.state.prop3 to true and all other properties of this.state to false when passed 'prop3'", () => {
        const result = changePageState.bind(this, 'prop3')
        expect(result.prop1).to.be.false
        expect(result.prop2).to.be.false
        expect(result.prop3).to.be.true
    })
    it("throws an error when not passed a string", () => {
        expect(changePageState.bind(this, 0)).to.throw("Need to pass a string")
    })
    it("throws an error when passed a string that does not represent a property of this.state", () => {
        expect(changePageState.bind(this, "Wrong proeprty")).to.throw("Need to pass a string that represents a property of this.state")
    })
})