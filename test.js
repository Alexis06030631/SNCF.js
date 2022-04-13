const {Client, Places, Routes} = require('./index')
const sncf = new Client()

// Connect to sncf API with your credentials
sncf.login("YOUR TOKEN").then(async () =>{

    // Get all stations including the name "Paris
    const FoundGare = await Places.search('Paris')

    // Get all the information about the first station with the name "Paris".
    const GetGareInfos = await Places.get(FoundGare.places[0].id)

    // Get the routes to a train station.
    const routes = await Routes.search('Toulouse', 'montauban')
    console.log(routes.routes[0].id)
    const route = await Routes.get(routes.routes[0].id)
    const stop_areas = await Routes.stop_areas(routes.routes[0].id)

}).catch(err => {
    console.log(err)
})