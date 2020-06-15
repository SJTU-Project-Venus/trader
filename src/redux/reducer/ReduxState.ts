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
	wsId: Stomp.Subscription | null;
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
		wsId: null,
	},
};

export default initialReduxState;
