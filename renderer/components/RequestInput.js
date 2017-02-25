
import React from 'react';

import colors from '../constants/colors';

export default class RequestInput extends React.Component {

	static styles= {

		wrapper: {
			position: 'relative',
		},

		input: {
			fontSize: '1.1em',
			padding: '.8em 1em',
		},
	};

	constructor(props) {
		super(props);
		
		this._onSubmitHandler= this._onSubmitHandler.bind(this);
	}

	_onSubmitHandler() {

	}

	render() {
		return (
			<div style={RequestInput.styles.wrapper}>
				<form onSubmit={this._onSubmitHandler}>

					<input
						type='text'
						style={RequestInput.styles.input}
						placeholder='Enter holy text'
					/>
				</form>
			</div>
		);
	}
}
