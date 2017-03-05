
import { createStore, combineReducers } from 'redux';
import { router } from './reducers';


export default createStore(combineReducers({ router }));
