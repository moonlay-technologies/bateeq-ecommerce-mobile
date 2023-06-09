import {MutationGql} from "../index";
import {AUTH_SIGN_IN_GQL} from "./index.gql";

export * from './authentication'

export class Authentication extends MutationGql{
    constructor(props) {
        super(props)
    }

    signIn(){
        try{
            this.eventName = AUTH_SIGN_IN_GQL
            const [ err, callback ] = this.mutation()
            return [ err, callback]
        }catch(err){
            return [ err, null ]
        }
    }
}