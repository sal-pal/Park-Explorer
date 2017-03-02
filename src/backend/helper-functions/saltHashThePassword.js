const getRandomString = require("../../../src/backend/helper-functions/getRandomString.js")
const sha512 = require("../../../src/backend/helper-functions/sha512.js")

module.exports = (password) => {
    const salt = getRandomString(5)
    return sha512(password, salt)
}