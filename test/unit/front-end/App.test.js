import React from 'react';
import App from '../../src/front-end/App.js';
import renderer from 'react-test-renderer';

test('snapshot can be taken', () => {
    const component = renderer.create(
        <App/>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
})