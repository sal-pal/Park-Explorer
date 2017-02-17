/**
        Creates a hashed password with sha512
            Output:   A string representing a salted hash.
            
            Params: 
                      password: A string representing the password.
                      salt: A string of characters
                      
**/

const crypto = require("crypto")


module.exports = (password, salt) => {
    
    const passwordIsString = (typeof password === 'string')
    const saltIsString = (typeof salt === 'string') 
    
    if (passwordIsString && saltIsString) {
        const hash = crypto.createHmac('sha512', salt)
        hash.update(password)
        var value = hash.digest('hex')
        return {
            salt:salt,
            passwordHash:value
        }      
    }
    else {
        const errorMsg = "Need strings to be passed for both parameters"
        throw new TypeError(errorMsg)
    }
}