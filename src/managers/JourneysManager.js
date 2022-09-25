const CachedManager = require("./CachedManager");

module.exports = class Journeys extends CachedManager {
    constructor(client) {
        super()

        // The utils functions for the client.
        this.utils = client.utils

        // The structure available for the client.
        this.structures = client.structures
    }

    /**
     * Get a journey details with departure and arrival stop areas ids
     * @param {JourneyOptions} options The options for the journey
     * @returns {Promise<Journeys>}
     */
    async get(options){
        // Check if the required options are present
        if(!options.from || !options.to) throw new Error("Missing required options: from and to are required");

        // Check if the from and to options are valid stop areas ids
        if(!this.utils.is_stop_area(options.from) || !this.utils.is_stop_area(options.to)) throw new Error("Invalid options: from and to must be valid stop areas ids");

        // Options for the request
        let paramsEncoded = this.utils.encode_options({
            from: options.from,
            to: options.to,
            datetime: options.date? this.utils.to_navitia_date(options.date) : null,
            count: options.count? options.count : null,
        })

        // Request the journeys
        const data = await this.utils.request(`journeys?${paramsEncoded}`);

        // Search for disruptions
        if(data.disruptions.length > 0) {
            data.disruptions.map(d => new this.structures.disruption(d)).forEach(d => d.impacted_objects.forEach(o => {
                data.journeys.forEach(j => j.sections.filter(sct => !!sct.display_informations).forEach(s => {
                    if(s.display_informations.headsign === o.trip_id) j.disruptions? j.disruptions.push(d) : j.disruptions = [d]
                }))
            }))
        }
        return data.journeys.map(journey => new this.structures.journey(journey))
    }

}