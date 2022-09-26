const Client = require("../managers/ClientManager");
const moment = require("moment");
const Departure = require("./departure");

module.exports = class Journey extends Client{
    #data
    constructor(data) {
        super();
        this.#data = data;

        if(data.sections.filter(section => !!section.display_informations).length > 1){
            //return {error: Error.code.JOURNEY_MULTIPLE_SECTIONS, code: 'JOURNEY_MULTIPLE_SECTIONS'}
        }

        /**
         * Return the journey's id
         * @returns {String}
         */
        this.id = data.sections.find(s => !!s.display_informations).display_informations.headsign;

        /**
         * Return the journey's co2 emission
         * @returns {object} {value: Number, unit: String}
         */
        this.co2_emission = data.co2_emission;

        /**
         * Return the journey's duration
         * @returns {string} Format: HH:mm:ss
         */
        this.duration = moment.utc(data.duration*1000).format('HH:mm:ss');

        /**
         * Return the journey's departure
         */
        this.departure = {
            /**
             * Return the journey's departure date
             * @returns {Date}
             */
            date: this.utils.navitia_date(data.sections.find(s => !!s.display_informations).departure_date_time).toDate(),
            /**
             * Return the journey's departure stop area
             * @returns {StopArea}
             */
            stop_area: new this.structures.stop_area(data.sections[0].from.stop_area)
        }

        /**
         * Return the journey's arrival
         * @returns {object}
         */
        this.arrival = {
            /**
             * Return the journey's arrival date
             * @returns {Date}
             */
            date: this.utils.navitia_date(data.sections.find(s => !!s.display_informations).arrival_date_time).toDate(),
            /**
             * Return the journey's arrival stop area
             * @returns {StopArea}
             */
            stop_area: new this.structures.stop_area(data.sections[data.sections.length-1].to.stop_area)
        }

        /**
         * Return if the journey as disruptions
         * @returns {boolean}
         */
        this.has_disruptions = data.disruptions?.length > 0;
    }

    /**
     * Return train's information disruptions, if the train is canceled or not, if it's delayed or not
     * @param {string} stop_area - The stop area id to get disruptions
     * @returns {Disruption[]}
     */
    disruption(stop_area) {
        const disruptions = this.#data.disruptions;
        if(!disruptions?.length) return [];
        if(stop_area) return disruptions.filter(d => d.stop_areas.find(s => s.id === stop_area.id));
        return disruptions;
    }
}