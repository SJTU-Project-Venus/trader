import React from 'react';
import MaterialTable from 'material-table';
import {
	NavigateBefore,
	NavigateNext,
	LastPage,
	FirstPage,
} from '@material-ui/icons';
import OrderApi, { TraderOrder } from '../../apis/OrderApi';

const cellStyle = {
	borderRight: '1px solid grey',
	borderLeft: '1px solid grey',
};

const Finished = () => {
	const [finishedOrder, setFinishedOrder] = React.useState<TraderOrder[]>([]);

	React.useEffect(() => {
		OrderApi.getHistory().then((res) => {
			console.log('get history order', res);
			setFinishedOrder(res.data);
		});
	}, []);

	return (
		<React.Fragment>
			<MaterialTable
				title='已完成订单'
				columns={[
					{
						title: '订单编号',
						field: 'id',
						sorting: false,
						cellStyle: { ...cellStyle, borderLeft: '1px solid white' },
					},
					{
						title: '订单类型',
						field: 'orderType',
						sorting: false,
						cellStyle: cellStyle,
					},
					{
						title: '中介公司',
						field: 'brokerName',
						sorting: false,
						cellStyle: cellStyle,
					},
					{
						title: '交易员',
						field: 'traderName',
						sorting: false,
						cellStyle: cellStyle,
					},
					{
						title: '交易方式',
						field: 'side',
						sorting: false,
						cellStyle: cellStyle,
					},
					{
						title: '期货类型',
						field: 'futureName',
						sorting: false,
						cellStyle: cellStyle,
					},
					{
						title: '交易数量',
						field: 'number',
						sorting: false,
						cellStyle: cellStyle,
					},
					{
						title: '交易单价',
						field: 'unitPrice',
						sorting: false,
						cellStyle: cellStyle,
					},
					{
						title: '转化价格',
						field: 'stopPrice',
						sorting: false,
						cellStyle: cellStyle,
					},
					{
						title: '转化类型',
						field: 'targetType',
						sorting: false,
						cellStyle: cellStyle,
					},
					{
						title: '撤销订单号',
						field: 'orderId',
						sorting: false,
						cellStyle: { ...cellStyle, borderRight: '1px solid white' },
					},
				]}
				data={finishedOrder}
				options={{
					search: false,
					sorting: false,
					pageSize: 10,
					pageSizeOptions: [10],
					paginationType: 'normal',
					headerStyle: {
						backgroundColor: 'rgb(248,248,248)',
					},
					toolbar: false,
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

export default Finished;
