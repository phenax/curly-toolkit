
import React from 'react';

import RequestInput from './RequestInput';

import colors from '../constants/colors';

export default class Content extends React.Component {

	static styles= {

		wrapper: {
			position: 'relative',
			padding: '1em'
		},

		container: {
			padding: '1em',
			margin: '0 auto',
		}
	};

	render() {
		return (
			<div style={Content.styles.wrapper}>
				
				<div style={Content.styles.container}>

					<RequestInput />

				</div>
			</div>
		);
	}
}
