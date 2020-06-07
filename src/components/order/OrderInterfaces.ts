export enum OrderType {
	Martket = 'Market Order',
	Limit = 'Limit Order',
	Stop = 'Stop Order',
	Cancel = 'Cancel Order',
}

export interface OrderMetaProps {
	type: 'buy' | 'sell';
	product: string;
	time: string;
}

export interface MarketOrder {
	meta: OrderMetaProps;
	broker: string;
	quantity: number;
}

export interface LimitOrder {
	meta: OrderMetaProps;
	broker: string;
	price: number;
	quantity: number;
}

export interface StopOrder {
	meta: OrderMetaProps;
	broker: string;
	price: number;
	quantity: number;
}

export interface CancelOrder {
	orderId: number;
	broker: string;
}

export interface TraderOrder {
	orderType: OrderType;
	order: LimitOrder | MarketOrder | StopOrder | CancelOrder;
}

export const initialOrder: TraderOrder = {
	orderType: OrderType.Martket,
	order: {
		meta: {
			type: 'buy',
			product: 'GOLD',
			time: 'SEP20',
		},
		broker: 'M',
		price: 100,
		quantity: 200,
	},
};

export const OrderTypeArray = [
	OrderType.Martket,
	OrderType.Limit,
	OrderType.Stop,
	OrderType.Cancel,
];
