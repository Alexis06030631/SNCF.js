const {Client, Routes, Places} = require('./index')
require("dotenv").config();
const sncf = new Client()

// Connect to sncf API with your credentials
sncf.login().then(_ =>{

    // Get all stations including the name "Paris
    sncf.places.search('Toulouse matabiau').then((res) => {
        console.log(res.places[0])
        sncf.places.get(res.places[0].id).then((res) => {
            console.log(res)
        })
    })

    // Get all the information about the first station with the name "Paris".
   // const GetGareInfos = await Places.get(FoundGare.places[0].id)

    // Get the routes to a train station.
    //const routes = await Routes.search('Toulouse', 'montauban')
    //console.log(routes.routes[0].id)
    //const route = await Routes.get(routes.routes[0].id)
    //const stop_areas = await Routes.stop_areas(routes.routes[0].id)

}).catch(err => {
    console.log(err)
})