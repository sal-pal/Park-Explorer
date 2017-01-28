module.exports = (doc) => {
    if (doc === undefined) {return false}
    else {return true}
}




/**
        If not found username in database, the output will always be undefined?
            -From wha we saw with testing, if cannot find username in database, then will return empty array which returns undefined.
                +Therefore, will always recieve undefined if username not found in databs
        -checkUsername's goal is to check that username exists in database
            +If doc is undefined, then username not found in database
            +However, if doc is not undefined then the username was found
            +Therefore, not need username parameter. Only need:
                Inputs: document
                Need to check if it equals to undefined. If not, then return true. If equals to undefined, return false
**/