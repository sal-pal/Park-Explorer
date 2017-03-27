/**
        Checks to see if a user's credentials are stored in the database
        
            Arguments:
                credentials:  an object literal containing a user's credentials (visit authenticate.test.js
                       for an example).
                
                db:  a database object    
            
            Return Values:
                Returns a promise whose fulfillment value is discussed in authenticate.test.js
**/


const authenticateTemplate = require("./authenticateTemplate.js")

function authenticate (credentials, db) {
    return authenticateTemplate (credentials, db)
}

module.exports = authenticate