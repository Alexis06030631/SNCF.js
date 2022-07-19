module.exports = class Disruptions {
    #token
    #impacted_objects

    constructor(data, token) {
        this.#token = token
        this.id = data.id
        this.status = data.status
        this.cause = data.cause
        this.routes = data.routes
        this.severity = data.severity
        this.periods = data.application_periods
        this.updated_at = data.updated_at
        this.messages = data.messages?.map(e => e.text) || []

        this.impacted_objects_length = data.impacted_objects.length
        this.#impacted_objects = data.impacted_objects
    }

    impacted_objects() {
        const impacted_objects = []
        this.#impacted_objects.forEach(impacted_object => {
            impacted_objects.push({id: impacted_object.pt_object.id, quality: impacted_object.pt_object.quality, name: impacted_object.pt_object.trip.name})
        })
        return impacted_objects
    }
}
