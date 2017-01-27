module.exports = (username, doc) => {
    if (typeof username === "string") {

    }
    else {
        const errorMsg = "Need to pass a string for username parameter"
        const typeError = new TypeError(errorMsg)        
        throw typeError
    }
}


        //else {
            //const errorMsg = "Need to pass a document object for document parameter"
            //throw new TypeError(errorMsg)
            //}