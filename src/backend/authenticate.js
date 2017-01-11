module.exports = (json) => {
    const fs = require('fs')
    const mongo = require('mongodb').MongoClient
    const crypto = require('crypto-toolkit')
    
    const filename = "../../.dburl"
    const url = fs.readFileSync(filename, 'utf-8')
    
    //Connect to database
    db.connect(url, (err, db) => {
        if(err) {throw err}
        const authObj = JSON.parse(json)
        var collection = db.collection('Users')
        console.log("Connected")
        
    })
}