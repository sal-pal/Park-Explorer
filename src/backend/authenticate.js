function authenticate (json, callback) {
    callback(1)
}

module.exports = (json) => {
    return new Promise((resolve, reject) => {
        authenticate(json, (err, result) => {
            if (err) {reject(err)}
            resolve(result)
        })
    })
}