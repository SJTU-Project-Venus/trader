import {
	SideType,
	OrderType,
	TraderOrder,
	StatusType,
} from '../../../apis/OrderApi';
import store from '../../../redux/store/Store';

export interface MarketOrderFormProps {
	orderType: OrderType;
	brokerName: string;
	side: SideType; // 买卖操作
	futureName: string; // 期货类型
	number: number; // 数量
	unitPrice: number; // 单价
}

export interface LimitOrderFormProps {
	orderType: OrderType;
	brokerName: string;
	side: SideType; // 买卖操作
	futureName: string; // 期货类型
	number: number; // 数量
	unitPrice: number; // 单价
}

export interface StopOrderFormProps {
	orderType: OrderType;
	brokerName: string;
	side: SideType; // 买卖操作
	futureName: string; // 期货类型
	number: number; // 数量
	unitPrice: number; // 单价
	stopPrice: number; // price 达到这个值的时候会转化
	targetType: OrderType; // 转化的类型
}

export interface CancelOrderFormProps {
	orderType: OrderType;
	brokerName: string;
	orderId: number;
}

export interface OrderFormProps {
	orderType: OrderType;
	brokerName: string;

	// Market Order 所拥有的
	side?: SideType; // 买卖操作
	futureName?: string; // 期货类型
	number?: number; // 数量
	unitPrice?: number; // 单价

	// Limit Order
	// 买卖操作采用 Market Order 的那个side
	// 期货类型采用Market Order 的那个 futureName
	// 数量采用 Market Order 的那个 number
	// 单价采用Market depth 的那个unitPrice
	// 未交易的数量采用的是Market Order 的那个 pendingNumber;

	// Stop Order
	// 买卖操作采用 Market Order 的那个side
	// 期货类型采用Market Order 的那个 futureName
	// 数量采用 Market Order 的那个 number
	// 单价采用Market depth 的那个unitPrice
	// 未交易的数量采用的是Market Order 的那个 pendingNumber;
	stopPrice?: number; // price 达到这个值的时候会转化
	targetType?: OrderType; // 转化的类型

	// Cancel Order
	orderId?: number; // 撤销订单的Id号。
}

export const initialOrder: OrderFormProps = {
	orderType: OrderType.MARKET,
	brokerName: '',
};

export const OrderTypeArray = [
	OrderType.LIMIT,
	OrderType.STOP,
	OrderType.CANCEL,
	OrderType.MARKET,
];

export const OrderTypeNameArray = ['Limit', 'Stop', 'Cancel', 'Market'];
export const TargetTypeArray = [OrderType.MARKET, OrderType.LIMIT];

export const processOrderFormData = (order: OrderFormProps): TraderOrder => {
	let orderProcessed: TraderOrder;
	const { traderCompany, traderName } = store.getState().base.user;
	switch (order.orderType) {
		case OrderType.MARKET: {
			const tmpOrder = order as MarketOrderFormProps;
			orderProcessed = {
				...tmpOrder,
				id: -1,
				traderCompany: traderCompany,
				traderName: traderName,
				Status: StatusType.PENDING,
				number: tmpOrder.number,
				unitPrice: tmpOrder.unitPrice,
			};
			break;
		}
		case OrderType.LIMIT: {
			const tmpOrder = order as LimitOrderFormProps;
			orderProcessed = {
				...tmpOrder,
				id: -1,
				traderCompany: traderCompany,
				traderName: traderName,
				Status: StatusType.PENDING,
				number: tmpOrder.number,
				unitPrice: tmpOrder.unitPrice,
			};

			break;
		}
		case OrderType.STOP: {
			const tmpOrder = order as StopOrderFormProps;
			orderProcessed = {
				...tmpOrder,
				id: -1,
				traderCompany: traderCompany,
				traderName: traderName,
				Status: StatusType.PENDING,
				number: tmpOrder.number,
				unitPrice: tmpOrder.unitPrice,
			};

			break;
		}
		case OrderType.CANCEL: {
			const tmpOrder = order as CancelOrderFormProps;
			orderProcessed = {
				...tmpOrder,
				id: -1,
				traderCompany: traderCompany,
				traderName: traderName,
				Status: StatusType.CANCELPENDING,
			};

			break;
		}
	}
	return orderProcessed;
};
