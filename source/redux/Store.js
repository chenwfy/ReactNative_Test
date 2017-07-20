import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import * as rootReducer from './reducers/Root';

const reducers = combineReducers(rootReducer);
export const Store = applyMiddleware(
    thunk,
    logger()
)(createStore)(reducers);