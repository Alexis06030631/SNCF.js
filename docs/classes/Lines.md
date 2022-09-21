---
title: Lines
author:
  name: Alexis06030631
  avatar: https://avatars.githubusercontent.com/u/61119747

date: 2022-07-25T11:54
---

# Lines

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

The utils functions for the client.


```javascript
Lines.utils
```
**Type: string**

===

## .structures

=== structures

The structure available for the client.


```javascript
Lines.structures
```
**Type: string**

===

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

