/**

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
            else if (result.length === 1) {resolve(result[0])}
            else {resolve(null)}
        }
        
        find(query, collectionName, db)
            .then(cursor => convertCursorToDoc(cursor), onRejection)
            .then(handleQuery, onRejection)
    })
}