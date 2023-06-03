import {gql, useQuery} from '@apollo/client'
import {Query} from "@apollo/client/react/components";
import {
    CART_ADD,
    CART_CLEAR,
    CART_INITIAL,
    CART_PUT_QTY,
    CART_REMOVE_ITEM
} from "./index.gql";
import {MutationGql} from "../index";
export class GqlCart extends MutationGql{
    constructor(props = {}) {
        super(props)
    }

    /**
     * @name init
     * @returns {[Error,null]|[null,{data: any, networkStatus: NetworkStatus, error: ApolloError, loading: boolean}]|*[]}
     */
    init(){
        try{
            this.eventName = CART_INITIAL
            const [ err, data] = this.query()
            if(err) return [ new Error(err?.message ?? undefined)]
        }catch (err){
            return [ err, null ]
        }
    }

    /**
     * @name create
     * @returns {[Error,null]|[null,{data: any, networkStatus: NetworkStatus, error: ApolloError, loading: boolean}]}
     */
    create(){
        try{
            this.eventName = CART_ADD
            return this.query()
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
            return this.query()
        }catch(err){
            return [ err, null ]
        }
    }


    /**
     * @name remove
     * @returns {[Error,null]|[null,{data: any, networkStatus: NetworkStatus, error: ApolloError, loading: boolean}]|*[]}
     */
    remove(){
        try{
            this.eventName = CART_REMOVE_ITEM
            return this.query();
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
            return this.query()
        }catch(err){
            return [ err, null ]
        }
    }

}