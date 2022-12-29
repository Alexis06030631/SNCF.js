---
title: StopArea
author:
---

# StopArea

||| Properties
- [id](#id)
- [name](#name)
- [coord](#coord)
- [administrative_region](#administrative_region)
- [timezone](#timezone)
||| Methods
- [departures](#departures)
- [arrivals](#arrivals)
- [journeys](#journeys)
- [lines](#lines)
- [routes](#routes)
- [vehicle_journeys](#vehicle_journeys)
|||
## Properties
## .id

=== id

Return the stop area id


```javascript
this.id
```
**Type: [string :icon-link-external:](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)**

===

## .name

=== name

Return the stop area name


```javascript
this.name
```
**Type: [string :icon-link-external:](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)**

===

## .coord

=== coord

Return the stop area zip code


```javascript
this.coord
```
**Type: [object :icon-link-external:](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)**

===

## .administrative_region

=== administrative_region

Return the Administative Region of the stop area (if exist)


```javascript
this.administrative_region
```
**Type: [administrativeregion|null](../structures/administrativeregion|null)**

===

## .timezone

=== timezone

Return the stop area timezone


```javascript
this.timezone
```
**Type: [string :icon-link-external:](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)**

===

---
## Methods
## .departures

=== departures()

Get the departures of the stop area

| PARAMETER | TYPE | OPTIONAL | DESCRIPTION |
| --- | --- | :---: | --- |
| date | [date :icon-link-external:](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) | :icon-x: | - The date of the departures |

```javascript
departures()
```
**Type: [promise :icon-link-external:](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) <[departure](../structures/departure)[]>**

===

## .arrivals

=== arrivals()

Get the arrivals of the stop area

| PARAMETER | TYPE | OPTIONAL | DESCRIPTION |
| --- | --- | :---: | --- |
| date | [date :icon-link-external:](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) | :icon-x: | - The date of the arrivals |

```javascript
arrivals()
```
**Type: [promise :icon-link-external:](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) <[arrival](../structures/arrival)[]>**

===

## .journeys

=== journeys()

Get Journeys from the stop area

| PARAMETER | TYPE | OPTIONAL | DESCRIPTION |
| --- | --- | :---: | --- |
| to | [string :icon-link-external:](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | :icon-check: | - The id or name of the destination |
| date | [date :icon-link-external:](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) | :icon-check: | - The date of the journey |

```javascript
journeys()
```
**Type: [promise :icon-link-external:](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) <[journey](../structures/journey)[]>**

===

## .lines

=== lines()

Get the lines of the stop area


```javascript
lines()
```
**Type: [promise :icon-link-external:](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) <[line](../structures/line)[]>**

===

## .routes

=== routes()

Get the routes of the stop area


```javascript
routes()
```
**Type: [promise :icon-link-external:](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) <[route](../structures/route)[]>**

===

## .vehicle_journeys

=== vehicle_journeys()

Get vehicle journeys of the stop area

| PARAMETER | TYPE | OPTIONAL | DESCRIPTION |
| --- | --- | :---: | --- |
| date | [date :icon-link-external:](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) | :icon-check: | - The date of the vehicle journeys |

```javascript
vehicle_journeys()
```
**Type: [promise :icon-link-external:](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) <[vehiclejourney](../structures/vehiclejourney)[]>**

===

