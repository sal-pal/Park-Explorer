module.exports = (json) => {
    const mongo = require('mongodb').MongoClient
    const crypto = require('crypto-toolkit')
    const path = require('path')
    const fs = require('fs')
    
    const filepath = "../../.dburl"
    const url = fs.readFileSync(filepath, 'utf-8')
    
    //Connect to database
    mongo.connect(url, (err, db) => {
        if(err) {throw err}
        const authObj = JSON.parse(json)
        var collection = db.collection('Users') 
    })
}