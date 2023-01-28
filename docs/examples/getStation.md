---
label: Get a station
icon: home

author:
  name: Alexis06030631
  avatar: https://avatars.githubusercontent.com/u/61119747

date: 2023-01-27T20:48
---

# How to get a station

### 2 ways to get a station are available

---

#### 1. Search for a station

```js
const {Client} = require('sncf.js');
const sncf = new Client();

sncf.login('YOUR_TOKEN').then(() => {
    sncf.place.search('Paris') // Search for a station
        .then((stations) => {
            // Return an array of stations and Administrative regions that match the search
            console.log(stations);
        });
});
```

---

#### 2. Get a station by its id

```js
const {Client} = require('sncf.js');
const sncf = new Client();

sncf.login('YOUR_TOKEN').then(() => {
    sncf.place.get('stop_area:SNCF:87391003') // Get a station by its id
        .then((station) => {
            // Return a station
            console.log(station);
        });
});
```
