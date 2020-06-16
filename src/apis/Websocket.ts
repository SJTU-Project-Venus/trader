import { WsTypes } from './../redux/action/ActionTypes';
import { TRADER_WEBSOCKET } from './BaseUrlConfig';
import Stomp from 'stompjs';
import store from '../redux/store/Store';
import BaseAction from '../redux/action/BaseAction';

interface StompServiceProps {
	url?: string;
	subscribeurl: string;
	sendurl: string;
	sendMsg: string;
	callback: (msg: string) => any;
	name: WsTypes;
	future?: string;
}

const StompService = (props: StompServiceProps) => {
	const { traderCompany } = store.getState().base.user;
	const {
		url = TRADER_WEBSOCKET + '/' + traderCompany + '/ws',
		subscribeurl,
		sendurl,
		callback,
		sendMsg,
		name,
		future,
	} = props;
	const { userId } = store.getState().base.user;
	const client = Stomp.client(url);

	const connectionCallback = () => {
		console.log('ws connect ok');
		const subId = client.subscribe(subscribeurl, (message) => {
			console.log('subscribe ok');
			store.dispatch(BaseAction.setWSId(subId, name, future));
			if (message.body) {
				//console.log('got message with body ', message.body);
				callback(message.body);
			} else {
				console.log('got empty message');
			}
		});
		store.dispatch(BaseAction.setWSId(subId, name, future));
		client.send(sendurl, {}, sendMsg);
	};

	const errorCallback = () => {
		console.log('ws connect error');
	};

	client.connect(`${userId}`, `${userId}`, connectionCallback, errorCallback);
	client.heartbeat.outgoing = 4000;
	client.heartbeat.incoming = 4000;

	return () => {
		client.disconnect(() => {
			console.log('disconnect ws');
		});
	};
};

export default StompService;
