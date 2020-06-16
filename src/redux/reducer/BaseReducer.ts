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
			switch (action.name) {
				case 'MARKETDEPTH': {
					return {
						...state,
						wsId: {
							...state.wsId,
							marketdepth: {
								future: action.future,
								sub: action.wsId,
							},
						},
					};
				}
				case 'PENDING': {
					return {
						...state,
						wsId: {
							...state.wsId,
							pending: action.wsId,
						},
					};
				}
				case 'DEALS': {
					return {
						...state,
						wsId: {
							...state.wsId,
							deals: action.wsId,
						},
					};
				}
			}
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
