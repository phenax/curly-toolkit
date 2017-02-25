
import React from 'react';

import colors from '../constants/colors';

export default class Content extends React.Component {

	static styles= {

		wrapper: {
			position: 'relative',
			padding: '1em'
		},

		container: {
			backgroundColor: '#fff',
			padding: '2em 1em',
			borderRadius: '3px',
			boxShadow: '0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
			margin: '1em auto',
		}
	};

	render() {
		return (
			<div style={Content.styles.wrapper}>
				
				<div style={Content.styles.container}>
					Content
				</div>
			</div>
		);
	}
}
