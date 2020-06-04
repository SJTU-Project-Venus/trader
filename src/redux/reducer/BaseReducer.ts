import { AnyAction } from 'redux';
import ActionTypes from '../action/ActionTypes';
import initialReduxState from './ReduxState';

const baseReducer = (state = initialReduxState.base, action: AnyAction) => {
	switch (action.type) {
		case ActionTypes.LOGIN: {
			return {
				...state,
				user: action.user,
			};
		}
		case ActionTypes.LOGOUT: {
			return {
				...state,
				user: {...initialReduxState.base.user},
			};
		}
		default: {
			return state;
		}
	}
};

export default baseReducer;
