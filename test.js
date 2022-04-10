var Sncf = require('./index')
const sncf = new Sncf()
sncf.login().then(r => console.log(r))