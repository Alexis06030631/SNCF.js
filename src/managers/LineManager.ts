import {CachedManager} from "./";
import {Line} from "../structures";
import {ErrorCodes, SncfjsError} from "../errors";
import {isValidID, isValidLineID} from "../util";
export class LineManager extends CachedManager {
    /**
     * @internal
     */
    client: any;
    /**
     * @internal
     */
    structures: any = {
        line: Line
    }
    constructor(client:any) {
        super()
        Object.defineProperty(this, "client", {value: client})
    }


    /**
     * Search a line by name (departure - arrival)
     * @param line - The name of the line
     *
     * @example
     * This example shows how to search a line by name
     * ```javascript
     * const lines = await client.line.search("Paris - Bordeaux")
     * console.log(lines)
     * ```
     * */
    async search(line:string):Promise<Line[]> {
        return new Promise(async (resolve, reject) => {
            const request = await this.client.requestManager.request(`pt_objects`, {q: line, "type[]":'line'})
            if(request.error) {
                return reject(request.error)
            }else {
                if(!request?.pt_objects) return reject(new SncfjsError(ErrorCodes.NoResultFound, line))
                // @ts-ignore
                resolve(request.pt_objects.map(line => new Line(this.client, line.line)))
            }
        })
    }

    /**
     * Get a line by id
     * @param lineID - The id of the line
     *
     * @example
     * This example shows how to get a line by id
     * ```javascript
     * const line = await client.line.get("lline:SNCF:CSR:433500")
     * console.log(line)
     *  ```
     */
    async get(lineID:string):Promise<Line>{
        return new Promise(async (resolve, reject) => {
            // Check if is a valid id
            if(!lineID) reject(new Error(ErrorCodes.IdIsMissing))
            if(!isValidLineID(lineID)) reject(new SncfjsError(ErrorCodes.InvalidId, lineID))

            const request = await this.client.requestManager.request(`lines/${lineID}`)
            if(request.error) {
                return reject(request.error)
            }else {
                return resolve(new Line(this.client, request.lines[0]))
            }
        })
    }
}