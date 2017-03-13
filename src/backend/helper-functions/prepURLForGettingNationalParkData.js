/**
    Prepare url for getting info on a single national park
    
        Input: 
            parkCode: string of the national park code
            
            resourceProperties: array of strings representing resourceProperties. Follow the link on how 
                                to represent legal resourceProperties. https://developer.nps.gov/api/v0/
                                docs/resources/parks.htm
                                                                        
**/

module.exports = (parkCode, resourceProperties) => {
    const parkCodeIsString = (typeof parkCode === 'string')
    const resourcePropertiesIsArray = Array.isArray(resourceProperties)
    if (parkCodeIsString && resourcePropertiesIsArray) {
        return makeURL (parkCode, resourceProperties)
    }
    else if (!parkCodeIsString) {
        throw new TypeError("Need to pass a string for parkCode parameter")
    }
    throw new TypeError("Need to pass an array for resourceProperties parameter")
}


function makeURL (parkCode, resourceProperties) {
    var endpointStem = "https://developer.nps.gov/api/v0/parks?parkCode=" + parkCode + "&sort="
    return endpointStem + resourceProperties.join()
}