const Client = require("../managers/ClientManager");
const moment = require("moment");

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
         * Return the journey's departure date
         * @returns {date}
         */
        this.departure_date = this.utils.navitia_date(data.sections.find(s => !!s.display_informations).departure_date_time).toDate();

        /**
         * Return the journey's arrival date
         * @returns {date}
         */
        this.arrival_date = this.utils.navitia_date(data.sections.find(s => !!s.display_informations).arrival_date_time).toDate();
    }

    /**
     * Return train's information disruptions, if the train is canceled or not, if it's delayed or not
     * @returns {Disruption[]}
     */
    get disruption() {
        const disruptions = this.#data.disruptions;
        if(disruptions?.length === 0) return null;
        return disruptions;
    }
}