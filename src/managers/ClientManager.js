const Utils = require("../utils/utils");
const Base = require("../Base")
const Lines = require("./LinesManager");
const Disruptions = require("./DisruptionsManager");
const StructuresManager = require("../structures/StructuresManager");

module.exports = class Client extends Base {
    constructor() {
        super()
    }


    /**
     * @return {Utils}
     */
    get utils() {
        return new Utils(this);
    }

    /**
     * @return {StructuresManager}
     */
    get structures() {
        return new StructuresManager();
    }


    /**
     * All of the {@link Lines} objects that have been cached at any point
     * @type {Lines}
     * @returns {Lines}
     */
    get lines() {
        return new Lines(this);
    }

    /**
     * All of the {@link Dirsuptions} objects at custom date
     * @type {Disruptions}
     * @returns {Disruptions}
     */
    get disruptions() {
        return new Disruptions(this);
    }


    login(token = this.token) {
        return new Promise((resolve, reject) => {

            // Check and set the token
            if (!token) reject(new Error('TOKEN_INVALID'));
            else if(this.token !== token) this.setToken(token);

            // Establish the connection
            this.utils.request('', 'GET').then(r => {
                this.connected = true;
                this.readyDate = r.regions[0].last_load_at;
                this.connectionType = r.regions[0].name;
                this.id = r.regions[0].id;
                this.shape = r.regions[0].shape;
                this.timezone = r.context.timezone;
                //this.places = new places(this.#token)
                //this.lines = new lines(this.#token)
                //this.disruptions = new Disruptions(this.#token)
                resolve(this);
            })
        })
    }

    logout() {
        this.connected = false;
        this.readyDate = null;
        this.connectionType = null;
        this.id = null;
        this.shape = null;
        this.timezone = null;
        this.places = null;
        return this;
    }
}