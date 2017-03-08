module.exports = (input) => {
    if (typeof input === 'string') {
        const inputIsPropOfState = this.state.hasOwnProperty(input)
        if (inputIsPropOfState) {
            var result = {}
            const props = Object.keys(this.state)
            for (var i=0; i < props.length; i++) {
                const propIsPageRenderedProp = (props[i].length > 8) && (props[i].endsWith("Rendered"))
                if (propIsPageRenderedProp) {
                    if (props[i] === input) {
                        result[props[i]] = true
                    }
                    else {
                        result[props[i]] = false
                    }
                }
            }
            return result
        }
        else {throw new Error("Need to pass a string that represents a property of this.state")}
            
    }
    else {throw new TypeError("Need to pass a string")}
}