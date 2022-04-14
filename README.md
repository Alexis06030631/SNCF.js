# [SNCF.js](https://www.npmjs.com/package/sncf.js)

## About

SNCF.js is an JavaScript library to get all the information in real time about the ©SNCF a French company.
It is based on the [official api](https://www.digital.sncf.com/startup/api) of the SNCF.

- Currently under development
- Easy to use
- Open to any request
- It is not an official library, but we use the official SNCF API to get our data.


## Getting started

#### Install the library with [npm](https://www.npmjs.com/):

```sh-session
npm i sncf.js
```

#### Get your SNCF Token:
https://www.digital.sncf.com/startup/api/token-developpeur

## Documentation

#### Start to use the api:
JS
```javascript
// Call the module
const {Client} = require('sncf.js');
// init the module
const sncf = new Client();

// Login to the SNCF api
sncf.login("YOUR TOKEN").then(async () =>{
    // The client was connected !
}).catch(err => {
    // Oups, something went wrong, Check your console
    console.log(err)
})
```

#### Functions available:

```javascript
// Places
sncf.places.search('STATION_NAME') // Search for a station
sncf.places.get('STATION_ID') // Get a specific station

//Routes
sncf.routes.search('ROUTE_NAME') // Search for a route
sncf.routes.get('ROUTE_ID') // Get a specific route
sncf.routes.stop_areas('ROUTE_ID') // Get the stop areas of a specific route

// User (Get the information about the current session)
sncf.user // Get all informations
sncf.user.id // Get the user id
sncf.user.readyAt // Get the time when the client is ready
sncf.user.connectionType // Get the connection type
sncf.user.shape // Get the shape of the client
sncf.user.uptime // Get the uptime of the client
sncf.user.timezone // Get the timezone of the client
```
*** all functions are async ***


### Need help ?
* [GitHub discussion](https://github.com/Alexis06030631/SNCF.js/discussions)
* [Seed me a private message on instagram](https://www.instagram.com/leko_system/)