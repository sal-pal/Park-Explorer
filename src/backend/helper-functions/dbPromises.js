/**
        Promisifed versions of mongodb driver functions. Done in order to easily compose
        and test asynchronous functions.
**/


const mongo = require('mongodb').MongoClient

//Promisify mongclient.connect
module.exports.connect = (url) => {
    return new Promise((resolve, reject) => {
        mongo.connect(url, (err, db) => {
            if (err) {reject(err)}
            resolve(db)
        })
    })
}

//Promisify collection.find
module.exports.find = (query, collectionName, db) => {
    return new Promise((resolve, reject) => {
        const collection = db.collection(collectionName)
        //Make cursor object the fulfillment value
        collection.find(query, (err, result) => {
            if (err) {reject(err)}
            resolve(result)
        })
    })
}

module.exports.convertCursorToDoc = (cursor) => {
    return new Promise((resolve, reject) => {
        cursor.toArray((err, docs) => {
            if (err) {reject(err)}
            resolve(docs)
        })
    })
}