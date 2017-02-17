/**
        Generates a random string used as a salt
            args:   length (number): length of the random string
**/

const crypto = require('crypto')

module.exports = (length) => {
    return crypto.randomBytes(Math.ceil(length/2))
        .toString('hex')
        .slice(0, length)
}