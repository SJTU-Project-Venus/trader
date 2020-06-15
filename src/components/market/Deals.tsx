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
	Typography,
	RadioGroup,
	FormLabel,
	FormControlLabel,
	Radio,
} from '@material-ui/core';
import { FutureNames } from '../order/pending/OrderFormCol';


const cellStyle = {
	borderRight: '1px solid grey',
	borderLeft: '1px solid grey',
	width: '7%',
};

const Deals = () => {
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

		return disconnect.disconnect;
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
								<Grid item xs={8}>
									<FormControl component='fieldset'>
										<FormLabel component='legend'>选择交易商品</FormLabel>
										<RadioGroup
											row
											aria-label='position'
											name='position'
											value={futureName}
											onChange={(
												event: React.ChangeEvent<HTMLInputElement>
											) => {
												setFutureName((event.target as HTMLInputElement).value);
											}}
										>
											{FutureNames.map((elem, index) => {
												return (
													<FormControlLabel
														key={`${index}`}
														value={elem}
														control={<Radio color='primary' />}
														label={elem}
														labelPlacement='top'
													/>
												);
											})}
										</RadioGroup>
									</FormControl>
								</Grid>
							</Grid>
						</React.Fragment>
					),
				}}
				columns={[
					{
						title: '中介公司',
						field: 'brokerCompany',
						sorting: false,
						cellStyle: { ...cellStyle, borderLeft: '1px solid white' },
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
						cellStyle: { ...cellStyle, width: '15%' },
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
