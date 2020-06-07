import React from 'react';
import MaterialTable from 'material-table';
import {
	NavigateBefore,
	NavigateNext,
	LastPage,
	FirstPage,
} from '@material-ui/icons';

const cellStyle = {
	borderRight: '1px solid grey',
	borderLeft: '1px solid grey',
};

interface Data {
	orderId: number;
	type: string;
	broker: string;
	product: string;
	period: string;
	price: number;
	quantity: string;
}

const createData = (props: Data) => ({
	orderId: props.orderId,
	type: props.type,
	broker: props.broker,
	product: props.product,
	period: props.period,
	price: props.price,
	quantity: props.quantity,
});

const data = [
	createData({
		orderId: 0,
		type: 'Limit',
		broker: 'M',
		product: 'Gold Swaps',
		period: 'SEP20',
		price: 123,
		quantity: '50',
	}),
	createData({
		orderId: 0,
		type: 'Limit',
		broker: 'M',
		product: 'Gold Swaps',
		period: 'SEP20',
		price: 123,
		quantity: '50',
	}),
	createData({
		orderId: 0,
		type: 'Limit',
		broker: 'M',
		product: 'Gold Swaps',
		period: 'SEP20',
		price: 123,
		quantity: '50',
	}),
	createData({
		orderId: 0,
		type: 'Limit',
		broker: 'M',
		product: 'Gold Swaps',
		period: 'SEP20',
		price: 123,
		quantity: '50',
	}),
	createData({
		orderId: 0,
		type: 'Limit',
		broker: 'M',
		product: 'Gold Swaps',
		period: 'SEP20',
		price: 123,
		quantity: '50',
	}),
	createData({
		orderId: 0,
		type: 'Limit',
		broker: 'M',
		product: 'Gold Swaps',
		period: 'SEP20',
		price: 123,
		quantity: '50',
	}),
	createData({
		orderId: 0,
		type: 'Limit',
		broker: 'M',
		product: 'Gold Swaps',
		period: 'SEP20',
		price: 123,
		quantity: '50',
	}),
	createData({
		orderId: 0,
		type: 'Limit',
		broker: 'M',
		product: 'Gold Swaps',
		period: 'SEP20',
		price: 123,
		quantity: '50',
	}),
	createData({
		orderId: 0,
		type: 'Limit',
		broker: 'M',
		product: 'Gold Swaps',
		period: 'SEP20',
		price: 123,
		quantity: '50',
	}),
	createData({
		orderId: 0,
		type: 'Limit',
		broker: 'M',
		product: 'Gold Swaps',
		period: 'SEP20',
		price: 123,
		quantity: '50',
	}),
	createData({
		orderId: 0,
		type: 'Limit',
		broker: 'M',
		product: 'Gold Swaps',
		period: 'SEP20',
		price: 123,
		quantity: '50',
	}),
];

const Finished = () => {
	return (
		<React.Fragment>
			<MaterialTable
				title='已完成订单'
				columns={[
					{
						title: '订单编号',
						field: 'orderId',
						sorting: false,
						cellStyle: { ...cellStyle, borderLeft: '1px solid white' },
					},
					{
						title: '订单类型',
						field: 'type',
						sorting: false,
						cellStyle: cellStyle,
					},
					{
						title: 'Broker',
						field: 'broker',
						sorting: false,
						cellStyle: cellStyle,
					},
					{
						title: '产品',
						field: 'product',
						sorting: false,
						cellStyle: cellStyle,
					},
					{
						title: '时间',
						field: 'period',
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
						title: '数量',
						field: 'quantity',
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
					toolbar: false
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
