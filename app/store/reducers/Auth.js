import {SET_AUTH} from "../constants/Auth";
import {REQUEST} from "../actions/action.type";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
    isLogin : false,
    isAuthenticated: false,
}

export default function (state = initialState, action){
    let { type, payload } = action
    AsyncStorage.getItem('accessToken')
        .then(token => {
            if (token) {
                Reflect.set(state,'isLogin',true)
                Reflect.set(state,'isAuthenticated',true)
            }
        })
    switch (type){
        case REQUEST(SET_AUTH):
            return {
                ...state,
                ...payload
            }
        default:
            return state
    }
}