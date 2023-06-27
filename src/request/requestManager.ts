'use strict';

import EventEmitter from 'node:events';
import axios from "axios";
import {defineRequestError} from "./requestError";
import Status from "../util/Status";
import config from './requestConfig.json';
import {SncfjsError, ErrorCodes} from "../errors";

export class RequestManager extends EventEmitter {
	/**
	 * The number of the request
	 */
	requestNumber: number;

	/**
	 * The configuration of the request manager
	 */
	config: any;

	/**
	 * The client that instantiated this WebSocketManager
	 * @internal
	 */
	client: any;



	/**
	 * The client that instantiated this WebSocketManager
	 */
	constructor(client:any) {
		super();
		Object.defineProperty(this, 'client', { value: client });
		this.requestNumber = 0;
		this.config = config;
	}

	/**
	 * Encode the parameters and the url
	 * @param path - The path to url
	 * @param params - The parameters to encode
	 */
	encodeURL(path:string ='', params:any = {}):string {
		return encodeURI(`${this.config.base_url}${path}`)+`?${(new URLSearchParams(params)).toString()}`;
	}

	/**
	 * Try to log in with the token
	 */
	async connect() : Promise<RequestManager>{
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
				reject(defineRequestError(err))
			});
		})
	}

	/**
	 * Make a request to the API
	 * @param path - The path to url
	 * @param params - The parameters to encode
	 */
	request(path:string, params:any = {}):Promise<any> {
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