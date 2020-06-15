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
	Snackbar,
} from '@material-ui/core';
import { useForm } from 'react-hook-form';
import {
	initialOrder,
	OrderTypeArray,
	OrderFormProps,
	processOrderFormData,
} from './pending/OrderInterfaces';
import HookComponents, { HookComponentsType } from '../utils/HookComponents';
import OrderApi, {
	OrderType,
	PendingOrderProps,
	TraderOrder,
} from '../../apis/OrderApi';
import {
	MarketOrderCols,
	BrokerNames,
	FutureNames,
	LimitOrderCols,
	StopOrderCols,
	CancelOrderCols,
} from './pending/OrderFormCol';
import Alert from '@material-ui/lab/Alert';
import StompService from '../../apis/Websocket';
import store from '../../redux/store/Store';

const cellStyle = {
	borderRight: '1px solid grey',
	borderLeft: '1px solid grey',
};

const columns: Column<PendingOrderProps>[] = [
	{
		title: '订单编号',
		field: 'orderId',
		sorting: false,
		cellStyle: { ...cellStyle, borderLeft: '1px solid white' },
		editable: 'never',
	},
	{
		title: '订单类型',
		field: 'orderType',
		sorting: false,
		cellStyle: cellStyle,
		editable: 'never',
	},
	{
		title: '中介公司',
		field: 'brokerName',
		sorting: false,
		cellStyle: cellStyle,
		editable: 'never',
	},
	{
		title: '产品',
		field: 'futureName',
		sorting: false,
		cellStyle: cellStyle,
		editable: 'never',
	},
	{
		title: '数量',
		field: 'number',
		sorting: false,
		cellStyle: { ...cellStyle, borderRight: '1px solid white' },
		editable: 'never',
	},
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
	const [success, setSuccess] = React.useState(false);
	const [pendingOrders, setPendingOrders] = React.useState<PendingOrderProps[]>(
		[]
	);
	const { traderName } = store.getState().base.user;

	React.useEffect(() => {
		const disconnect = StompService({
			subscribeurl: '/user/topic/pendingOrder',
			callback: (msg: string) => {
				console.log('pending order get msg', msg);
				const data = JSON.parse(msg) as PendingOrderProps[];
				console.log('pending order parsed', data);
				setPendingOrders(data);
			},
			sendMsg: JSON.stringify({ name: traderName }),
			sendurl: '/app/pendingOrder',
		});
		return disconnect;
	}, [traderName]);

	const { control, register, handleSubmit, watch } = useForm<OrderFormProps>({
		mode: 'onSubmit',
		defaultValues: Object.assign({}, initialOrder),
	});
	const values = watch();

	const onSubmit = (data: OrderFormProps) => {
		console.log('order form data', data);
		const order: TraderOrder = processOrderFormData(data);
		console.log('processed order', order);
		OrderApi.createOrder(order).then((res) => {
			console.log('create order res', res);
			setOpen(false);
			setSuccess(true);
		});
	};

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<React.Fragment>
			<Snackbar
				open={success}
				autoHideDuration={6000}
				onClose={() => {
					setSuccess(false);
				}}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
			>
				<Alert
					onClose={() => {
						setSuccess(false);
					}}
					severity='success'
				>
					发起成功
				</Alert>
			</Snackbar>
			<MaterialTable
				title='未完成订单'
				columns={columns}
				data={pendingOrders}
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
								{values.orderType === OrderType.MARKET && (
									<React.Fragment>
										{MarketOrderCols(BrokerNames, FutureNames).map(
											(cols, index) => (
												<HookComponents
													component={cols.component}
													reg={register}
													label={cols.label}
													name={cols.name}
													control={control}
													options={cols.options}
													type={cols.type}
													key={index.toString()}
												/>
											)
										)}
									</React.Fragment>
								)}
								{values.orderType === OrderType.LIMIT && (
									<React.Fragment>
										{LimitOrderCols(BrokerNames, FutureNames).map(
											(cols, index) => (
												<HookComponents
													component={cols.component}
													reg={register}
													label={cols.label}
													name={cols.name}
													control={control}
													options={cols.options}
													type={cols.type}
													key={index.toString()}
												/>
											)
										)}
									</React.Fragment>
								)}
								{values.orderType === OrderType.STOP && (
									<React.Fragment>
										{StopOrderCols(BrokerNames, FutureNames).map(
											(cols, index) => (
												<HookComponents
													component={cols.component}
													reg={register}
													label={cols.label}
													name={cols.name}
													control={control}
													options={cols.options}
													type={cols.type}
													key={index.toString()}
												/>
											)
										)}
									</React.Fragment>
								)}
								{values.orderType === OrderType.CANCEL && (
									<React.Fragment>
										{CancelOrderCols(
											pendingOrders.map((elem) => {
												return elem.orderId;
											})
										).map((cols, index) => (
											<HookComponents
												component={cols.component}
												reg={register}
												label={cols.label}
												name={cols.name}
												control={control}
												options={cols.options}
												type={cols.type}
												key={index.toString()}
											/>
										))}
									</React.Fragment>
								)}
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
