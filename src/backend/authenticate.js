const authenticateTemplate = require("./authenticateTemplate.js")



function authenticate (json, db) {
    return authenticateTemplate (json, db)
}



module.exports = authenticate