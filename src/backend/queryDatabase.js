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