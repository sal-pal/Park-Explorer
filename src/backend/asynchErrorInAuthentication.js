const Authentication = require("./authenticate.js")



class AsynchErrorInAuthentication extends Authentication {
    constructor() {
        super()
    }
    
    authentication(json) {
        const authenticate = new Authentication()
        authenticate(json, () => {
            return new Promise((resolve, reject) => {
                reject()
            })
        })
    }
}


module.exports = AsynchErrorInAuthentication