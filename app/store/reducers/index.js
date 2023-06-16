import { combineReducers } from 'redux';
import Cart from './Cart';
import Auth from './Auth';
import Theme from './Theme';
import Product from './Product';
import User from './User';
import Checkout from './Checkout';
import Address from './address';

const rootReducers = combineReducers({
  Cart,
  Theme,
  Checkout,
  User,
  Address,
  Product,
  Auth,
});
export default rootReducers;
