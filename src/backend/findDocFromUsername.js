module.exports = function (username, collection) {
    if (typeof username === "string") {
        //Implement funct
    }
    else {
        const errorMsg = "Need to pass a string for the username parameter"
        throw new TypeError(errorMsg)
    }
}