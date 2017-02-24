import React from 'react'
import Login from '../../src/front-end/Login.js'
import renderer from 'react-test-renderer'
    
test("Login component has not changed", () => {
    const component = renderer.create(
        <Login/>
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
})