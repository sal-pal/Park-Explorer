const signupTemplate = require('./signupTemplate.js')

module.exports = (credentials, collectionName, db) => {
    return signupTemplate(credentials, collectionName, db, () => {
        return new Promise((resolve, reject) => {
            reject()
        })
    })
}