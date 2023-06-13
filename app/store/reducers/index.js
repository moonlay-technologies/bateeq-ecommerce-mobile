import { combineReducers } from "redux";
import Cart from './Cart';
import Auth from './Auth';
import Theme from './Theme';
import Product from './Product';
import User from './User';

const rootReducers = combineReducers({
    Cart,
    Theme,
    User,
    Product,
    Auth
})
export default rootReducers