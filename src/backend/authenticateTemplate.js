/**
        The base function for authenticate() and authenticateWithError(). authenticateTemplate() implements the 
        Template Pattern using functions, where derived functions are created by wrapping authenticateTemplate
        while passing it a callback. This callback encapsulates the variant operation, which is the querying of 
        the database. If no callback is passed, then queryDatabase() is invoked by default. 
        
        authenticateTemplate() was created in order to derive authenticateWithError(), which simulates authenticate()'s
        handling of errors arising from queryDatabase().
    
            Arguments:
                Visit authenticate.js
                
            Return values:
                Returns a promise whose fulfillment values are discussed in authenticate.test.js
**/

const queryDatabase = require("./queryDatabase.js")
const isJSON = require("is-json")
const isDbObj = require('./helper-functions/isDbObj.js')



function authenticateTemplate (json, db, callback) {
    return new Promise((resolve, reject) => {

        if (isJSON(json) && isDbObj(db)) {
            
            function onFulfilled (result) {
              if (!result) {resolve(failure)}
                else {
                    if (credentials.password === result.password) {
                        resolve(success)
                    }
                    else {resolve(failure)}
                }
            }

            function onRejection (error) {
                const output = JSON.stringify({result: 'error'})
                resolve(output)
            }

            //Preparing client's credentials and query
            const credentials = JSON.parse(json)
            const query = {username: credentials.username}

            //Creating notifiers on authentication's succcess or failure
            const success = JSON.stringify({result: "success"})
            const failure = JSON.stringify({result: "failure"})

            if (callback === undefined) {
                queryDatabase(query, "Users", db).then(onFulfilled, onRejection)
            }  
            else if (typeof callback !== 'function') {
                const errorMsg = "Need to pass a function for callback parameter"
                throw new Error(errorMsg)
            }
            else {
                callback(query, "Users", db).then(onFulfilled, onRejection)
            }
        }
        
        else {
            if (isJSON(json) === false) {
                const errorMsg = "Need a valid json string to be passed for json parameter"
                throw new TypeError(errorMsg)
                
            }
            else {
                const errorMsg = "Need a db object to be passed for db parameter"
                throw new TypeError(errorMsg)
            }
        }
        
    })         
}



module.exports = authenticateTemplate