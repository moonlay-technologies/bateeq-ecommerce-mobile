import { createStore, applyMiddleware, compose} from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from './reducers/index';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas/index';


const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware]

function configureStore(preloadedState){
    const composeEnhancers = composeWithDevTools || compose
    const store = createStore(reducers,preloadedState,composeEnhancers(applyMiddleware(...middlewares)))

    sagaMiddleware.run(rootSaga)

    if('hot' in module && typeof(module?.hot) !== 'undefined' && module?.hot){
        module.hot.accept("./reducers/index", ()=> {
            const nextRootReducer = require('./reducers/index');
            store.replaceReducer(nextRootReducer)
        })
    }

    return store;
}

const store = configureStore();

export default store