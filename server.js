var express = require("express")
var path = require("path")
const fetch = require('node-fetch')
const prepURLForGettingNationalParkData = require('./src/backend/helper-functions/prepURLForGettingNationalParkData.js')

var app = express()

//Serve react app when requested the index page
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

app.post("/signup")

//Find out what port will be listened on
app.listen(process.env.PORT)
