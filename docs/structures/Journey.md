---
title: Journey
author:
---

# Journey

||| Properties
- [status](#status)
- [disruptions](#disruptions)
- [type](#type)
- [departure_date_time](#departure_date_time)
- [arrival_date_time](#arrival_date_time)
- [duration](#duration)
- [price](#price)
- [transfers](#transfers)
- [steps](#steps)
|||
## Properties
## .status

=== status

Return value if status is define


```javascript
this.status
```
**Type: [string :icon-link-external:](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)**

===

## .disruptions

=== disruptions

If the journey has disruptions return the disruptions


```javascript
this.disruptions
```
**Type: [array :icon-link-external:](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) <[disruption](../structures/disruption)>**

===

## .type

=== type

Define the journey average


```javascript
this.type
```
**Type: [string :icon-link-external:](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)**

===

## .departure_date_time

=== departure_date_time

Departure time


```javascript
this.departure_date_time
```
**Type: [date :icon-link-external:](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)**

===

## .arrival_date_time

=== arrival_date_time

Arrival time


```javascript
this.arrival_date_time
```
**Type: [date :icon-link-external:](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)**

===

## .duration

=== duration

Duration of the journey


```javascript
this.duration
```
**Type: [number :icon-link-external:](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)**

===

## .price

=== price

Price of the journey


```javascript
this.price
```
**Type: [price](../structures/price)**

===

## .transfers

=== transfers

Transfers of the journey


```javascript
this.transfers
```
**Type: [number :icon-link-external:](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)**

===

## .steps

=== steps

Get the steps of the journey


```javascript
this.steps
```
**Type: [promise :icon-link-external:](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) <[step](../structures/step)[]>**

===

