const {Client, Places} = require('./index')
const sncf = new Client()

// Connect to sncf API with your credentials
sncf.login("YOUR TOKEN").then(async () =>{

    // Get all stations including the name "Paris
    const FoundGare = await Places.found('Paris')

    // Get all the information about the first station with the name "Paris".
    const GetGareInfos = await Places.get(FoundGare.places[0].id)

    // Return the data
    console.log(GetGareInfos)

}).catch(err => {
    // Return errors
    console.log(err)
})