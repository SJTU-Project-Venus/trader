import React from 'react';
import MaterialTable, { Column } from 'material-table';
import {
	NavigateBefore,
	NavigateNext,
	LastPage,
	FirstPage,
	Add,
} from '@material-ui/icons';
import {
	Button,
	Box,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Grid,
} from '@material-ui/core';
import { useForm } from 'react-hook-form';
import {
	TraderOrder,
	initialOrder,
	OrderTypeArray,
	OrderType,
} from './OrderInterfaces';
import HookComponents, { HookComponentsType } from '../utils/HookComponents';

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

const columns: Column<Data>[] = [
	{
		title: '订单编号',
		field: 'orderId',
		sorting: false,
		cellStyle: { ...cellStyle, borderLeft: '1px solid white' },
		editable: 'never',
	},
	{
		title: '订单类型',
		field: 'type',
		sorting: false,
		cellStyle: cellStyle,
		editable: 'never',
	},
	{
		title: 'Broker',
		field: 'broker',
		sorting: false,
		cellStyle: cellStyle,
		editable: 'never',
	},
	{
		title: '产品',
		field: 'product',
		sorting: false,
		cellStyle: cellStyle,
		editable: 'never',
	},
	{
		title: '时间',
		field: 'period',
		sorting: false,
		cellStyle: cellStyle,
		editable: 'never',
	},
	{
		title: '价格',
		field: 'price',
		sorting: false,
		cellStyle: cellStyle,
		editable: 'never',
	},
	{
		title: '数量',
		field: 'quantity',
		sorting: false,
		cellStyle: { ...cellStyle, borderRight: '1px solid white' },
		editable: 'never',
	},
];

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

interface MyToolBarProps {
	click: () => void;
}

const MyToolBar = (props: MyToolBarProps) => {
	const { click } = props;

	return (
		<React.Fragment>
			<Box style={{ textAlign: 'left' }}>
				<Button
					variant={'contained'}
					color={'primary'}
					style={{ margin: '10px' }}
					onClick={click}
					endIcon={<Add />}
				>
					新建订单
				</Button>
			</Box>
		</React.Fragment>
	);
};

const Pending = () => {
	const [open, setOpen] = React.useState(false);
	const { control, register, handleSubmit, watch } = useForm<TraderOrder>({
		mode: 'onSubmit',
		defaultValues: Object.assign({}, initialOrder),
	});

	const values = watch();

	const onSubmit = (data: TraderOrder) => console.log(data);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<React.Fragment>
			<MaterialTable
				title='未完成订单'
				columns={columns}
				data={data}
				components={{
					Toolbar: () => <MyToolBar click={handleClickOpen} />,
				}}
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
					Add: React.forwardRef((props, ref) => {
						return <Add {...props} ref={ref} />;
					}),
				}}
			/>
			<React.Fragment>
				<Dialog
					fullWidth={true}
					open={open}
					onClose={handleClose}
					aria-labelledby='form-dialog-title'
				>
					<DialogTitle id='form-dialog-title'>新建订单</DialogTitle>
					<DialogContent>
						<form onSubmit={handleSubmit(onSubmit)}>
							<Grid container>
								<HookComponents
									component={HookComponentsType.SELECT}
									reg={register}
									label={'订单类型'}
									name='orderType'
									control={control}
									options={OrderTypeArray.map((elem) => {
										return {
											label: elem,
											value: elem,
										};
									})}
								/>
								{[OrderType.Martket, OrderType.Limit, OrderType.Stop].indexOf(
									values.orderType
								) >= 0 && (
									<React.Fragment>
										<HookComponents
											component={HookComponentsType.SELECT}
											reg={register}
											label={'交易类型'}
											name='order.meta.type'
											control={control}
											options={[
												{
													label: 'Buy',
													value: 'buy',
												},
												{
													label: 'Sell',
													value: 'sell',
												},
											]}
										/>
										<HookComponents
											reg={register}
											label={'交易货物'}
											name='order.meta.product'
										/>
										<HookComponents
											reg={register}
											label={'交易数量'}
											name='order.quantity'
										/>
										{values.orderType !== OrderType.Martket && (
											<HookComponents
												reg={register}
												label={'商品价格'}
												name='order.price'
											/>
										)}
									</React.Fragment>
								)}
								{[OrderType.Cancel].indexOf(values.orderType) >= 0 && (
									<React.Fragment>
										<HookComponents
											reg={register}
											label={'订单编号'}
											name='order.orderId'
										/>
									</React.Fragment>
								)}
								<HookComponents
									component={HookComponentsType.SELECT}
									reg={register}
									label={'Borker'}
									name='order.broker'
									control={control}
									options={[
										{
											label: 'M',
											value: 'M',
										},
										{
											label: 'T',
											value: 'T',
										},
									]}
								/>
							</Grid>
						</form>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose} color='primary'>
							取消
						</Button>
						<Button
							onClick={() => {
								onSubmit(values);
							}}
							color='primary'
						>
							确认
						</Button>
					</DialogActions>
				</Dialog>
			</React.Fragment>
		</React.Fragment>
	);
};

export default Pending;
