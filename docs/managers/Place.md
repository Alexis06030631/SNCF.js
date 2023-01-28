---
title: Place
author:
---

# Place


||| Methods
- [search](#search)
- [get](#get)
|||
## Methods
## .search

=== search()

Search for a place by name

| PARAMETER | TYPE | OPTIONAL | DESCRIPTION |
| --- | --- | :---: | --- |
| station | [string :icon-link-external:](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | :icon-x: | The name of the station to search for |
| type | [string :icon-link-external:](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | :icon-check: | The filters to apply to the search |

```javascript
search()
```
**Type: [promise :icon-link-external:](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) <[placemanagerresult](../structures/placemanagerresult)>**

===

## .get

=== get()

Get a place by id

| PARAMETER | TYPE | OPTIONAL | DESCRIPTION |
| --- | --- | :---: | --- |
| stationID | [string :icon-link-external:](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | :icon-x: | The id of the station to get |

```javascript
get()
```
**Type: [promise :icon-link-external:](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) <[stoparea](../structures/stoparea)>**

===

