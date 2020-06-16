import Stomp from 'stompjs';
export interface LoginUserProps {
	userId: string;
	traderName: string;
	traderCompany: string;
	login: boolean;
	access_token: string;
}

export interface UserProps {
	userId: string | undefined;
	traderName: string;
	traderCompany: string;
	login: boolean;
	access_token: string;
}

export interface BaseReducerStateProps {
	user: UserProps;
	wsId: {
		marketdepth: { sub: Stomp.Subscription | null; future: string };
		pending: Stomp.Subscription | null;
		deals: Stomp.Subscription | null;
	};
}

export interface ReduxState {
	base: BaseReducerStateProps;
}

const initialReduxState: ReduxState = {
	base: {
		user: {
			userId: undefined,
			traderName: '',
			traderCompany: '',
			login: false,
			access_token: '',
		},
		wsId: {
			marketdepth: {
				sub: null,
				future: 'OIL-SEP22',
			},
			deals: null,
			pending: null,
		},
	},
};

export default initialReduxState;
