---
label: Home
icon: home
author:
    name: Alexis06030631 
    avatar: https://avatars.githubusercontent.com/u/61119747
---
# SNCF.JS - Introduction

## <div style="display:none">Introduction</div>

[SNCF.JS](https://retype.com/) is a JavaScript library that allows you to easily use the [SNCF](https://www.sncf.com/) api.

![](https://www.sncf.com/themes/contrib/sncf_theme/images/logo-sncf.svg)

---

## Requirements

| Elements                                  | Version                                       |
|-------------------------------------------|-----------------------------------------------|
| [NodeJs](https://nodejs.org/en/download/) | [>= V16.0.0](https://nodejs.org/en/download/) |
| [SNCF Api Key](#get-your-sncf-token)      | :icon-shield-check:                           |

---

## Installation

You can install Retype using `npm` or `yarn`.

+++ NPM
```
npm install sncf.js
```
+++ Yarn
```
yarn install sncf.js
```
+++

!!!
All operating systems are supported, including Mac, Windows, and Linux.
!!!

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
sncf.login('your token [OR] nothing -> auto get SNCF_TOKEN in .env' ) // returns a promise 

```

---

## Features

#### :icon-file-code: Easy to use

SNCF.JS is object oriented which makes its use simple, fast and efficient

#### :icon-zap: Lightning fast

SNCF.js is optimized to the maximum, and will soon have a caching system limiting the requests

#### :icon-gear: Easy install

[Installation](#installation) takes only a few seconds because the package is very light.


#### ✋ Responsive and friendly support

A bug, a request, need help? Do not hesitate to ask, we will be happy to answer you in the smallest details

---

## Support

A technical support that listens, efficient and fast, join the [Discussions](https://github.com/Alexis06030631/sncf.js/discussions).

If you find a defect or would like to submit a feature request, please create an [Issue](https://github.com/Alexis06030631/sncf.js/issues) and we will investigate right away.

Do you have a general inquiry? Please feel free to contact me on [instagram](https://instagram.com/leko_system).

We :heart: feedback.
