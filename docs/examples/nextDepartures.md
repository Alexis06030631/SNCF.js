---
label: Get next departures of a station
icon: clock

author:
name: Alexis06030631
avatar: https://avatars.githubusercontent.com/u/61119747

date: 2022-07-23T21:56
---

# How to get the next departures of a station

### 2 ways to get the next departures of a station are available

---

#### 1. Search for a station and get the next departures of the first station of the array

```js
const {Client} = require('sncf.js');
const sncf = new Client();

sncf.login('YOUR_TOKEN').then(() => {
	sncf.place.search('Paris').then((stations) => {
		// Get the first station in the array
		const station = stations.stop_areas[0];

		// Get the departures of the station
		station.departures().then((departures) => {
			// Return an array of departures
			console.log(departures);
		});
	});
});
```

---

#### 2. Get a station by its id and get the next departures

```js
const {Client} = require('sncf.js');
const sncf = new Client();

sncf.login('YOUR_TOKEN').then(_ => {
	sncf.place.get('stop_area:SNCF:87391003').then((station) => {
        // Get the departures of the station
        station.departures().then((departures) => {
            // Return an array of departures
            console.log(departures);
        });
    });
});
```