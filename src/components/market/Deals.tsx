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

const cellStyle = {
	borderRight: '1px solid grey',
	borderLeft: '1px solid grey',
};

const Deals = () => {
	const [data, setData] = React.useState<OrderBlotterProps[]>([]);

	React.useEffect(() => {
		const disconnect = StompService({
			subscribeurl: '/user/topic/orderBlotter',
			sendurl: '/app/orderBlotter',
			callback: (msg: string) => {
				console.log(JSON.parse(msg) as OrderBlotterProps[]);
				setData(JSON.parse(msg) as OrderBlotterProps[]);
			},
		});

		return disconnect;
	}, []);

	return (
		<React.Fragment>
			<MaterialTable
				title='最近交易单'
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
