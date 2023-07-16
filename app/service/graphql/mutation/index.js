import {useMutation, useQuery} from "@apollo/react-hooks";
import {findKey} from "../../../utils/helper";

export class MutationGql {
    /**
     * @param {ConstructMutationGql} props
     * @param {Array|string | string[]} props.keyName
     */
    constructor(props) {
        this.host = "https://bateeqshop.myshopify.com" ?? undefined
        this.url = props?.url ?? "/"
        this.keyName = props?.keyName ?? undefined
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
    mutation(){
        try{
            if(!this.eventName) return [ new Error('eventName must be defined!'),null]
            const [result] = useMutation(this.eventName ?? "")
            let key = this.keyName ?? undefined
            async function Callback(options,keyName = key){
                const {data} =  await result({...options})
                if(typeof(keyName) !== 'undefined'){
                    if(findKey(data,keyName)) return findKey(data,keyName)
                    return data
                }
                return data
            }
            return [null, Callback]
        }catch(err){
            return [ err, null ]
        }
    }

    /**
     * @name _gql
     * @private
     */
    _gql(){

    }


}