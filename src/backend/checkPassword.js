module.exports = (userPassword, dbPassword) => {
    if (userPassword === dbPassword) {return true}
    else {return false}
}