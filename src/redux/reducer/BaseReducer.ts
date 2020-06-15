import { AnyAction } from 'redux';
import ActionTypes from '../action/ActionTypes';
import initialReduxState, { BaseReducerStateProps } from './ReduxState';

const baseReducer = (
	state = initialReduxState.base,
	action: AnyAction
): BaseReducerStateProps => {
	switch (action.type) {
		case ActionTypes.LOGIN: {
			return {
				...state,
				user: action.user,
			};
		}
		case ActionTypes.LOGOUT: {
			return { ...initialReduxState.base };
		}
		case ActionTypes.SETWSID: {
			return {
				...state,
				wsId: action.wsId,
			};
		}
		default: {
			return state;
		}
	}
};

export default baseReducer;
