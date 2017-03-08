module.exports = (input, state) => {
    if (typeof input === 'string') {
        const inputIsPropOfState = state.hasOwnProperty(input)
        if (inputIsPropOfState) {
            return assignBoolsToProps(input, state)
        }
        throw new Error("Need to pass a string that represents a property of state")
            
    }
    throw new TypeError("Need to pass a string")
}



function assignBoolsToProps(input, state) {
    var result = {}
    const props = Object.keys(state)
    for (var i=0; i < props.length; i++) {
        const prop = props[i]
        const propIsPageRenderedProp = (prop.length > 8) && (prop.endsWith("Rendered"))
        if (propIsPageRenderedProp) {
            if (prop === input) {
                result[prop] = true
            }
            else {
                result[prop] = false
            }
        }
    }
    return result
}