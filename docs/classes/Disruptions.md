---
title: Disruptions
author:
  name: Alexis06030631
  avatar: https://avatars.githubusercontent.com/u/61119747

date: 2022-07-23T21:31
---

# Disruptions

||| Properties
=== Elements
- [utils](#utils)
- [structures](#structures)
===
||| Methods
=== Functions
- [search](#search)
- [get](#get)
|||
## Properties
---
## Methods
## .search

=== search()

 * Search the disruptions

| PARAMETER | TYPE | OPTIONAL | DESCRIPTION |
| --- | --- | :---: | --- |
| since_date | string;Date;number | :icon-check: | defines the start date of the disruptions to search for |
| until_date | string;Date;number | :icon-check: | defines the end date of the disruptions to search for |
| count=10 | number | :icon-check: | The number of disruptions to get |

```javascript
search()
```
**Type: promise<[Disruption](../structures/Disruption)>**

===

## .get

=== get()

 * Get a disruption by id

| PARAMETER | TYPE | OPTIONAL | DESCRIPTION |
| --- | --- | :---: | --- |
| disruptionID | string | :icon-x: | The id of the disruption to get |

```javascript
get()
```
**Type: promise<[Disruption](../structures/Disruption)>**

===

