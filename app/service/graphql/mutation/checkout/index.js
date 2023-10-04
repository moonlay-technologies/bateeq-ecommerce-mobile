import {MutationGql} from "../index";
import {CHECKOUT_COMPLETE_FREE, CHECKOUT_LINE_ADD, CREATE_CHECKOUT, SHOW_CHECKOUT_BY_ID} from "./index.gql";

/**
 * @class CheckoutGql
 */
export class CheckoutGql extends MutationGql{

    /**
     * @constructor
     * @param {ConstructMutationGql} props
     */
    constructor(props) {
        super(props);
    }

    /**
     * @name addLine
     * @returns {{data: any, networkStatus: NetworkStatus, error: ApolloError, loading: boolean}[]|*[]|Error[]}
     */
    addLine(){
        try{
            this.eventName = CHECKOUT_LINE_ADD
            const [ err , data ] = this.query();
            if(err) return [ new Error(err?.message ?? undefined), null]
            return [ null, data ]
        }catch(err){
            return [ err, null ]
        }
    }

    /**
     * @name completeFree
     * @returns {{data: any, networkStatus: NetworkStatus, error: ApolloError, loading: boolean}[]|*[]|Error[]}
     */
    completeFree(){
        try{
            this.eventName = CHECKOUT_COMPLETE_FREE
            const [ err ,data ] = this.query();
            if(err) return [ new Error(err?.message ?? undefined), null]
            return [ null, data ]
        }catch(err){
            return [ err, null ]
        }
    }

    /**
     * @name show
     * @{Object} options
     * @returns {{data: any, networkStatus: NetworkStatus, error: ApolloError, loading: boolean}[]|*[]|Error[]}
     */
    show(){
        try{
            this.eventName = SHOW_CHECKOUT_BY_ID
            const [ err, data] = this.query();
            if(err) return [ new Error(err?.message ?? undefined) , null]
            return [ null ,data ]
        }catch(err){
            return [ err, null ]
        }
    }

    /**
     * @name create
     * @returns {{data: any, networkStatus: NetworkStatus, error: ApolloError, loading: boolean}[]|*[]|Error[]}
     */
    create(){
        try{
            this.eventName = CREATE_CHECKOUT
            const [ err, data ] = this.query();
            if(err) return [ new Error(err?.message ?? undefined), null]
            return [ null, data ]
        }catch(err){
            return [ err, null ]
        }
    }
}