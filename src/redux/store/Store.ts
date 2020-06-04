import { createStore, combineReducers } from 'redux';
import baseReducer from '../reducer/BaseReducer';

const reducer = combineReducers({
	base: baseReducer,
});

const store = createStore(reducer);

export default store;
