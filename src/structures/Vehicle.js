const StructuresManager = require("./StructuresManager");
const {hourNativiaToHour} = require("../util/Converter");
const {SncfjsError, ErrorCodes} = require("../errors");

module.exports = class Vehicle extends StructuresManager{
    constructor(Client, data) {
        super()
        Object.defineProperty(this, "client", {value: Client})
        Object.defineProperty(this, "data", {value: data})
        /**
         * Return the vehicle id
         * @returns {string}
         */
        this.id = data.id

        /**
         * Return the vehicle headsign
         * @returns {string}
         */
        this.headsign = data.headsign

        /**
         * Return trip ID
         * @returns {string}
         */
        this.trip_id = data.trip.id

        /**
         * Return boolean if the vehicle has disruptions
         * @returns {boolean}
         */
        this.has_disruptions = !!data?.disruptions?.length

        /**
         * Return the calendar of the vehicle
         * @returns {array<Calendar>}
         */
        this.calendar = data.calendars

        /**
         * Return the departure time of the vehicle
         * @returns {string}
         */
        this.departure_time = this.get_departure_time

        /**
         * Return the arrival time of the vehicle
         * @returns {string}
         */
        this.arrival_time = this.get_arrival_time

        /**
         * Return the steps of the vehicle
         * @returns {array<StopTime>}
         */
        this.stop_times = data.stop_times.sort((a, b) => Number(a.departure_time) - Number(b.departure_time)).map(stop_time => new this.class_stop_time(this.client, stop_time))

    }

    get get_departure_time() {
        return hourNativiaToHour(this.data.stop_times.sort((a, b) => Number(a.departure_time) - Number(b.departure_time))[0].departure_time)
    }

    get get_arrival_time() {
        return hourNativiaToHour(this.data.stop_times.sort((a, b) => Number(b.arrival_time) - Number(a.arrival_time))[0].arrival_time)
    }

    /**
     * Return the vehicle disruptions
     * @returns {array<Disruption>}
     */
    get disruptions() {
        return this.data.disruptions.map(disruption => {
            if(!disruption.status) new SncfjsError(ErrorCodes.NotImplemented, "Disruption fetching is not implemented yet. Please open an issue on GitHub.")
            return new this.class_disruption(this.client, disruption)
        })
    }
}