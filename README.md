# SNCF.JS - Introduction

## <div style="display:none">Introduction</div>

[SNCF.JS](https://alexis06030631.github.io/SNCF.js/) is a JavaScript library that allows you to easily use the [SNCF](https://www.sncf.com/) api.

<img src="https://www.sncf.com/themes/contrib/sncf_theme/images/logo-sncf.svg" alt="drawing" width="200"/>

---

## Requirements

Only an api key is required to use the library. You can get one [here](https://www.digital.sncf.com/startup/api/token-developpeur)

---

## Installation

You can install SNCF.js using `npm` or `yarn`.

NPM
```
npm install sncf.js
```
Yarn
```
yarn install sncf.js
```


_All operating systems are supported, including Mac, Windows, and Linux._

---

## Quick start

#### [Get your SNCF Token](https://www.digital.sncf.com/startup/api/token-developpeur)

Copy .env.backup to .env and fill the token in the file.
```env .env
SNCF_TOKEN=<your token>
```

#### Import the library have fun!

```js
const {Client} = require('sncf.js');
const sncf = new Client();

// Login to the SNCF api
sncf.login('your token' ) // returns a promise 

```

## Documentation

### The documentation is available [here](https://alexis06030631.github.io/SNCF.js/)
### You can find some examples [here](https://alexis06030631.github.io/SNCF.js/examples)

---

## Features

#### Easy to use

SNCF.JS is object-oriented which makes its use simple, fast and efficient

#### Lightning fast

SNCF.js is optimized to the maximum, and will soon have a caching system limiting the requests

#### Easy install

[Installation](#installation) takes only a few seconds because the package is very light.


#### ✋ Responsive and friendly support

A bug, a request, need help? Do not hesitate to ask, we will be happy to answer you in the smallest details

---

## Support

A technical support that listens, efficient and fast, join the [Discussions](https://github.com/Alexis06030631/sncf.js/discussions).

If you find a defect or would like to submit a feature request, please create an [Issue](https://github.com/Alexis06030631/sncf.js/issues) and we will investigate right away.

Do you have a general inquiry? Please feel free to contact me on [instagram](https://instagram.com/leko_system).

We :heart: feedback.
