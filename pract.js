const mongo = require('mongodb').MongoClient
const url = "mongodb://user1:password1@ds145828.mlab.com:45828/salsdatabase"

function* parentFunct(url, generator) {
    var generator = generator(url)
    generator.next()
    const output = generator.next()
    return output.value
}

//Goal: define generator
//  !) Define in parentFunct
//  2) yield while connecting to db
//  3) return output of connection callback

const callback = (err, db) => {
    if (err) {throw err}
    var collection = db.collection('Users')
}

const result = parentFunct(url, () => {
    const output = yield mongo.connect(url, callback)
    return output
})

console.log(result.constructor)
