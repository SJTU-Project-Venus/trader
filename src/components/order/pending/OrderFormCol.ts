import { SideType } from './../../../apis/OrderApi';
import { OrderTypeNameArray, TargetTypeArray } from './OrderInterfaces';
import {
	HookComponentsType,
	SelectDataFormat,
} from './../../utils/HookComponents';

export const BrokerNames = ['M', 'N'];
export const FutureNames = [
	'OIL-SEP22',
	'OIL-MAR01',
	'GOLD-JUN18',
	'GOLD-FEB22',
	'GOLD-SEP13',
];

export interface OrderColmuns {
	label: string;
	name: string;
	component?: HookComponentsType;
	type?: string;
	options?: SelectDataFormat[];
}

type EasyOptionsType = string | number;

const easyOptions = (vals: EasyOptionsType[]): SelectDataFormat[] =>
	vals.map((elem: EasyOptionsType) => ({
		label: `${elem}`,
		value: elem,
	}));

export const MarketOrderCols = (
	brokerName: string[],
	futureName: string[]
): OrderColmuns[] => [
	{
		component: HookComponentsType.SELECT,
		label: '中介公司',
		name: 'brokerName',
		options: easyOptions(brokerName),
	},
	{
		component: HookComponentsType.SELECT,
		label: '交易类型',
		name: 'side',
		options: [
			{
				label: 'Buy',
				value: SideType.BUY,
			},
			{
				label: 'Sell',
				value: SideType.SELL,
			},
		],
	},
	{
		component: HookComponentsType.SELECT,
		label: '期货类型',
		name: 'futureName',
		options: easyOptions(futureName),
	},
	{
		label: '交易数量',
		name: 'number',
		type: 'number',
	},
];

export const LimitOrderCols = (
	brokerName: string[],
	futureName: string[]
): OrderColmuns[] => [
	{
		component: HookComponentsType.SELECT,
		label: '中介公司',
		name: 'brokerName',
		options: easyOptions(brokerName),
	},
	{
		component: HookComponentsType.SELECT,
		label: '交易类型',
		name: 'side',
		options: [
			{
				label: 'Buy',
				value: SideType.BUY,
			},
			{
				label: 'Sell',
				value: SideType.SELL,
			},
		],
	},
	{
		component: HookComponentsType.SELECT,
		label: '期货类型',
		name: 'futureName',
		options: easyOptions(futureName),
	},
	{
		label: '交易数量',
		name: 'number',
		type: 'number',
	},
	{
		label: '目标价格',
		name: 'unitPrice',
		type: 'number',
	},
];

export const StopOrderCols = (
	brokerName: string[],
	futureName: string[]
): OrderColmuns[] => [
	{
		component: HookComponentsType.SELECT,
		label: '中介公司',
		name: 'brokerName',
		options: easyOptions(brokerName),
	},
	{
		component: HookComponentsType.SELECT,
		label: '交易类型',
		name: 'side',
		options: [
			{
				label: 'Buy',
				value: SideType.BUY,
			},
			{
				label: 'Sell',
				value: SideType.SELL,
			},
		],
	},
	{
		component: HookComponentsType.SELECT,
		label: '期货类型',
		name: 'futureName',
		options: easyOptions(futureName),
	},
	{
		label: '交易数量',
		name: 'number',
		type: 'number',
	},
	{
		label: '目标价格',
		name: 'unitPrice',
		type: 'number',
	},
	{
		label: '止损价格',
		name: 'stopPrice',
		type: 'number',
	},
	{
		label: '转化类型',
		name: 'targetType',
		component: HookComponentsType.SELECT,
		options: TargetTypeArray.map((elem) => {
			return {
				label: elem,
				value: elem,
			};
		}),
	},
];

export const CancelOrderCols = (orderId: number[]): OrderColmuns[] => [
	{
		component: HookComponentsType.SELECT,
		label: '中介公司',
		name: 'brokerName',
		options: easyOptions(['M', 'T']),
	},
	{
		component: HookComponentsType.SELECT,
		label: '订单编号',
		name: 'orderId',
		options: easyOptions(orderId),
	},
];
