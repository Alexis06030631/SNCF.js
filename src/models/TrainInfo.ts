export interface TrainInfo {
    /**
     * The train identifier
     */
    headsign: string;
    /**
     * The train name
     */
    name: string;
    /**
     * The train direction
     */
    direction: string;
    /**
     * The train commercial mode
     */
    commercial_mode: string;
    /**
     * The train physical mode
     */
    physical_mode: string;
}