import axios from 'axios';

export enum OrderType {
	LIMIT = 1,
	STOP = 2,
	CANCEL = 3,
	MARKET = 4,
}

export enum StatusType {
	PENDING = 1,
	DONE = 2,
	CANCELPENDING = 3,
}

export enum SideType {
	BUY = 1,
	SELL = 2,
}

export interface TraderOrder {
	orderType: OrderType;
	id: number;
	traderName: string;
	traderCompany: string;
	brokerName: string;
	Status: StatusType;

	// Market Order 所拥有的
	side?: SideType; // 买卖操作
	futureName?: string; // 期货类型
	number?: number; // 数量
	unitPrice?: number; // 单价
	pendingNumber?: number; // 未交易的数量

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

export interface PendingOrderProps {
	orderId: number;
	number: number;
	futureName: string;
	orderType: OrderType;
}

const BaseApi = axios.create({
	baseURL: 'http://localhost:8080',
});

const OrderApi = {
	createOrder: (order: TraderOrder) => {
		return BaseApi.post('/order/create', order);
	},
};

export default OrderApi;
