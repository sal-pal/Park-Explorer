module.exports = (json) => {
    const mongo = require('mongodb').MongoClient
    const crypto = require('crypto-toolkit')
    
    const url = "mongodb://user1:password1@ds145828.mlab.com:45828/salsdatabase"
    
    //Connect to database
    mongo.connect(url, (err, db) => {
        if(err) {throw err}
        const authObj = JSON.parse(json)
        var collection = db.collection('Users') 
        console.log("Connected")
    })
}