function authenticate (json, callback) {
    callback(1)
}

module.exports = (json) => {
    return new Promise((resolve, reject) => {
        resolve(JSON.stringify({result: 'success'}))
    })
}