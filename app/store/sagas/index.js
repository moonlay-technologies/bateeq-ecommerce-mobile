import { all } from 'redux-saga/effects';
import Cart from './cart';
import Product from './Product';
import User from './User';
import Checkout from './Checkout';
import Pages from './Pages';

export default function* rootSaga(getState) {
  yield all([Cart(), User(), Product(), Checkout(), Pages()]);
}
