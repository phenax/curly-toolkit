
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

			const authIndex=
				this.props.headers.findIndex(
					header => header.key.toLowerCase() === 'authorization'
				);

			if(authIndex !== -1) {
				this.props.headers.splice(authIndex, 1);
			}

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


	constructor(props) {
		super(props);
		
		this.inputChange= this.inputChange.bind(this);
	}

	// Get the input field values
	get authData() { return new FormData(this.refs.authForm); }


	/**
	 * Input change handler
	 * 
	 * @param  {String} key  The field that changed
	 */
	inputChange(key) {

		const auth= Object.assign({}, this.props.initialAuth);

		auth[key]= this.authData.get(key);

		this.props.updateState({ auth });
	}


	/**
	 * Form submit handler
	 * 
	 * @param  {Event} e
	 */
	onFormSubmit(e) {

		e.preventDefault();

		const data= this.authData;

		const username= data.get('user');
		const password= data.get('pass');

		const authType= this.authTypes[parseInt(data.get('type'))];

		authType.action(username, password);
	}


	render() {

		return (
			<div>

				<div style={AuthInput.styles.wrapper}>

					<form onSubmit={this.onFormSubmit.bind(this)} ref={'authForm'}>

						<select
							style={AuthInput.styles.textField}
							name='type'
							onChange={_ => this.inputChange('type')}
							value={this.props.initialAuth.type}>
							{this.authTypes.map((type, i) => 
								<option
									style={AuthInput.styles.option}
									key={i} value={i}>
									{type.name}
								</option>
							)}
						</select>

						<input
							placeholder='Username'
							style={AuthInput.styles.textField}
							type='text' name='user'
							value={this.props.initialAuth.user}
							onChange={_ => this.inputChange('user')}
						/>
						<input
							placeholder='*********'
							style={AuthInput.styles.textField}
							type='password' name='pass'
							value={this.props.initialAuth.pass}
							onChange={_ => this.inputChange('pass')}
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

