import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './layout/Header';
import { UserProps, ReduxState } from '../redux/reducer/ReduxState';
import { connect } from 'react-redux';
import HomePage from './HomePage';
import Order from './order';
import Market from './market';
import NotFound from './NotFound';
import LoginTabs from './LoginTabs';

interface StateProps {
	user: UserProps;
}

const mapStateToProps = (state: ReduxState) => ({
	user: state.base.user,
});

type Props = StateProps;

const App = (props: Props) => {
	const { user } = props;

	return (
		<React.Fragment>
			<Router>
				<Header />
				<Switch>
					<Route exact path='/' component={HomePage}></Route>
					<Route exact path='/login' component={LoginTabs}></Route>
					<Route exact path='/market' component={Market}></Route>
					{user.login && (
						<React.Fragment>
							<Route path='/order' component={Order}></Route>
						</React.Fragment>
					)}
					<Route path='*' component={NotFound}></Route>
				</Switch>
			</Router>
		</React.Fragment>
	);
};

export default connect(mapStateToProps)(App);
