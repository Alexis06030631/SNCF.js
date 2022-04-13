const {Client, Places, Routes} = require('../index')
const sncf = new Client()

sncf.login().then(async () => {
    try{
        const FoundGare = await Places.search('Paris')
        const GetGareInfos = await Places.get(FoundGare.places[0].id)
        const routes = await Routes.search('Paris', 'Marseille')
        const route = await Routes.get(routes.routes[0].id)
        const stop_areas = await Routes.stop_areas(routes.routes[0].id)
        console.log('All is good !')
    } catch (err) {
        throw err
    }
}).catch((error => {
    throw error
}))