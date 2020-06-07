import React from 'react';
import background from '../img/background.jpg';

const HomePage = () => {
	return (
		<React.Fragment>
			<div
				style={{
					minHeight: 577,
					backgroundImage: `url(${background})`,
					backgroundSize: 'cover ',
				}}
			></div>
		</React.Fragment>
	);
};

export default HomePage;
