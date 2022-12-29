---
title: line
author:
  name: Alexis06030631
  avatar: https://avatars.githubusercontent.com/u/61119747

date: 2022-12-22T21:14
---

# line

||| Properties
=== Elements
- [network](#network)
- [routes](#routes)
- [physical_modes](#physical_modes)
- [closing_time](#closing_time)
- [opening_time](#opening_time)
- [name](#name)
- [id](#id)
===
||| Methods
=== Functions
- [vehicle_journeys](#vehicle_journeys)
- [stop_areas](#stop_areas)
- [departures](#departures)
- [arrivals](#arrivals)
|||
## Properties
## .network

=== network

the network of the line


```javascript
line.network
```
**Type: [object :icon-link-external:](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)**

===

## .routes

=== routes

Return the routes of the line


```javascript
line.routes
```
**Type: [array :icon-link-external:](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)**

===

## .physical_modes

=== physical_modes

Return the list of physical mode used by the line


```javascript
line.physical_modes
```
**Type: [array :icon-link-external:](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)**

===

## .closing_time

=== closing_time

Return when the closing time of the line


```javascript
line.closing_time
```
**Type: [string :icon-link-external:](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)**

===

## .opening_time

=== opening_time

Return when the opening time of the line


```javascript
line.opening_time
```
**Type: [string :icon-link-external:](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)**

===

## .name

=== name

Return the name of the line


```javascript
line.name
```
**Type: [string :icon-link-external:](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)**

===

## .id

=== id

Return the id of the line


```javascript
line.id
```
**Type: [string :icon-link-external:](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)**

===

---
## Methods
## .vehicle_journeys

=== vehicle_journeys()

Get the vehicles of the line at a given time

| PARAMETER | TYPE | OPTIONAL | DESCRIPTION |
| --- | --- | :---: | --- |
| since_date | [string :icon-link-external:](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) [date :icon-link-external:](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) [number :icon-link-external:](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)  | :icon-check: | defines the start date to search for vehicles |
| until_date | [string :icon-link-external:](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) [date :icon-link-external:](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) [number :icon-link-external:](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)  | :icon-check: | defines the end date to search for vehicles |
| count=10 | [number :icon-link-external:](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) | :icon-check: | The number of vehicles to get |

```javascript
vehicle_journeys()
```
**Type: [promise :icon-link-external:](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) <[vehicle](../structures/vehicle)[]>**

===

## .stop_areas

=== stop_areas()

Get the stop areas of the line


```javascript
stop_areas()
```
**Type: [promise :icon-link-external:](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) <[place](../structures/place)[]>**

===

## .departures

=== departures()

Get the departure of the line at a given time

| PARAMETER | TYPE | OPTIONAL | DESCRIPTION |
| --- | --- | :---: | --- |
| from_date | [string :icon-link-external:](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) [date :icon-link-external:](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) [number :icon-link-external:](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)  | :icon-check: | defines the start date to search departures |
| until_date | [string :icon-link-external:](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) [date :icon-link-external:](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) [number :icon-link-external:](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)  | :icon-check: | defines the end date to search departures |
| count=10 | [number :icon-link-external:](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) | :icon-check: | The number of departures to get |

```javascript
departures()
```
**Type: [promise :icon-link-external:](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) <[vehicle](../structures/vehicle)[]>**

===

## .arrivals

=== arrivals()

Get the arrivals of the line at a given time

| PARAMETER | TYPE | OPTIONAL | DESCRIPTION |
| --- | --- | :---: | --- |
| from_date | [string :icon-link-external:](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) [date :icon-link-external:](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) [number :icon-link-external:](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)  | :icon-check: | defines the start date to search arrivals |
| until_date | [string :icon-link-external:](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) [date :icon-link-external:](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) [number :icon-link-external:](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)  | :icon-check: | defines the end date to search arrivals |
| count=10 | [number :icon-link-external:](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) | :icon-check: | The number of arrivals to get |

```javascript
arrivals()
```
**Type: [promise :icon-link-external:](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) <[vehicle](../structures/vehicle)[]>**

===

