/**
        Version of authenticate() that fails while querying the database. Only used to test
        authenticate()'s error handling
**/


const authenticateTemplate = require("./authenticateTemplate.js")


    
function authenticateWithError (json, db) {
    return authenticateTemplate(json, db, () => {
        return new Promise((resolve, reject) => {
            reject(new Error())
        })
    })
}



module.exports = authenticateWithError