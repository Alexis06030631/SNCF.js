import {navitiaDateToDate} from "../util/Converter";
import {TrainInfo} from "../models";
import {Route, StopArea} from "./";

export class Arrival {
    /**
     * Return the train data
     */
    train: TrainInfo;
    /**
     * Return the arrival time (real time)
     */
    arrival_date_time: Date;
    /**
     * Return the arrival time (scheduled)
     */
    base_arrival_date_time: Date;
    /**
     * Return the departure time (real time)
     */
    departure_date_time: Date;
    /**
     * Return the departure time (scheduled)
     */
    base_departure_date_time: Date;
    /**
     * Return the route of the train
     */
    route: Route;
    /**
     * Return the stop area of the train
     */
    stop_area: StopArea;
    /**
     * Return true if the train is late
     */
    isLate: boolean;

    constructor(Client:any, data:any) {
        this.train = {
            headsign: data.display_informations.headsign,
            name: data.display_informations.name,
            direction: data.display_informations.direction,
            commercial_mode: data.display_informations.commercial_mode,
            physical_mode: data.display_informations.physical_mode,
        }
        this.arrival_date_time = navitiaDateToDate(data.stop_date_time.arrival_date_time);
        this.base_arrival_date_time = navitiaDateToDate(data.stop_date_time.base_arrival_date_time);
        this.departure_date_time = navitiaDateToDate(data.stop_date_time.departure_date_time);
        this.base_departure_date_time = navitiaDateToDate(data.stop_date_time.base_departure_date_time);
        this.route = new Route(Client, data.route);
        this.stop_area = new StopArea(Client, data.stop_point.stop_area);
        this.isLate = this.departure_date_time !== this.base_departure_date_time || this.arrival_date_time !== this.base_arrival_date_time;
    }
}