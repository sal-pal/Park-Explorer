/**
        Version of signup() that fails while querying the database. Only used to test
        signup()'s error handling
**/


const signupTemplate = require('./signupTemplate.js')

module.exports = (credentials, collectionName, db) => {
    return signupTemplate(credentials, collectionName, db, () => {
        return new Promise((resolve, reject) => {
            reject()
        })
    })
}