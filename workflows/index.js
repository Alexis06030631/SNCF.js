const {Client} = require('../index')
const sncf = new Client()

sncf.login().then(async () => {

}).catch((error => {
    throw error
}))