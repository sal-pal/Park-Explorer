module.exports = (json) => {
    const mongo = require('mongodb').MongoClient
    const url = "mongodb://user1:password1@ds145828.mlab.com:45828/salsdatabase"
    
    //Connect to database
    mongo.connect(url, (err, db) => {
        if(err) {throw err}
        const authObj = JSON.parse(json)
        const collection = db.collection('Users') 
        
        //Check if there is doc containing username
        collection.find({username: authObj.username}, (err, result) => {
            if(err) throw {err}
            db.close()
            console.log(result.username)
            //If database not contain username, return false wrapped in json
            if (!result) {
                return JSON.stringify({result: false})
            }
            else {
                return checkPassword(authObj, result)
            }  
        })
    })
}