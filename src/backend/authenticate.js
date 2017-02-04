const queryDatabase = require("./queryDatabase.js")


class Authentication {
    authenticate (json, callback) {
        return new Promise((resolve, reject) => {
            
            //Preparing client's credentials and query
            const credentials = JSON.parse(json)
            const query = {username: credentials.username}

            //Creating notifiers on authentication's succcess or failure
            const success = JSON.stringify({result: "success"})
            const failure = JSON.stringify({result: "failure"})

            if (callback === undefined) {
                queryDatabase(query, "Users", getDatabaseURI())
                    .then((result) => {
                        if (!result) {resolve(failure)}
                        else {
                            if (credentials.password === result.password) {
                                resolve(success)
                            }
                            else {resolve(failure)}
                        }
                    })   
            }
            else {
                callback(query, "Users", getDatabaseURI())
                    .then((result) => {
                        if (!result) {resolve(failure)}
                        else {
                            if (credentials.password === result.password) {
                                resolve(success)
                            }
                            else {resolve(failure)}
                        }
                    })    
            }
        })      
    }
}

function getDatabaseURI() {
    const fs = require('fs')
    const filename = require('path').resolve(__dirname, '../../.dburl')
    return fs.readFileSync(filename).toString()
}



module.exports = Authentication