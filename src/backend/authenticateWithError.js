const authenticateTemplate = require("./authenticateTemplate.js")


    
function authenticateWithError (json, db) {
    return authenticateTemplate(json, db, () => {
        return new Promise((resolve, reject) => {
            reject(new Error())
        })
    })
}



module.exports = authenticateWithError