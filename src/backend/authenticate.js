const queryDatabase = require("./queryDatabase.js")

module.exports = (json) => {
    return new Promise((resolve, reject) => {
        
        //Preparing client's credentials and query
        const credentials = JSON.parse(json)
        const query = {username: credentials.username}
        
        //Creating notifiers on authentication's succcess or failure
        const success = JSON.stringify({result: "success"})
        const failure = JSON.stringify({result: "failure"})
        
        queryDatabase(query, "Users", getDatabaseURI())
            .then((result) => {
                if (!result) {return failure}
                else {
                    if (credentials.password === result.password) {
                        return success
                    }
                    else {return failure}
                }
            })
    })
}


function getDatabaseURI() {
    const fs = require('fs')
    const filename = require('path').resolve(__dirname, '../../.dburl')
    return fs.readFileSync(filename).toString()
}