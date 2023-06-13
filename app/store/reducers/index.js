import { combineReducers } from "redux";
import Cart from './Cart';
import Auth from './Auth';
import Theme from './Theme';
import Product from './Product';

const rootReducers = combineReducers({
    Cart,
    Theme,
    Product,
    Auth
})
export default rootReducers