import { all } from 'redux-saga/effects';
import Cart from './cart'
import Product from './Product'
export default function* rootSaga(getState){
    yield all([
        Cart(),
        Product()
    ])
}