import rootReducer from '../reducers';
import thunk from 'redux-thunk';
import { createStore, compose, applyMiddleware } from 'redux';

const composeEnhancers = 
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const enhancer = composeEnhancers(
    applyMiddleware(thunk),
);

const configureStore = (preloadedState: any) => ( 
    createStore(
        rootReducer,
        preloadedState, 
        enhancer, 
    )
);

const store = configureStore({});

export type Store = typeof store;
export type AppDispatch = Store['dispatch']

export default store;
