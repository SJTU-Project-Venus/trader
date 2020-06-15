import Stomp from 'stompjs';
import { AnyAction } from 'redux';
import { LoginUserProps } from './../reducer/ReduxState';
import ActionTypes from './ActionTypes';

const BaseAction = {
	login: (user: LoginUserProps): AnyAction => ({
		type: ActionTypes.LOGIN,
		user: user,
	}),
	logout: (): AnyAction => ({
		type: ActionTypes.LOGOUT,
	}),
	setWSId: (wsId: Stomp.Subscription | null): AnyAction => ({
		type: ActionTypes.SETWSID,
		wsId: wsId,
	}),
};

export default BaseAction;
