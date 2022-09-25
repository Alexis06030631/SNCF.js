'use strict';

/**
 * @typedef {Object} JourneyOptions
 * @property string from The departure stop area id (required)
 * @property string to The arrival stop area id (required)
 * @property {date} date The date of the journey to get
 * @property {number} count The number of journeys to get (default: 1)
 */

// JSDoc for IntelliSense purposes
/**
 * @type {JourneyOptions}
 * @ignore
 */
module.exports = {
    from: null,
    to: null,
    date: new Date(),
    count: 1,
};