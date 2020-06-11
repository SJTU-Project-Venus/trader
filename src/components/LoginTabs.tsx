import React from 'react';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Login from './Login';
import Register from './Register';
import { Card } from '@material-ui/core';

interface TabPanelProps {
	children?: React.ReactNode;
	dir?: string;
	index: any;
	value: any;
}

function TabPanel(props: TabPanelProps) {
	const { children, value, index, ...other } = props;

	return (
		<Typography
			component='div'
			role='tabpanel'
			hidden={value !== index}
			id={`full-width-tabpanel-${index}`}
			aria-labelledby={`full-width-tab-${index}`}
			{...other}
		>
			{value === index && <Box p={3}>{children}</Box>}
		</Typography>
	);
}

function a11yProps(index: any) {
	return {
		id: `full-width-tab-${index}`,
		'aria-controls': `full-width-tabpanel-${index}`,
	};
}

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		backgroundColor: theme.palette.background.paper,
		width: 500,
  },
  card: {
    maxWidth: '30%',
    marginLeft: '35%',
    marginTop: '5%',
  },
}));

const LoginTabs = () => {
	const classes = useStyles();
	const theme = useTheme();
	const [value, setValue] = React.useState(0);

	const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
		setValue(newValue);
	};

	return (
		<React.Fragment>
			<Card className={classes.card}>
				<AppBar position='static' color='default'>
					<Tabs
						value={value}
						onChange={handleChange}
						indicatorColor='primary'
						textColor='primary'
						variant='fullWidth'
						aria-label='full width tabs example'
					>
						<Tab label='登录' {...a11yProps(0)} />
						<Tab label='注册' {...a11yProps(1)} />
					</Tabs>
				</AppBar>
				<TabPanel value={value} index={0} dir={theme.direction}>
					<Login />
				</TabPanel>
				<TabPanel value={value} index={1} dir={theme.direction}>
					<Register />
				</TabPanel>
			</Card>
		</React.Fragment>
	);
};

export default LoginTabs;
