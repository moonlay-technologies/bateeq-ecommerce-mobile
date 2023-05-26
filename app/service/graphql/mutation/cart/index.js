import {gql, useQuery} from '@apollo/client'
import {Query} from "@apollo/client/react/components";
import {
    CART_ADD,
    CART_CLEAR,
    CART_INITIAL,
    CART_PUT_QTY,
    CART_REMOVE_ITEM
} from "./index.gql";
export class GqlCart {
    /**
     *
     * @param {Object} props
     * @param {Object | {}} props.variables
     * @param {Object | {}} props.options
     */
    constructor(props = {}) {
        this.variables = props?.variables ?? {}
        this.options = props?.options ?? {}
        this.eventName = undefined
    }

    /**
     * @name init
     * @returns {[Error,null]|[null,{data: any, networkStatus: NetworkStatus, error: ApolloError, loading: boolean}]|*[]}
     */
    init(){
        try{
            this.eventName = CART_INITIAL
            const [ err, data] = this._query()
            if(err) return [ new Error(err?.message ?? undefined)]
        }catch (err){
            return [ err, null ]
        }
    }

    /**
     * @method _query
     * @private
     */
    _query(){
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

    /**
     * @name create
     * @returns {[Error,null]|[null,{data: any, networkStatus: NetworkStatus, error: ApolloError, loading: boolean}]}
     */
    create(){
        try{
            this.eventName = CART_ADD
            return this._query()
        }catch(err){
            return [ err , null ]
        }
    }

    /**
     * @name reset
     * @returns {[Error,null]|[null,{data: any, networkStatus: NetworkStatus, error: ApolloError, loading: boolean}]}
     */
    reset(){
        try{
            this.eventName = CART_CLEAR
            return this._query()
        }catch(err){
            return [ err, null ]
        }
    }


    remove(){
        try{
            this.eventName = CART_REMOVE_ITEM
            return this._query();
        }catch(err){
            return [err , null]
        }
    }


    /**
     * @name putQty
     * @returns {[Error,null]|[null,{data: any, networkStatus: NetworkStatus, error: ApolloError, loading: boolean}]|*[]}
     */
    putQty(){
        try{
            this.eventName = CART_PUT_QTY
            return this._query()
        }catch(err){
            return [ err, null ]
        }
    }

}