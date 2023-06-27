
import {SncfjsTypeError, ErrorCodes} from "../errors"
export class BaseClient {
    constructor(options = {}) {
        if (typeof options !== 'object' || options === null) {
            throw new SncfjsTypeError(ErrorCodes.InvalidType, 'options', 'object', true);
        }
    }

}