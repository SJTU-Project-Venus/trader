import React from 'react';
import { Container, Paper, Tabs, Tab, Box } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/styles';
import Pending from './Pending';
import Finished from './Finshed';

const useStyle = makeStyles(() =>
	createStyles({
		root: {
			minHeight: 520,
			marginTop: 30,
			padding: 10,
			textAlign: 'center',
		},
	})
);

interface TabPanelProps {
	children?: React.ReactNode;
	index: any;
	value: any;
}

const TabPanel = (props: TabPanelProps) => {
	const { children, value, index, ...other } = props;

	return (
		<div
			role='tabpanel'
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && <Box p={3}>{children}</Box>}
		</div>
	);
};

function a11yProps(index: any) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	};
}

const Order = () => {
	const classes = useStyle();
	const [value, setValue] = React.useState(0);

	const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
		setValue(newValue);
	};

	return (
		<React.Fragment>
			<Container>
				<Paper className={classes.root}>
					<Tabs
						value={value}
						indicatorColor='primary'
						textColor='primary'
						onChange={handleChange}
					>
						<Tab label='未完成订单' {...a11yProps(0)} />
						<Tab label='已完成订单' {...a11yProps(1)} />
					</Tabs>
					<TabPanel value={value} index={0}>
						<Pending />
					</TabPanel>
					<TabPanel value={value} index={1}>
						<Finished />
					</TabPanel>
				</Paper>
			</Container>
		</React.Fragment>
	);
};

export default Order;
