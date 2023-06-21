import { all } from 'redux-saga/effects';
import Auth from './Auth';
import Cart from './cart';
import Product from './Product';
import User from './User';
import Checkout from './Checkout';
import Address from './address';
import Pages from './Pages';

export default function* rootSaga(getState) {
  yield all([Auth(), Cart(), User(), Product(), Checkout(), Pages(), Address()]);
}
