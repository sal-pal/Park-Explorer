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


const find = require('./helper-functions/dbPromises.js').find
const convertCursorToDoc = require('./helper-functions/dbPromises.js').convertCursorToDoc
const isDbObj = require('./helper-functions/isDbObj.js')



module.exports = (query, collectionName, db) => {
    return new Promise((resolve, reject) => { 
        
        if ((typeof collectionName === 'string') && isDbObj(db)) {
            
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
        }
        
        else {
            if (isDbObj(db) === false) {
                const errorMsg = "Need a db object to be passed for db parameter"
                throw new TypeError(errorMsg)
            }
            else {
                const errorMsg = "Need a string to be passed for collectionName parameter"
                throw new TypeError(errorMsg)   
            }
        }
        

    })
}