const queryDatabase = require("./queryDatabase.js")



function authenticateTemplate (json, db, callback) {
    return new Promise((resolve, reject) => {

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
    })      
}



module.exports = authenticateTemplate