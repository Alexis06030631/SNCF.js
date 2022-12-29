---
title: Disruption
author:
---

# Disruption

||| Properties
||| Methods
- [search](#search)
- [get](#get)
|||
## Properties
---
## Methods
## .search

=== search()

Search the disruptions

| PARAMETER | TYPE | OPTIONAL | DESCRIPTION |
| --- | --- | :---: | --- |
| since_date | [date :icon-link-external:](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) | :icon-check: | defines the start date of the disruptions to search for |
| until_date | [date :icon-link-external:](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) | :icon-check: | defines the end date of the disruptions to search for |

```javascript
search()
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
get()
```
**Type: [promise :icon-link-external:](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) <[disruption](../structures/disruption)>**

===

