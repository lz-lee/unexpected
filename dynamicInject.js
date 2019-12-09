
import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { combineReducers } from 'redux-immutable';
import rootReducer from 'reducers';

// Redux console logger
const logger = createLogger({ collapsed: true });

// Redux DevTools Extension for Chrome and Firefox
/* eslint-disable no-underscore-dangle */
const reduxDevTool = () =>
  typeof window === 'object' && typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined'
    ? window.__REDUX_DEVTOOLS_EXTENSION__()
    : f => f;

export default function configureStore(initialState) {
  const isDev = process.env.NODE_ENV === 'development';
  const sagaMiddleware = createSagaMiddleware();
  const initialReducer = combineReducers(rootReducer);
  let middlewares = [sagaMiddleware];
  let composedStoreEnhancer = null;

  if (isDev) {
    middlewares = applyMiddleware(...middlewares.concat([logger]));
    composedStoreEnhancer = compose(
      middlewares,
      reduxDevTool()
    );
  } else {
    middlewares = applyMiddleware(...middlewares);
  }

  const store = composedStoreEnhancer
    ? composedStoreEnhancer(createStore)(initialReducer, initialState)
    : createStore(initialReducer, initialState, middlewares);

  if (isDev && module.hot) {
    module.hot.accept('../store', () => {
      /* eslint-disable-next-line */
      const nextRootReducer = require('../store/index');
      store.replaceReducer(nextRootReducer);
    });
  }
  // 动态注册 reducer
  store.asyncReducers = rootReducer;
  return {
    store,
    runSaga: sagaMiddleware.run
  };
}

const configure = configureStore();
const { store, runSaga } = configure;

/**
 * 使用 replaceReducer 方法动态注册 reducer
 * @param {key} reducer key
 * @param {reducer} reducer function
 */
const injectReducer = ({ key, reducer }) => {
  const { asyncReducers } = store;

  if (asyncReducers && asyncReducers.hasOwnProperty(key)) {
    // tslint:disable-next-line:no-console
    console.log(`${key} Already exist`);
    return;
  }
  asyncReducers[key] = reducer;
  store.replaceReducer(combineReducers(asyncReducers));
};

// 动态注册 saga
// 应避免重复注册，发一次action，导致发两次 request 的问题
function proxyRunSaga() {
  const alreadyRun = {};
  return (saga) => {
    const prevTask =  alreadyRun[saga];
    if (!prevTask || !prevTask.isRunning()) {
      alreadyRun[saga] = runSaga(saga);
    }
    console.log(saga.name, prevTask.isRunning(), '<<<<<isRunning');
  }
}
export default {
  store,
  runSaga: proxyRunSaga(),
  injectReducer
};
