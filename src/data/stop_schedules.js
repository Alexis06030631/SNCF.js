module.exports = class StopSchedules {
    #token
    #date_times
    constructor(data, token) {
        this.#token = token
        this.#date_times = data.date_times
        this.additional_informations = data.additional_informations
        this.code = data.display_informations.code
        this.network = data.display_informations.network
        this.direction = data.display_informations.direction
        this.name = data.display_informations.name
        this.route = data.route

        this.departure = {}
        this.departure.scheduled = data.first_datetime?.base_date_time
        this.departure.current = data.first_datetime?.date_time
        this.departure.type = data.first_datetime?.data_freshness
        this.arrival = {}
        this.arrival.scheduled = data.last_datetime?.base_date_time
        this.arrival.current = data.last_datetime?.date_time
        this.arrival.type = data.last_datetime?.data_freshness
    }

    stops_dates() {
        const dates = []
        this.#date_times.forEach(date_time => {
            dates.push({additional_informations: date_time.additional_informations, scheduled: date_time.base_date_time, current:date_time.date_time, destination_id: date_time.links.find(link => link.category === 'terminus')?.id})
        })
        return dates
    }
}

// TODO: Add routes