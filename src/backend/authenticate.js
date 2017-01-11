module.exports = (json) => {
    const db = require('mongodb')
    const crypto = require('crypto-toolkit')
    
    //Connect to database
    const url = ""
    db.connect()
    const authObj = JSON.parse(json)
    
}