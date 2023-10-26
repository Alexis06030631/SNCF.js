import {BaseClient} from './BaseClient';
import {SncfjsError, ErrorCodes} from "../errors";
import {RequestManager} from "../request";
import {PlacesManager} from "../managers";
import Status from "./../util/Status";
import {DisruptionManager} from "../managers";
import {LineManager} from "../managers";
import {JourneyManager} from "../managers";
import * as process from "node:process";

/**
 * The main hub for interacting with the Navitia API.
 */
export class Client extends BaseClient {
    /**
     * Authorization token for the logged in bot.
     */
    private token: any;
    /**
     * If app run as debug mode
     *
     */
    debug: boolean;
    /**
     * The request manager of the client
     */
    requestManager: RequestManager;
    /**
     * The status of the client
     */
    status: string;
    /**
     * PlacesManager class
     */
    place: PlacesManager;
    /**
     * DisruptionManager class
     */
    disruption: DisruptionManager;
    /**
     * LineManager class
     */
    line: LineManager;
    /**
     * JourneysManager class
     */
    journey: JourneyManager;
    /**
     * Reduce dir for request
     * @internal
     */
    request: any;






    constructor(options :any = {}) {
        super(options);

        Object.defineProperty(this, 'token', { writable: true });
        if (!this.token && 'SNCF_TOKEN' in process.env) {
            /**
             * Authorization token for the logged in bot.
             * If present, this defaults to `process.env.SNCFJS_TOKEN` when instantiating the client
             * <warn>This should be kept private at all times.</warn>
             * @type {?string}
             */
            this.token = process.env.SNCF_TOKEN;
        } else {
            this.token = null;
        }

        this.debug = options.debug || false;
        this.requestManager = new RequestManager(this);
        this.request = this.requestManager.request
        this.status = Status.Disconnected;
        this.place = new PlacesManager(this);
        this.disruption = new DisruptionManager(this);
        this.line = new LineManager(this);
        this.journey = new JourneyManager(this);
    }

    /**
     * Logs the client in, establishing a connection to navitia.
     * @param token - the token of the account to log in with
     * @example
     * Login using a token
     * ```javascript
     * login('YOUR_TOKEN');
     * ```
     * @example
     * Login using a token from the environment variable (SNCF_TOKEN)
     * The token in environment variable is automatically used if no token is provided, but it must be named SNCF_TOKEN
     * ```javascript
     * login();
     * ```
     */
    async login(token:string = this.token): Promise<Client> {
        return new Promise(async (resolve, reject) => {
            if (!token || typeof token !== 'string') throw new SncfjsError(ErrorCodes.TokenMissing);
            this.token = token;
            try {
                await this.requestManager.connect();
                resolve(this);
            } catch (error) {
                reject(error);
            }
        })
    }

    /**
     * Indicates whether the client is ready to start working.
     * @readonly
     * @returns boolean
     */
    get isReady() {
        return this.status === Status.Ready;
    }
}