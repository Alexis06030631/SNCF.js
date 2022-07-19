const {Client} = require('./index')
require("dotenv").config();
const sncf = new Client()

// Connect to sncf API with your credentials
sncf.login().then(_ =>{

    console.log(Object.getOwnPropertyNames(Object.getPrototypeOf(sncf.places)))
    // Get all stations including the name "Paris
    sncf.places.search('Toulouse matabiau').then(async place => {
        console.log(await place[0].disruptions())
    })

}).catch(err => {
    console.log(err)
})