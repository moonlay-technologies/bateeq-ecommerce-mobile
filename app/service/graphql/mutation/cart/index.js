
import {MutationGql} from "../index";
import {
    CART_ADD,
    CART_CLEAR,
    CART_INITIAL,
    CART_PUT_QTY,
    CART_REMOVE_ITEM
} from "./index.gql";
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
            const [ err, data] = this.mutation()
            if(err) return [ new Error(err?.message ?? undefined),null]
            return [ err , data ]
        }catch (err){
            return [ err, null ]
        }
    }


    create(){
        this.eventName = CART_ADD
        console.log({name:this.eventName})
        return [ null, function(){}]
        // return this.mutation()
    }

  /**
   * @name reset
   * @returns {[Error,null]|[null,{data: any, networkStatus: NetworkStatus, error: ApolloError, loading: boolean}]}
   */
  reset() {
    try {
      this.eventName = CART_CLEAR;
      return this.query();
    } catch (err) {
      return [err, null];
    }
  }

    /**
     * @name remove
     * @returns {[Error,null]|[null,{data: any, networkStatus: NetworkStatus, error: ApolloError, loading: boolean}]|*[]}
     */
    remove(){
        try{
            this.eventName = CART_REMOVE_ITEM
            return this.mutation();
        }catch(err){
            return [err , null]
        }
    }


  /**
   * @name putQty
   * @returns {[Error,null]|[null,{data: any, networkStatus: NetworkStatus, error: ApolloError, loading: boolean}]|*[]}
   */
  putQty() {
    try {
      this.eventName = CART_PUT_QTY;
      return this.mutation();
    } catch (err) {
      return [err, null];
    }
  }
}