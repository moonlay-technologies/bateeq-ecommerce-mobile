import {useQuery} from "@apollo/client";
import {CheckoutGql} from "./checkout";

export class MutationGql {
    /**
     * @param {ConstructMutationGql} props
     */
    constructor(props) {
        this.variables = props?.variables ?? {}
        this.options = props?.options ?? {}
        this.eventName = undefined
    }

    /**
     * @method query
     */
    query(){
        if(!this.eventName) return [ new Error("eventName must be defined!"),null]
        /**
         * @type {QueryResult<any, gqlReturn>}
         */
        const {
            data,
            error,
            loading,
            networkStatus
        } =  useQuery(this.eventName,{...this.options})
        return [null, {data,error,loading,networkStatus}]
    }
}