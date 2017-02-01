const connect = require('./dbPromises.js').connect
const find = require('./dbPromises.js').find
const convertCursorToDoc = require('./dbPromises.js').convertCursorToDoc



module.exports = (query, collectionName, uri) => {
    return new Promise((resolve, reject) => { 
        connect(uri)
            .then(db => find(query, collectionName, db))
            .then(cursor => convertCursorToDoc(cursor))
            .then(result => {
                if (result.length > 1) {resolve(result)}
                else if (result.length === 1) {resolve(result[0])}
                else {resolve(null)}
            })
    })
}



/**
        +Connecting to the database from scratch, so need all things in order to connect to database
        +Input: URI, collection name, and query object
        +Signature: queryDatabase(query, collectionName, uri)
            -Do I need to supply arguments to all parameters?
            -The function will need these arguments in order to perform the behavior. Therefore, go into test and provide the 
            arguments to all the functions
            
            1) Connect to database
            2) Get data from database
            3) Check if have single object
                if true:
                    return single object
                if have two objects or more:
                    return the array containing javascript objects
                if have no objects in array:
                    return null
                    
            
            +convertCursorToDoc only returns only one object. checkUsername expects only one object as well
            +Should even contain checkPassword and checkUsername? These functions are not relevant right now.
            +Should focus only on queryDatabase.
            +
                    
            
**/