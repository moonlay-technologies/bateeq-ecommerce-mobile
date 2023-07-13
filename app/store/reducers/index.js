import { combineReducers } from 'redux';
import Cart from './Cart';
import Auth from './Auth';
import Theme from './Theme';
import Product from './Product';
import User from './User';
import Checkout from './Checkout';
import Address from './address';
import Pages from './Pages';
import Navigation from './navigation';
import Modal from './modal';

const rootReducers = combineReducers({
  Cart,
  Theme,
  Pages,
  Checkout,
  User,
  Address,
  Product,
  Auth,
  Navigation,
  _Modal:Modal,
});
export default rootReducers;
