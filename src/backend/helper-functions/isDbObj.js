const Db = require("mongodb").Db

module.exports = (input) => {
    if (input instanceof Db) {
        return true
    }
    else {return false}
}