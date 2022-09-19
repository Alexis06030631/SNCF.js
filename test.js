const {Client} = require('./index')
require("dotenv").config();
const sncf = new Client()

// Connect to sncf API with your credentials
sncf.login(process.env.TOKEN_SNCF).then(_ =>{

    // Get all stations including the name "Paris
    sncf.places.search('Paris').then(async place => {
        console.log(place[0])
    })

}).catch(err => {
    console.log(err)
})