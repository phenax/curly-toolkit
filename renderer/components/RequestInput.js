
import React from 'react';

import DataFieldList from './DataFieldList';

import colors from '../constants/colors';

export default class RequestInput extends React.Component {

	static styles= {

		wrapper: {
			position: 'relative',
		},

		urlInputWrapper: {
			display: 'flex',
			flexDirection: 'row',
		},

		input: {
			fontSize: '.9em',
			padding: '.6em 1em',
			flex: 4,
			border: '1px solid #ddd',
		},

		submitBtn: {
			flex: 1,
			backgroundColor: colors.accent_blue,
			color: '#fff',
			fontFamily: 'Roboto Condensed',
			textTransform: 'uppercase',
			fontWeight: 'bold',
		},
	};

	constructor(props) {
		super(props);

		this.state= {
			requestData: []
		};
		
		this._onSubmitHandler= this._onSubmitHandler.bind(this);
		this._addRequestField= this._addRequestField.bind(this);
	}

	_onSubmitHandler(e) {
		e.preventDefault();

		const $wrapper= this.refs.formWrapper;

		const $keys= Array.from($wrapper.querySelectorAll('.js-data__key'));
		const $values= Array.from($wrapper.querySelectorAll('.js-data__value'));

		const requestData= {};

		$keys.forEach((key, i) => {

			const {value}= $values[i];

			if(!!key && !!value) {
				requestData[key.value]= value;
			}
		});

		console.log(requestData);
	}

	_updateState(newState) { this.setState(newState); }


	_addRequestField() {
		
		const requestData= Array.from(this.state.requestData);

		requestData.push({
			key: '',
			value: ''
		});

		this.setState({ requestData });
	}


	render() {

		return (

			<div style={RequestInput.styles.wrapper}>

				<div ref='formWrapper'>

					<div style={RequestInput.styles.urlInputWrapper}>

						<input
							type='text' name='url'
							style={RequestInput.styles.input}
							placeholder='Enter URL..'
						/>

						<button onClick={this._onSubmitHandler} style={RequestInput.styles.submitBtn}>Submit</button>
					</div>

					<DataFieldList requestData={this.state.requestData} updateState={this._updateState.bind(this)} />

					<button onClick={this._addRequestField}>Add field</button>

				</div>
			</div>
		);
	}
}
