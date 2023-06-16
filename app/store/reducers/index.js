import { combineReducers } from "redux";
import Cart from './Cart';
import Auth from './Auth';
import Theme from './Theme';
import Product from './Product';
import User from './User';
import Checkout from './Checkout';
import Pages from './Pages';

const rootReducers = combineReducers({
    Cart,
    Theme,
    Pages,
    Checkout,
    User,
    Product,
    Auth
})
export default rootReducers