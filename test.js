const {Client} = require('./index')
require("dotenv").config();
const sncf = new Client()

// Connect to sncf API with your credentials
sncf.login(process.env.SNCF_TOKEN).then(_ =>{

    // Get all stations including the name "Paris
    sncf.lines.search('Toulouse matabiau - montauban').then(async place => {
        const vehicles = await place[0].vehicle_journeys(new Date(2022, 8, 22, 7), new Date(2022, 8, 22, 8), 5)
        console.log(vehicles.filter(v => v.direction.train_direction === 'backward')[0].stop_times)
    })

}).catch(err => {
    console.log(err)
})