import Stomp from 'stompjs';
import { AnyAction } from 'redux';
import { LoginUserProps } from './../reducer/ReduxState';
import ActionTypes, { WsTypes } from './ActionTypes';

const BaseAction = {
	login: (user: LoginUserProps): AnyAction => ({
		type: ActionTypes.LOGIN,
		user: user,
	}),
	logout: (): AnyAction => ({
		type: ActionTypes.LOGOUT,
	}),
	setWSId: (wsId: Stomp.Subscription | null, name: WsTypes, future?: string): AnyAction => ({
		type: ActionTypes.SETWSID,
		name: name,
		wsId: wsId,
		future: future
	}),
};

export default BaseAction;
