
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

		this.state= {
			requestData: []
		};
		
		this._onSubmitHandler= this._onSubmitHandler.bind(this);
		this._addRequestField= this._addRequestField.bind(this);
	}

	_onSubmitHandler(e) {
		e.preventDefault();
		const $form= this.refs.formWrapper;

		const data= new FormData($form);
		console.log(data.get('url'));

		const $keys= Array.from($form.querySelectorAll('.js-data__key'));
		const $values= Array.from($form.querySelectorAll('.js-data__value'));

		const requestData= {};

		$keys.forEach((key, i) => {

			const value= $values[i];
			
			if(!!key && !!value) {
				requestData[key]= value;
			}
		});

		console.log(requestData);
	}

	_addRequestField() {
		this.state.requestData.push({
			key: '',
			value: ''
		});

		this.setState({ requestData: this.state.requestData });
	}

	render() {

		const requestFields= this.state.requestData.map((data, i) => (
			<li key={i}>
				<input
					type='text'
					className='js-data__key'
					placeholder='Key'
					value={data.key}
				/>
				<input
					type='text'
					className='js-data__value'
					placeholder='Value'
					value={data.value}
				/>
			</li>
		));

		return (
			<div style={RequestInput.styles.wrapper}>
				<div ref='formWrapper'>

					<input
						type='text' name='url'
						style={RequestInput.styles.input}
						placeholder='Enter URL..'
					/>

					<ul>{ requestFields }</ul>
					<button onClick={this._addRequestField}>Add field</button>

					<button onClick={this._onSubmitHandler}>Submit</button>
				</div>
			</div>
		);
	}
}
