import React from 'react';
import {
	Avatar,
	Grid,
	Button,
	CardHeader,
	makeStyles,
	Theme,
	createStyles,
	Card,
	CardContent,
	CardActions,
} from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import { useHistory } from 'react-router';
import store from '../redux/store/Store';
import BaseAction from '../redux/action/BaseAction';
import UserApi, { LoginProps } from '../apis/UserApi';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		actions: {
			textAlign: 'center',
		},
	})
);

const initialValues: LoginProps = {
	username: '',
	password: '',
};

const Login = () => {
	const classes = useStyles();
	const history = useHistory();

	return (
		<React.Fragment>
			<Formik
				onSubmit={(values, { setSubmitting }) => {
					console.log(values);
					UserApi.login(values)
						.then((res) => {
							console.log('login res', res);
							const { access_token, userId } = res.data;
							store.dispatch(
								BaseAction.login({
									userId: userId,
									traderName: values.username,
									traderCompany: 'A',
									login: true,
									access_token: access_token,
								})
							);
							history.push('/');
						})
						.catch((err) => {
							console.log('login err', err);
						});
					setSubmitting(false);
				}}
				initialValues={initialValues}
				render={({ submitForm, isSubmitting }) => (
					<Form>
						<Card>
							<CardHeader
								avatar={
									<Avatar>
										<AccountCircle />
									</Avatar>
								}
								title={'登录'}
							/>
							<CardContent>
								<Grid container direction='column'>
									<Field component={TextField} label='手机号' name='username' />
									<Field component={TextField} label='密码' name='password' />
								</Grid>
							</CardContent>

							<CardActions className={classes.actions}>
								<Button
									onClick={() => {
										submitForm();
									}}
									disabled={isSubmitting}
									color='primary'
									variant='contained'
								>
									{'登录'}
								</Button>
							</CardActions>
						</Card>
					</Form>
				)}
			/>
		</React.Fragment>
	);
};

export default Login;
