import Stomp from 'stompjs';
import React from 'react';

export const StompService = () => {
	const webSocketUrl = 'ws://localhost:8081/ws';
	const webSocketGreetingsSubscribeEndpoint = '/user/topic/orderBlotter';
	const webSocketGreetingsSendEndpoint = '/app/orderBlotter';
	const client = Stomp.client(webSocketUrl);

	const connectionCallback = () => {
		console.log('ws connect ok');
		client.subscribe(webSocketGreetingsSubscribeEndpoint, (message) => {
			console.log('subscribe ok');
			if (message.body) {
				alert('got message with body ' + message.body);
			} else {
				alert('got empty message');
			}
		});
		client.send(
			webSocketGreetingsSendEndpoint,
			{},
			JSON.stringify({ futureName: 'GOLD' })
		);
	};

	const errorCallback = () => {
		console.log('ws connect error');
	};

	client.connect('my', 'my', connectionCallback, errorCallback);
	client.heartbeat.outgoing = 4000; // client will send heartbeats every 20000ms
	client.heartbeat.incoming = 4000; // client does not want to receive heartbeats

	return {
		client: client,
	};
};
