const Authentication = require("./authenticate.js")


class AsynchErrorInAuthentication extends Authentication {
    constructor() {
        super()
    }
    
    authenticate(json) {
        const authenticate = new Authentication().authenticate
        return authenticate(json, () => {
            return new Promise((resolve, reject) => {
                reject(new Error())
            })
        })
    }
}


module.exports = AsynchErrorInAuthentication