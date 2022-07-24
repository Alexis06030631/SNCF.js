---
title: line
author:
  name: Alexis06030631
  avatar: https://avatars.githubusercontent.com/u/61119747

date: 2022-07-23T22:05
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
---
## Methods
## .vehicle_journeys

=== vehicle_journeys()

 * Get the vehicles of the line at a given time

| PARAMETER | TYPE | OPTIONAL | DESCRIPTION |
| --- | --- | :---: | --- |
| since_date | string;Date;number | :icon-check: | defines the start date to search for vehicles |
| until_date | string;Date;number | :icon-check: | defines the end date to search for vehicles |
| count=10 | number | :icon-check: | The number of vehicles to get |

```javascript
vehicle_journeys()
```
**Type: promise<[Vehicle](../structures/Vehicle)>**

===

## .stop_areas

=== stop_areas()

 * Get the stop areas of the line


```javascript
stop_areas()
```
**Type: promise<[Place](../structures/Place)>**

===

## .departures

=== departures()

 * Get the departure of the line at a given time

| PARAMETER | TYPE | OPTIONAL | DESCRIPTION |
| --- | --- | :---: | --- |
| from_date | string;Date;number | :icon-check: | defines the start date to search departures |
| until_date | string;Date;number | :icon-check: | defines the end date to search departures |
| count=10 | number | :icon-check: | The number of departures to get |

```javascript
departures()
```
**Type: promise<[Vehicle](../structures/Vehicle)>**

===

## .arrivals

=== arrivals()

 * Get the arrivals of the line at a given time

| PARAMETER | TYPE | OPTIONAL | DESCRIPTION |
| --- | --- | :---: | --- |
| from_date | string;Date;number | :icon-check: | defines the start date to search arrivals |
| until_date | string;Date;number | :icon-check: | defines the end date to search arrivals |
| count=10 | number | :icon-check: | The number of arrivals to get |

```javascript
arrivals()
```
**Type: promise<[Vehicle](../structures/Vehicle)>**

===

