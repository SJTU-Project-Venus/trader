export interface LoginUserProps {
	userId: string;
	login: boolean;
}

export interface UserProps {
	userId: string | undefined;
	login: boolean;
}

export interface BaseReducerStateProps {
	user: UserProps;
}

export interface ReduxState {
	base: BaseReducerStateProps;
}

const initialReduxState: ReduxState = {
	base: {
		user: {
			userId: undefined,
			login: false,
		},
	},
};

export default initialReduxState;
