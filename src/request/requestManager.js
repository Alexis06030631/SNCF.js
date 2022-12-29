'use strict';

const EventEmitter = require('node:events');
const axios = require("axios");
const {defineRequestError} = require("./requestError");
const Status = require("../util/Status");
const config = require('./requestConfig.json');
const {SncfjsError, ErrorCodes} = require("../errors");

module.exports = class RequestManager extends EventEmitter {
	constructor(client) {
		super();
		/**
		 * The client that instantiated this WebSocketManager
		 * @type {Client}
		 * @readonly
		 * @name RequestManager#client
		 */
		Object.defineProperty(this, 'client', { value: client });

		/**
		 * Request number
		 * @type {number}
		 */
		this.requestNumber = 0;

		/**
		 * The configuration of the request manager
		 * @type {object}
		 */
		this.config = config;
	}

	/**
	 * Encode the parameters and the url
	 * @param {string} [path] The path to url
	 * @param {object} [params] The parameters to encode
	 * @returns {string} The encoded parameters
	 */
	encodeURL(path='', params = {}) {
		return encodeURI(`${this.config.base_url}${path}`)+`?${(new URLSearchParams(params)).toString()}`;
	}

	/**
	 * Try to log in with the token
	 * @returns {Promise<boolean>}
	 */
	async connect() {
		return new Promise((resolve, reject) => {
			this.client.status = Status.Connecting
			axios.get(this.encodeURL(), {
				headers: {
					'Authorization': this.client.token
				}
			}).then(() => {
				this.client.status = Status.Ready
				resolve(this);
			}).catch(err => {
				this.client.status = Status.Disconnected
				reject(defineRequestError(err.response))
			});
		})
	}

	/**
	 * Request to navitia
	 * @param {string} path The path to url
	 * @param {object} [params] The parameters to encode
	 * @returns {Promise<object>} The response of the request
	 */
	request(path, params = {}) {
		return new Promise((resolve, reject) => {
			if (!this.client.token) throw new SncfjsError(ErrorCodes.TokenNotInitialized);
			if (!this.client.isReady) throw new SncfjsError(ErrorCodes.NotReady);
			if(this.client.debug) console.log(`[DEBUG] Request ${this.requestNumber} : ${this.encodeURL(path, params)}`);
			this.requestNumber++;
			axios.get(this.encodeURL(path, params), {
				headers: {
					'Authorization': this.client.token
				}
			}).then(res => {
				resolve(res.data);
			}).catch(err => {
				reject(defineRequestError(err))
			})
		})
	}
}