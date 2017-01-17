module.exports = (authObj, result) => {
    const crypto = require('crypto-toolkit')    
    //Check if passwords match
    const passwordHash = crypto.Hash('hex').sha1(authObj.password)
    if (passwordHash === result.password) {
        return JSON.stringify({result: true})
    }
    else {
        return JSON.stringify({result: false})
    }
}