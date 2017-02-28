const signupTemplate = require('./signupTemplate.js')

module.exports = (credentials, collectionName, db) => {
    return signupTemplate(credentials, collectionName, db)
}