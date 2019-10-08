import createSagaMiddleware from 'redux-saga';
import { persistStore } from 'redux-persist';
import createStore from './createStore';

import rootReducer from './modules/rootReducer';
import rootSaga from './modules/rootSaga';
import persistReducer from './persistReducers';

/** Check env to enable tron or not */
const sagaMonitor = 
  process.env.NODE_ENV === 'development'
    ? console.tron.createSagaMonitor() // eslint-disable-line
    : null;

/** Create a middleware for saga for console mode used for dev env only */
const sagaMiddleware = createSagaMiddleware({ sagaMonitor });

/** Build the middleware based on construct before */
const middlewares = [sagaMiddleware];

/** create store for rootReducer in persist mode */
const store = createStore(persistReducer(rootReducer), middlewares);
const persistor = persistStore(store);

/** middlware redirectoin to saga */
sagaMiddleware.run(rootSaga);

export { store, persistor };
