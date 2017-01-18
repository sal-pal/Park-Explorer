module.exports = (username, collection) => {
    const isCollection = require("./isCollection.js")
    if (typeof username === "string") {
        if (isCollection(collection)) {
            //Finish Alogorithm
        }
        else {
            const errorMsg = "Need to pass a collection object for collection parameter"
            throw new TypeError(errorMsg)
            }
    }
    else {
        const errorMsg = "Need to pass a string for username parameter"
        const typeError = new TypeError(errorMsg)        
        throw typeError
    }
}