---
title: Disruptions
author:
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
## .utils

=== utils

The utils functions.


```javascript
Disruptions.utils
```
**Type: [utils](../classes/utils)**

===

## .structures

=== structures

All the structures available.


```javascript
Disruptions.structures
```
**Type: [structuresmanager](../structures/structuresmanager)**

===

---
## Methods
## .search

=== search()

Search the disruptions

| PARAMETER | TYPE | OPTIONAL | DESCRIPTION |
| --- | --- | :---: | --- |
| since_date | [string :icon-link-external:](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) [date :icon-link-external:](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) [number :icon-link-external:](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)  | :icon-check: | defines the start date of the disruptions to search for |
| until_date | [string :icon-link-external:](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) [date :icon-link-external:](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) [number :icon-link-external:](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)  | :icon-check: | defines the end date of the disruptions to search for |
| count=10 | [number :icon-link-external:](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) | :icon-check: | The number of disruptions to get |

```javascript
[object Object]()
```
**Type: [promise :icon-link-external:](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) <[disruption](../structures/disruption)[]>**

===

## .get

=== get()

Get a disruption by id

| PARAMETER | TYPE | OPTIONAL | DESCRIPTION |
| --- | --- | :---: | --- |
| disruptionID | [string :icon-link-external:](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | :icon-x: | The id of the disruption to get |

```javascript
[object Object]()
```
**Type: [promise :icon-link-external:](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) <[disruption](../structures/disruption)>**

===

