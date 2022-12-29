---
title: Line
author:
---

# Line

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

Search a line by name (departure - arrival)

| PARAMETER | TYPE | OPTIONAL | DESCRIPTION |
| --- | --- | :---: | --- |
| line | [string :icon-link-external:](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | :icon-x: | The name of the line |

```javascript
search()
```
**Type: [promise :icon-link-external:](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) <[line](../structures/line)[]>**

===

## .get

=== get()

Get a line by id

| PARAMETER | TYPE | OPTIONAL | DESCRIPTION |
| --- | --- | :---: | --- |
| lineID | [string :icon-link-external:](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | :icon-x: | The id of the line |

```javascript
get()
```
**Type: [promise :icon-link-external:](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) <[line](../structures/line)>**

===

