
import React from 'react';

import colors from '../constants/colors';


export default class AuthInput extends React.Component {

	static styles= {

		wrapper: {
			maxWidth: '400px',
			margin: '1em auto'
		},

		textField: {
			border: '1px solid #ccc',
			padding: '.5em 1em',
			display: 'block',
			width: '100%',
			marginTop: '.2em',
			color: '#555',
		},

		option: {
			color: '#555',
		},

		action: {
			textAlign: 'right',
			marginTop: '.5em',
		},

		action__button: {
			backgroundColor: colors.accent_blue,
			color: '#fff',
			fontFamily: 'Roboto Condensed',
			textTransform: 'uppercase',
			fontWeight: 'bold',
			padding: '.8em 1.5em',
		}

	};



	/**
	 * List of all auth types
	 * 
	 * @type {Array<Object>}
	 */
	authTypes= [ {
		name: 'Basic',
		action: (uname, pass) => {

			const authValue= new Buffer(`${uname}:${pass}`).toString('base64');

			// SET HEADER Authorization: Basic ${authValue}
			this.props.headers.push({
				key: 'Authorization',
				value: `Basic ${authValue}`,
			});

			this.props.updateState({ headers: this.props.headers });
		}
	}, {
		name: 'Another one',
		action: () => {
			return;
		}
	} ];



	/**
	 * Form submit handler
	 * 
	 * @param  {Event} e
	 */
	onFormSubmit(e) {

		e.preventDefault();

		const data= new FormData(e.currentTarget);

		const username= data.get('username');
		const password= data.get('password');

		const authType= this.authTypes[parseInt(data.get('type'))];

		authType.action(username, password);
	}


	render() {

		return (
			<div>

				<div style={AuthInput.styles.wrapper}>

					<form onSubmit={this.onFormSubmit.bind(this)}>

						<select style={AuthInput.styles.textField} name='type'>
							{this.authTypes.map((type, i) => 
								<option style={AuthInput.styles.option} value={i}>{type.name}</option>
							)}
						</select>

						<input
							placeholder='Username'
							style={AuthInput.styles.textField}
							type='text' name='username'
						/>
						<input
							placeholder='*********'
							style={AuthInput.styles.textField}
							type='password' name='password'
						/>

						<div style={AuthInput.styles.action}>
							<button style={AuthInput.styles.action__button}>Update</button>
						</div>

					</form>

				</div>

			</div>
		);
	}
}

