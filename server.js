const express = require("express")
const path = require("path")
const fetch = require('node-fetch')
const bodyParser = require('body-parser')
const prepURLForGettingNationalParkData = require('./src/backend/helper-functions/prepURLForGettingNationalParkData.js')
const signup = require('./src/backend/signup.js')
const authenticate = require('./src/backend/authenticate.js')

const mongo = require('mongodb').MongoClient
const url = require('fs').readFileSync('./.dburl').toString()

var app = express()


mongo.connect(url, (err, db) => {
    if (err) {throw err}
    
    app.get("/", (req, res) => {
        res.set('Access-Control-Allow-Origin', "*")
        res.sendFile(path.join(__dirname, '/src/assets/index.html'))
    })

    app.get("/app.js", (req, res) => {
        res.sendFile(path.join(__dirname, '/src/assets/app.js'))
    })

    app.get("/parkProfileDataAPI/:parkCode", (req, res) => {
        const parkCode = req.params.parkCode
        const url = prepURLForGettingNationalParkData (parkCode, ['images'])
        const myHeader = {Authorization: "6047EBD8-4C76-4996-9A3D-C4746F229420"}
        fetch(url, {headers: myHeader})
                    .then((res) => res.json())
                    .then((json) => {
                        const parkData = json.data[0]
                        const parkProfileData = {fullName: parkData.fullName, websiteURL: parkData.url, description: parkData.description, profileImage: parkData.images[0].url}
                        res.json(parkProfileData)
                        res.end()
                    })
                    .catch((err) => reject(err))
    })

    app.use('/signup', bodyParser.json())
    app.post('/signup', (req, res) => {
        signup(req.body, "Users", db).then((output) => {
            res.json(output)
            res.end()
        })
    })
    
    app.get('/login', (req, res) => {
        authenticate(req.query, db).then((output) => {
            res.json(output)
            res.end()
        })
    })

    //Find out what port will be listened on
    app.listen(process.env.PORT || 5000)
    
})
