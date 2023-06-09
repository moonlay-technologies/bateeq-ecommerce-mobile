import { combineReducers } from "redux";
import Cart from './Cart';
import Auth from './Auth';

const rootReducers = combineReducers({
    Cart,
    Auth
})
export default rootReducers