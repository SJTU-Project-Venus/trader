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
	buyLevel: number | undefined;
	buyVol: number | undefined;
	sellLevel: number | undefined;
	sellVol: number | undefined;
	price: number;
}

const data: Data[] = [
	{
		buyLevel: undefined,
		buyVol: undefined,
		sellLevel: 5,
		sellVol: 100,
		price: 1044,
	},
	{
		buyLevel: undefined,
		buyVol: undefined,
		sellLevel: 4,
		sellVol: 100,
		price: 1043,
	},
	{
		buyLevel: undefined,
		buyVol: undefined,
		sellLevel: 3,
		sellVol: 100,
		price: 1042,
	},
	{
		buyLevel: undefined,
		buyVol: undefined,
		sellLevel: 2,
		sellVol: 100,
		price: 1041,
	},
	{
		buyLevel: undefined,
		buyVol: undefined,
		sellLevel: 1,
		sellVol: 100,
		price: 1041,
	},
	{
		buyLevel: 1,
		buyVol: 100,
		sellLevel: undefined,
		sellVol: undefined,
		price: 1035,
	},
	{
		buyLevel: 2,
		buyVol: 100,
		sellLevel: undefined,
		sellVol: undefined,
		price: 1034,
	},
	{
		buyLevel: 3,
		buyVol: 100,
		sellLevel: undefined,
		sellVol: undefined,
		price: 1033,
	},
	{
		buyLevel: 4,
		buyVol: 100,
		sellLevel: undefined,
		sellVol: undefined,
		price: 1032,
	},
	{
		buyLevel: 5,
		buyVol: 100,
		sellLevel: undefined,
		sellVol: undefined,
		price: 1031,
	},
];

const MarketDepth = () => {
	return (
		<React.Fragment>
			<MaterialTable
				title='Market Depth'
				columns={[
					{
						title: '买方序列',
						field: 'buyLevel',
						sorting: false,
						cellStyle: { ...cellStyle, borderLeft: '1px solid white' },
					},
					{
						title: '买方数量',
						field: 'buyVol',
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
						title: '卖方数量',
						field: 'sellVol',
						sorting: false,
						cellStyle: cellStyle,
					},
					{
						title: '卖方序列',
						field: 'sellLevel',
						sorting: false,
						cellStyle: cellStyle,
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

export default MarketDepth;
