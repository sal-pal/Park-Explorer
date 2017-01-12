module.exports = (json) => {
    const mongo = require('mongodb').MongoClient
    const crypto = require('crypto-toolkit')
    
    const url = "mongodb://user1:password1@ds145828.mlab.com:45828/salsdatabase"
    
    //Connect to database
    mongo.connect(url, (err, db) => {
        if(err) {throw err}
        const authObj = JSON.parse(json)
        var collection = db.collection('Users') 
        
        //Check if there is doc containing username
        collection.findOne({username: authObj.username}, (err, result) => {
            if(err) throw {err}
            if (!result) {
                return JSON.stringify({result: false})
                db.close()
            }
            else {
                //Check if passwords match
                const passwordHash = crypto.Hash('hex').sha1(authObj.password)
                if (passwordHash == result.password) {
                    return JSON.stringify({result: true})
                    db.close()
                }
                else {
                    JSON.stringify({result: false})
                    db.close()
                }
            }  
        })
    })
}