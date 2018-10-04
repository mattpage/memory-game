import React from 'react'
import { hydrate } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { all } from 'redux-saga/effects'
import freeze from 'redux-freeze'
import App, { NAMESPACE as APP_NAMESPACE, reducer } from '../containers/App'
import { NAMESPACE as GAME_NAMESPACE, reducer as gameReducer, gameFlow } from '../containers/Game'
import {
  reducer as gameDataReducer,
  NAMESPACE as GAME_DATA_NAMESPACE,
  fetchGameDataFlow,
} from '../services/gameData'

const preloadedState = window.PRELOADED_STATE
delete window.PRELOADED_STATE

const sagaMiddleware = createSagaMiddleware()

// redux-devtools-extension support
// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  combineReducers({
    [APP_NAMESPACE]: reducer,
    [GAME_NAMESPACE]: gameReducer,
    [GAME_DATA_NAMESPACE]: gameDataReducer,
  }),
  preloadedState,
  composeEnhancers(applyMiddleware(freeze, sagaMiddleware))
)

window.store = store

function* runSagas() {
  // run all sagas in parallel
  yield all([fetchGameDataFlow, gameFlow])
}

sagaMiddleware.run(runSagas)

hydrate(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
