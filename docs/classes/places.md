---
title: Places
author:
  name: Alexis06030631
  avatar: https://avatars.githubusercontent.com/u/61119747

date: 2022-07-24T11:41
---

# Places

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
## .utils

=== utils




```javascript
Places.utils
```
===

## .structures

=== structures




```javascript
Places.structures
```
===

---
## Methods
## .search

=== search()

 * Search for a place by name

| PARAMETER | TYPE | OPTIONAL | DESCRIPTION |
| --- | --- | :---: | --- |
| station | string | :icon-x: | The name of the station to search for |
| type | string.<place_types> | :icon-x: | The filters to apply to the search |

```javascript
search()
```
**Type: promise<[Place](../structures/Place)>**

===

## .get

=== get()

 * Get a place by id

| PARAMETER | TYPE | OPTIONAL | DESCRIPTION |
| --- | --- | :---: | --- |
| stationID | string | :icon-x: | The id of the station to get |

```javascript
get()
```
**Type: promise<[Place](../structures/Place)>**

===

