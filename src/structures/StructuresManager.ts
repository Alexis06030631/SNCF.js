import { Departure } from "./Departure";
import { Arrival } from "./Arrival";
import { StopArea } from "./StopArea";
import { AdministrativeRegion } from "./AdministrativeRegion";
import { Line } from "./Line";
import { Route } from "./Route";
import { Journey } from "./Journey";
import { Step } from "./Step";
import { Vehicle } from "./Vehicle";
import { StopTime } from "./StopTime";
import { Disruption } from "./Disruption";
import { ImpactedStop } from "./ImpactedStop";
import { Calendar } from "./Calendar";
import { StopStep } from "./StopStep";

export class StructuresManager {
    constructor() {}

    /**
     * Get departure constructor
     */
    get class_departure() {
        return Departure
    }

    /**
     * Get arrival constructor
     */
    get class_arrival() {
        return Arrival
    }

    /**
     * Get StopArea constructor
     */
    get class_stop_area() {
        return StopArea
    }

    /**
     * Get AdministartiveRegion constructor
     */
    get class_administrative_region() {
        return AdministrativeRegion
    }

    /**
     * Get Line constructor
     */
    get class_line() {
        return Line
    }

    /**
     * Get Route constructor
     */
    get class_route() {
        return Route
    }

    /**
     * Get Journey constructor
     */
    get class_journey() {
        return Journey
    }

    /**
     * Get Step constructor
     */
    get class_step() {
        return Step
    }

    /**
     * Get Vehicle constructor
     */
    get class_vehicle() {
        return Vehicle
    }

    /**
     * Get StopTime constructor
     */
    get class_stop_time() {
        return StopTime
    }

    /**
     * Get class_disruption constructor
     */
    get class_disruption() {
        return Disruption
    }

    /**
     * Get ImpactedStop constructor
     */
    get class_impacted_stop() {
        return ImpactedStop
    }

    /**
     * Get StopStep constructor
     */
    get class_stop_step() {
        return StopStep
    }

    /**
     * Get Calendar constructor
     */
    get class_calendar() {
        return Calendar
    }
};