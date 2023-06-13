import {ApiService} from "../../../api.service";
import {LIST_ORDERS_USER} from "./index.gql";
import {MutationGql} from "../index";
import {NativeModules} from "react-native";

export default class OrdersGql{
    constructor(props) {
    }



    async userList(){
        try{
            const [ err , data ] =  await new ApiService({
                url:`/admin/api`,
                mode:'admin',
                config: {
                    headers: {
                        'Content-Type':"application/json"
                    }
                },
                body: {
                    query : ['{',LIST_ORDERS_USER,'}'].join(''),
                    variables:{
                        // customerId
                    }
                }
            }).post()
                .then((response)=> {
                    return [ null, response?.data ?? response]
                })
                .catch((err)=> {
                    return [ err , null ]
                })
            console.log({err,data})

            return [ err, data ]
        }catch (err){
            return [ err, null ]
        }
    }
}