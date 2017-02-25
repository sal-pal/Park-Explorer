module.exports = (input) => {
    if (input.hasOwnProperty('username') && input.hasOwnProperty('password')) {
        return true
    }
    return false
}