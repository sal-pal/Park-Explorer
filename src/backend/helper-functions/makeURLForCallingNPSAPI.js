module.exports = (parkCode, resourceProperties) => {
    const parkCodeIsString = (typeof parkCode === 'string')
    const resourcePropertiesIsString = (typeof resourceProperties === 'array')
    if (parkCodeIsString && resourcePropertiesIsString) {
        //makeURL()
    }
    else if (!parkCodeIsString) {
        throw new TypeError("Need to pass a string for parkCode parameter")
    }
    throw new TypeError("Need to pass an array for resourceProperties parameter")
}


function makeURL (parkCode, resourceProperties) {
    
}