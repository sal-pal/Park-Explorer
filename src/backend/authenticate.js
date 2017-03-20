/**
        Checks to see if a user's credentials are stored in the database
        
            Arguments:
                json:  a json string containing a user's credentials (visit authenticate.test.js
                       for an example).
                
                db:  a database object    
            
            Return Values:
                Returns a promise whose fulfillment values are discussed in authenticate.test.js
**/


const authenticateTemplate = require("./authenticateTemplate.js")

function authenticate (credentials, db) {
    return authenticateTemplate (credentials, db)
}

module.exports = authenticate