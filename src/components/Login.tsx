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
	IconButton,
	Typography,
} from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import { useHistory } from 'react-router';
import store from '../redux/store/Store';
import BaseAction from '../redux/action/BaseAction';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			maxWidth: '30%',
			marginLeft: '35%',
			marginTop: '10%',
		},
		actions: {
			textAlign: 'center',
		},
	})
);

interface LoginProps {
	userId: string;
	password: string;
}

const initialValues: LoginProps = {
	userId: '',
	password: '',
};

const Login = () => {
	const classes = useStyles();
	const [login, setLogin] = React.useState<boolean>(true);
	const history = useHistory();

	return (
		<React.Fragment>
			<Formik
				onSubmit={(values, { setSubmitting }) => {
					console.log(values);
					setTimeout(() => {
						setSubmitting(false);
						store.dispatch(
							BaseAction.login({ userId: values.userId, login: true })
						);
						history.push('/');
					}, 1000);
				}}
				initialValues={initialValues}
				render={({ submitForm, isSubmitting }) => (
					<Form>
						<Card className={classes.root}>
							<CardHeader
								avatar={
									<Avatar>
										<AccountCircle />
									</Avatar>
								}
								action={
									<IconButton
										onClick={() => {
											setLogin(!login);
										}}
										aria-label='settings'
									>
										{login ? (
											<Typography>{'注册'}</Typography>
										) : (
											<Typography>{'登录'}</Typography>
										)}
									</IconButton>
								}
								title={login ? '登录' : '注册'}
							/>
							<CardContent>
								<Grid container direction='column'>
									<Field component={TextField} label='用户名' name='userId' />
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
									{login ? '登录' : '注册'}
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
