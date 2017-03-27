/**
    Ouput: a promise fullfilling to an object literal containing data to be used in the UI, i.e. the park profile.
           The properties used are:
                1) fullName
                2) url
                3) description
                4) profileImage: a string of the image's url

    Input: 
        parkIndex: a number that represents the park's position in an alphabetically orderd list,
                   where the index system is non-zero based (first index is always 1).

    Additonal Details:
        1) If an error occurs during the api call, the promise rejects with the api call's error
                
**/

const fetch = require('node-fetch')

const codes = ['ACAD', 'ARCH', 'BADL', 'BIBE', 'BISC', 'BLCA', 'BRCA', 'CANY', 'CARE', 'CAVE', 'CHIS', 'CONG', 'CRLA', 'CUVA', 'DENA', 'DEVA', 'DRTO', 'EVER', 'GAAR', 'GLAC', 'GLBA', 'GRBA', 'GRCA', 'GRSA', 'GRSM', 'GRTE',  'GUMO', 'HALE', 'HAVO', 'HOSP', 'ISRO', 'JOTR', 'KATM', 'KEFJ', 'KICA', 'KOVA', 'LACL', 'LAVO', 'MACA', 'MEVE', 'MORA', 'NOCA', 'NPSA', 'OLYM', 'PEFO', 'REDW', 'ROMO', 'SAGU', 'SEKI', 'SEQU', 'SHEN', 'THRO', 'VOYA', 'WICA', 'WRST', 'YELL', 'YOSE', 'ZION'] 


module.exports = (parkIndex) => {
    return new Promise((resolve, reject) => {
        if (typeof parkIndex === 'number') {
            parkIndex -= 1
            const parkCode = codes[parkIndex]
            const url = "https://park-tinder.herokuapp.com/parkProfileDataAPI/" + parkCode
            return fetch(url)
                .then((res) => res.json())
                .then((parkProfileData) => {
                    resolve(parkProfileData)
                })
                .catch((err) => reject(err))
        }
        reject(TypeError("Need to pass a number as the parkIndex"))
    })
}