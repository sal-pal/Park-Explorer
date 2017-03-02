/**
    Creates an account for a user by inserting their username and a salted hash version of their password into 
    the database. The salted hash is stored with the salt inside an object, with this object being assigned
    to the password property.
**/


const signupTemplate = require('./signupTemplate.js')

module.exports = (credentials, collectionName, db) => {
    return signupTemplate(credentials, collectionName, db)
}