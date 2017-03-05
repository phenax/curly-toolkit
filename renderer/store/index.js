
import { createStore, combineReducers } from 'redux';
import { router } from './reducers';

const rootReducer= combineReducers({
	router
});

export default createStore(rootReducer);
