# Some examples of use of the package SNCF.js

#### Author: Alexis06030631

## Examples

---

### Find a station and get the next departures

```js
const SNCF = require('sncf.js');
const sncf = new SNCF();

sncf.login(YOUR_TOKEN).then(() => {
    sncf.place.search('Paris').then((stations) => {
		// Return an array of stations that match the search
        // Get the departures of the first station of the array
        stations[0].departures().then((departures) => {
            // Return an array of departures
            console.log(departures);
        });
    });
});
```

---

### Get a journey from a station to another (with pedestrian and public transport steps)

```js
const SNCF = require('sncf.js');
const sncf = new SNCF();

sncf.login(YOUR_TOKEN).then(_ => {
    sncf.journey.get('Paris', 'Toulouse').then((journeys) => {
        // Return an array of journeys
        console.log(journeys);
    });
});
```