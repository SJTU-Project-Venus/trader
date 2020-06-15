import React from 'react';
import {
	makeStyles,
	createStyles,
	Container,
	Paper,
} from '@material-ui/core';
import MarketDepth from './MarketDepth';
import Deals from './Deals';

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

const Market = () => {
	const classes = useStyle();

	return (
		<React.Fragment>
			<Container>
				<Paper className={classes.root}>
					<MarketDepth />
					<Deals />
				</Paper>
			</Container>
		</React.Fragment>
	);
};

export default Market;
