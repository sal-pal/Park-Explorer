/**
    Returns the results of a query in the form of javascript objects.  

         Arguments:
            query:  a query object (since queryDatabase abstracts collection.find, refer to its    
                    documentation regarding how to construct a query object.

            collectionName:  a string that refers to the collection

            db:  a database object


        Return Values:
            Returns a promise whose fulfillment values are discussed in queryDatabase.test.js
**/


const find = require('./dbPromises.js').find
const convertCursorToDoc = require('./dbPromises.js').convertCursorToDoc



module.exports = (query, collectionName, db) => {
    return new Promise((resolve, reject) => { 
        
        function onRejection (error) {
            reject(error)
        }
        
        function handleQuery (result) {
            if (result.length > 1) {resolve(result)}
            else if (result.length === 1) {
                const singleResult = result.pop()
                resolve(singleResult)
            }
            else {resolve(null)}
        }
        
        find(query, collectionName, db)
            .then(cursor => convertCursorToDoc(cursor), onRejection)
            .then(handleQuery, onRejection)
    })
}