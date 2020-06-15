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
}

const StompService = (props: StompServiceProps) => {
	const { traderCompany } = store.getState().base.user;
	const {
		url = TRADER_WEBSOCKET + '/' + traderCompany + '/ws',
		subscribeurl,
		sendurl,
		callback,
		sendMsg,
	} = props;
	const { userId } = store.getState().base.user;
	const client = Stomp.client(url);

	const connectionCallback = () => {
		console.log('ws connect ok');
		const subId = client.subscribe(subscribeurl, (message) => {
			console.log('subscribe ok');
			if (message.body) {
				//console.log('got message with body ', message.body);
				callback(message.body);
			} else {
				console.log('got empty message');
			}
		});
		store.dispatch(BaseAction.setWSId(subId));
		client.send(sendurl, {}, sendMsg);
	};

	const errorCallback = () => {
		console.log('ws connect error');
	};

	client.connect(`${userId}`, `${userId}`, connectionCallback, errorCallback);
	client.heartbeat.outgoing = 4000;
	client.heartbeat.incoming = 4000;

	const res = {
		disconnect: () =>
			client.disconnect(() => {
				console.log('disconnect ws');
			}),
		unsubscribe: () => {
			const wsId = store.getState().base.wsId
			if (wsId) {
				wsId.unsubscribe()
				store.dispatch(BaseAction.setWSId(null));
			}
		},
	};

	return res;
};

export default StompService;
