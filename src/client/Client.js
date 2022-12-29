const BaseClient = require('./BaseClient');
const {SncfjsError, ErrorCodes} = require("../errors");
const RequestManager = require("../request/requestManager");
const PlacesManager = require("../managers/PlaceManager");
const Status = require("../util/Status");
const DisruptionManager = require("../managers/DisruptionManager");
const LineManager = require("../managers/LineManager");
const JourneyManager = require("../managers/JourneyManager");
/**
 * The main hub for interacting with the Navitia API.
 * @extends {BaseClient}
 */
module.exports = class Client extends BaseClient {
	constructor(options = {}) {
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

		/**
		 * If app run as debug mode
		 * @type {boolean}
		 */
		this.debug = options.debug || false;


		/**
		 * The request manager of the client
		 * @type {RequestManager}
		 */
		this.requestManager = new RequestManager(this);

		/**
		 * Reduce dir for request
		 * @param {String} path The path to url
		 * @param {Object} [params] The parameters to encode
		 * @returns {Promise<Object>} The response of the request
		 */
		this.request = this.requestManager.request

		/**
		 * The status of the client
		 * @type {Status}
		 */
		this.status = Status.Disconnected;

		/**
		 * PlacesManager class
		 * @type {PlacesManager}
		 */
		this.place = new PlacesManager(this);

		/**
		 * DisruptionManager class
		 * @type {DisruptionManager}
		 */
		this.disruption = new DisruptionManager(this);

		/**
		 * LineManager class
		 * @type {LineManager}
		 */
		this.line = new LineManager(this);

		/**
		 * JourneysManager class
		 * @type {JourneyManager}
		 */
		this.journey = new JourneyManager(this);
	}

	/**
	 * Logs the client in, establishing a connection to navitia.
	 * @param {string} [token=this.token] Token of the account to log in with
	 * @returns {Promise<this>} Token of the account used
	 * @example client.login('my token');
	 */
	async login(token = this.token) {
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
	 * @type {Status}
	 * @readonly
	 * @returns {boolean}
	 */
	get isReady() {
		return this.status === Status.Ready;
	}

	toJSON() {
		return super.toJSON({
			actions: false,
			presence: false,
		});
	}

	/**
	 * Calls {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval} on a script
	 * with the client as `this`.
	 * @param {string} script Script to eval
	 * @returns {*}
	 * @private
	 */
	_eval(script) {
		return eval(script);
	}
}