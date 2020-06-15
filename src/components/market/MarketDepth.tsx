import React from 'react';
import MaterialTable from 'material-table';
import {
	NavigateBefore,
	NavigateNext,
	LastPage,
	FirstPage,
} from '@material-ui/icons';
import StompService from '../../apis/Websocket';
import {
	Grid,
	FormControl,
	Select,
	MenuItem,
	FormHelperText,
	makeStyles,
	createStyles,
	Theme,
	Typography,
} from '@material-ui/core';
import { FutureNames, BrokerNames } from '../order/pending/OrderFormCol';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		formControl: {
			margin: theme.spacing(1),
			minWidth: 150,
		},
		selectEmpty: {
			marginTop: theme.spacing(2),
		},
	})
);

const cellStyle = {
	borderRight: '1px solid grey',
	borderLeft: '1px solid grey',
};

interface Data {
	buyLevel: number | undefined;
	buyVol: number | undefined;
	sellLevel: number | undefined;
	sellVol: number | undefined;
	price: number;
}

interface TradersProps {
	price: number;
	count: number;
}

interface MarketDepthWS {
	marketQuotation: {
		changePercent: any;
		changePrice: number;
		closePrice: number;
		currentPrice: number;
		currentTime: string;
		date: string;
		highPrice: number;
		id: string;
		lastClosePrice: number;
		lowPrice: number;
		marketDepthId: string;
		openPrice: number;
	};
	marketDepth: {
		buyers: TradersProps[];
		id: string;
		sellers: TradersProps[];
	};
	marketDepthId: string;
	timestamp: number;
	futureName: string;
}

const MarketDepth = () => {
	const classes = useStyles();
	const [data, setData] = React.useState<Data[]>([]);
	const [broker, setBroker] = React.useState<string>('M');
	const [futureName, setFutureName] = React.useState<string>('OIL-SEP22');

	React.useEffect(() => {
		const disconnect = StompService({
			subscribeurl: '/user/topic/orderBook',
			callback: (msg: string) => {
				console.log('market depth get msg', msg);
				const data = JSON.parse(msg);
				const marketDepth: any = JSON.parse(data.marketDepth);
				const buyers: TradersProps[] = marketDepth.buyers as TradersProps[];
				const sellers: TradersProps[] = marketDepth.sellers as TradersProps[];
				const tmp: Data[] = [];
				const len = sellers.length;
				sellers.reverse().map((elem, index) => {
					tmp.push({
						buyLevel: undefined,
						buyVol: undefined,
						price: elem.price,
						sellVol: elem.count,
						sellLevel: len - index,
					});
					return 0;
				});
				buyers.map((elem, index) => {
					tmp.push({
						sellLevel: undefined,
						sellVol: undefined,
						price: elem.price,
						buyVol: elem.count,
						buyLevel: index + 1,
					});
					return 0;
				});
				setData(tmp);
			},
			sendurl: '/app/orderBook',
			sendMsg: JSON.stringify({ futureName: futureName, brokerName: broker }),
		});

		return disconnect;
	}, [broker, futureName]);

	return (
		<React.Fragment>
			<MaterialTable
				title='Market Depth'
				components={{
					Toolbar: () => (
						<React.Fragment>
							<Grid container>
								<Grid item xs={2}>
									<Typography variant='h5'>{'市场纵深'}</Typography>
								</Grid>
								<Grid item xs={2}>
									<FormControl className={classes.formControl}>
										<Select
											value={broker}
											onChange={(e: any) => {
												const name = e.target.value as string;
												setBroker(name);
											}}
											displayEmpty
											inputProps={{ 'aria-label': 'Without label' }}
											fullWidth
										>
											{BrokerNames.map((elem, index) => {
												return (
													<MenuItem value={elem} key={`${index}`}>
														{elem}
													</MenuItem>
												);
											})}
										</Select>
										<FormHelperText>选择中介公司</FormHelperText>
									</FormControl>
								</Grid>
								<Grid item xs={3}>
									<FormControl className={classes.formControl}>
										<Select
											value={futureName}
											onChange={(e: any) => {
												const name = e.target.value as string;
												setFutureName(name);
											}}
											displayEmpty
											inputProps={{ 'aria-label': 'Without label' }}
											fullWidth={true}
										>
											{FutureNames.map((elem, index) => {
												return (
													<MenuItem value={elem} key={`${index}`}>
														{elem}
													</MenuItem>
												);
											})}
										</Select>
										<FormHelperText>{'   选择交易商品名称   '}</FormHelperText>
									</FormControl>
								</Grid>
							</Grid>
						</React.Fragment>
					),
				}}
				columns={[
					{
						title: '买方序列',
						field: 'buyLevel',
						sorting: false,
						cellStyle: { ...cellStyle, borderLeft: '1px solid white' },
					},
					{
						title: '买方数量',
						field: 'buyVol',
						sorting: false,
						cellStyle: cellStyle,
					},
					{
						title: '价格',
						field: 'price',
						sorting: false,
						cellStyle: cellStyle,
					},
					{
						title: '卖方数量',
						field: 'sellVol',
						sorting: false,
						cellStyle: cellStyle,
					},
					{
						title: '卖方序列',
						field: 'sellLevel',
						sorting: false,
						cellStyle: cellStyle,
					},
				]}
				data={data}
				options={{
					search: false,
					sorting: false,
					pageSize: 10,
					pageSizeOptions: [10],
					paginationType: 'normal',
					headerStyle: {
						backgroundColor: 'rgb(248,248,248)',
					},
				}}
				icons={{
					NextPage: React.forwardRef((props, ref) => {
						return <NavigateNext {...props} ref={ref} />;
					}),
					PreviousPage: React.forwardRef((props, ref) => {
						return <NavigateBefore {...props} ref={ref} />;
					}),
					LastPage: React.forwardRef((props, ref) => {
						return <LastPage {...props} ref={ref} />;
					}),
					FirstPage: React.forwardRef((props, ref) => {
						return <FirstPage {...props} ref={ref} />;
					}),
				}}
			/>
		</React.Fragment>
	);
};

export default MarketDepth;
