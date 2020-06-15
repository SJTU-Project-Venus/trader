import React from 'react';
import MaterialTable from 'material-table';
import {
	NavigateBefore,
	NavigateNext,
	LastPage,
	FirstPage,
} from '@material-ui/icons';
import StompService from '../../apis/Websocket';
import { OrderBlotterProps } from '../../apis/OrderApi';
import {
	Grid,
	FormControl,
	Select,
	FormHelperText,
	MenuItem,
	makeStyles,
	Theme,
	createStyles,
	Typography,
} from '@material-ui/core';
import { FutureNames } from '../order/pending/OrderFormCol';

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

const Deals = () => {
	const classes = useStyles();
	const [data, setData] = React.useState<OrderBlotterProps[]>([]);
	const [futureName, setFutureName] = React.useState<string>('OIL-SEP22');

	React.useEffect(() => {
		const disconnect = StompService({
			subscribeurl: '/user/topic/orderBlotter',
			sendurl: '/app/orderBlotter',
			callback: (msg: string) => {
				console.log(JSON.parse(msg) as OrderBlotterProps[]);
				setData(JSON.parse(msg) as OrderBlotterProps[]);
			},
			sendMsg: JSON.stringify({ futureName: futureName }),
		});

		return disconnect;
	}, [futureName]);

	return (
		<React.Fragment>
			<MaterialTable
				title='最近交易单'
				components={{
					Toolbar: () => (
						<React.Fragment>
							<Grid container>
								<Grid item xs={2}>
									<Typography variant='h5'>{'最近交易单'}</Typography>
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
										<FormHelperText>{'选择交易商品名称'}</FormHelperText>
									</FormControl>
								</Grid>
							</Grid>
						</React.Fragment>
					),
				}}
				columns={[
					{
						title: '订单编号',
						field: 'id',
						sorting: false,
						cellStyle: { ...cellStyle, borderLeft: '1px solid white' },
					},
					{
						title: '中介公司',
						field: 'brokerCompany',
						sorting: false,
						cellStyle: cellStyle,
					},
					{
						title: '商品类型',
						field: 'futureName',
						sorting: false,
						cellStyle: cellStyle,
					},
					{
						title: '交易时间',
						field: 'creationTime',
						sorting: false,
						cellStyle: cellStyle,
					},
					{
						title: '交易价格',
						field: 'price',
						sorting: false,
						cellStyle: cellStyle,
					},
					{
						title: '交易数量',
						field: 'count',
						sorting: false,
						cellStyle: cellStyle,
					},
					{
						title: '买方公司',
						field: 'buyerTraderName',
						sorting: false,
						cellStyle: cellStyle,
					},
					{
						title: '买方交易员',
						field: 'buyerTraderDetailName',
						sorting: false,
						cellStyle: cellStyle,
					},
					{
						title: '卖方公司',
						field: 'sellerTraderName',
						sorting: false,
						cellStyle: cellStyle,
					},
					{
						title: '卖方交易员',
						field: 'sellerTraderDetailName',
						sorting: false,
						cellStyle: { ...cellStyle, borderRight: '1px solid white' },
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

export default Deals;
