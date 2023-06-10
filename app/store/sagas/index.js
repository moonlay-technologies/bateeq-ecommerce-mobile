import { all } from 'redux-saga/effects';
import Cart from './cart'
export default function* rootSaga(getState){
    yield all([
        Cart()
    ])
}