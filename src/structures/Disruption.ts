import {StructuresManager} from "./StructuresManager";
import {navitiaDateToDate} from "../util";
import {Severity} from "../models";
import {ImpactedStop} from "./";

export class Disruption {
    /**
     * Return the id of the disruption
     */
    id: string;
    /**
     * Return the status of the disruption
     */
    status: string;
    /**
     * Return the cause of the disruption
     */
    cause: string;
    /**
     * Return the messages of the disruption
     */
    messages: string[];
    /**
     * Return the start date of the disruption
     */
    start: Date;
    /**
     * Return the end date of the disruption
     */
    end: Date;
    /**
     * Return the updated date of the disruption
     */
    updated_at: Date;
    /**
     * @internal
     */
    client: any;
    /**
     * Return true if the train was canceled
     */
    canceled: boolean;
    /**
     * Return true if the train was delayed
     */
    delayed: boolean;
    /**
     * Return the severity of the disruption
     */
    severity: Severity;
    /**
     * Return the impacted stops of the disruption
     */
    impacted_stops: ImpactedStop[];

    constructor(Client:any, data:any) {
        Object.defineProperty(this, 'client', {value: Client})
        this.id = data.id
        this.status = data.status
        this.cause = data.cause
        this.messages = data?.messages
            // @ts-ignore
            ?.map(message => message.text) || []
        this.start = navitiaDateToDate(data.application_periods[0].begin)
        this.end = navitiaDateToDate(data.application_periods[0].end)
        this.updated_at = navitiaDateToDate(data.updated_at)
        this.canceled = data.severity?.effect === 'NO_SERVICE'
        this.delayed = data.severity?.effect === 'SIGNIFICANT_DELAYS' || data.severity?.effect === 'REDUCED_SERVICE' || data.severity?.effect === 'DETOUR'
        this.severity = {code: data.severity?.effect, name: data.severity?.name, priority: data.severity?.priority}
        this.impacted_stops = data.impacted_objects[0]?.impacted_stops
            // @ts-ignore
            ?.map(impacted_object => new this.class_impacted_stop(this.client, impacted_object)) || []

    }

}
