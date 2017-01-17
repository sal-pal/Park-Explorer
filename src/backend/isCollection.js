module.exports = (input) => {
    const collectConstr = require("mongodb").Collection
    input instanceof collectConstr ? true : false
}