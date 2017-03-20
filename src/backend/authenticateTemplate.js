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
const sha512 = require("./helper-functions/sha512.js")
const isDbObj = require('./helper-functions/isDbObj.js')
const isCredentialObj = require('./helper-functions/isCredentialObj.js')



function authenticateTemplate (credentials, db, callback) {
    return new Promise((resolve, reject) => {

        if (isCredentialObj(credentials) && isDbObj(db)) {
            
            function onFulfilled (result) {
                if (!result) {resolve(failure)}   
                else {
                    const passwordFromDatabase = result.password.passwordHash
                    const passwordFromUser = sha512(credentials.password, result.password.salt).passwordHash
                    if (passwordFromUser === passwordFromDatabase) {
                        resolve(success)
                    }
                    else {resolve(failure)}
                }
            }

            function onRejection (error) {
                const output = JSON.stringify({result: 'error'})
                resolve(output)
            }

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
        
        else if (isCredentialObj(credentials) === false) {
            const errorMsg = "Need an object containing username and password properties to be passed for credentials parameter"
            throw new TypeError(errorMsg)

        }
        else {
            const errorMsg = "Need a db object to be passed for db parameter"
            throw new TypeError(errorMsg)
        }
        
    })         
}



module.exports = authenticateTemplate