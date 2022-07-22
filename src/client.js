const utils = require("./utils/utils");
const Base = require("./Base")
const Lines = require("./managers/lines");
const StructuresManager = require("./structures/StructuresManager");

class Client extends Base {
    constructor() {
        super()
        // Public properties
        this.connected = false;
        this.readyDate = null;
        this.connectionType = null;
        this.id = null;
        this.shape = null;
        this.timezone = null;
        this.places = null;

        this.utils = new utils(this);
        this.structures = new StructuresManager();


        /**
         * All of the {@link Lines} objects that have been cached at any point
         * @type {Lines}
         * @returns {Lines}
         */
        this.lines = new Lines(this);
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

module.exports = Client;