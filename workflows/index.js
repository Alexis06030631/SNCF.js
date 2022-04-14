const {Client} = require('../index')
const sncf = new Client()

sncf.login().then(async () => {
    try{
        const FoundGare = await sncf.places.search('Paris')
        const GetGareInfos = await sncf.places.get(FoundGare.places[0].id)
        const routes = await sncf.routes.search('Paris', 'Marseille')
        const route = await sncf.routes.get(routes.routes[0].id)
        const stop_areas = await sncf.routes.stop_areas(routes.routes[0].id)
        console.log('All is good !')
    } catch (err) {
        throw err
    }
}).catch((error => {
    throw error
}))