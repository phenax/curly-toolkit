
import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import DataFieldList from './DataFieldList';

import Fetcher from '../utils/Fetcher';
import store from '../utils/Storage';

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
			padding: '.7em 1em',
			flex: 4,
			border: '1px solid #ddd',
			color: '#555',
		},

		submitBtn: {
			width: '100px',
			backgroundColor: colors.accent_blue,
			color: '#fff',
			fontFamily: 'Roboto Condensed',
			textTransform: 'uppercase',
			fontWeight: 'bold',
		},

		select: {
			flex: 1,
			fontFamily: 'Roboto Condensed',
			textTransform: 'uppercase',
			fontWeight: 'bold',
			padding: '0 .7em',
			color: '#555',
			backgroundColor: 'rgba(0,0,0,.05)',
		},

		uiCard: {
			margin: '1em 0',
			padding: '1em',
			backgroundColor: '#fff',
			borderRadius: '3px',
			boxShadow: '0 2px 3px 1px rgba(0,0,0,.05)',
		},
	};


	/**
	 * List of available request methods
	 * @type {Array}
	 */
	requestMethods= [
		'GET', 'POST', 'HEAD', 'PUT', 'DELETE'
	];


	/**
	 * Component state object
	 * @type {Object}
	 */
	state= {
		requestData: [
			{ key: '', value: '' }
		],
		headers: [
			{ key: '', value: '' },
		]
	};


	constructor(props) {
		super(props);

		Tabs.setUseDefaultStyles(false);
		
		this._onSubmitHandler= this._onSubmitHandler.bind(this);
		this.onTabSelect= this.onTabSelect.bind(this);
	}

	componentDidMount() {
		this.onTabSelect(0);

		const headers= store.get('headers') || {};
		const requestBody= store.get('requestBody') || {};
		const method= store.get('method') || 0;
		const url= store.get('url') || '';

		this.refs.urlField.value= url;
		this.refs.methodField.value= method;

		const newHeaders= [];
		const newBody= [];

		for(let key in headers)
			newHeaders.push({ key, value: headers[key] });

		for(let key in requestBody)
			newBody.push({ key, value: requestBody[key] });

		if(newHeaders.length)
			this.setState({ headers: newHeaders });

		if(newBody.length)
			this.setState({ requestData: newBody });
	}

	// Form submit handler(Submit button click)
	_onSubmitHandler(e) {
		e.preventDefault();

		const $wrapper= this.refs.formWrapper;

		const request= {
			url:     this.refs.urlField.value,
			method:  this.requestMethods[this.refs.methodField.value],
			body:    Fetcher.hashMapify(this.state.requestData),
			headers: Fetcher.hashMapify(this.state.headers),
		};

		store.set('url', request.url);
		store.set('method', this.refs.methodField.value);
		store.set('headers', request.headers);
		store.set('requestBody', request.body);

		this.props.onSubmit(request);
	}

	updateState(newState) { this.setState(newState); }


	onTabSelect(nextIndex, prevIndex) {
		this.props.onTabSelect(nextIndex, prevIndex, this);
	}


	render() {

		return (

			<div style={RequestInput.styles.wrapper}>

				<div ref='formWrapper'>

					<div style={RequestInput.styles.urlInputWrapper}>

						<select style={RequestInput.styles.select} ref='methodField'>
							{this.requestMethods.map((method, i) => (
								<option value={i} key={i}>{method}</option>
							))}
						</select>

						<input
							type='text' ref='urlField'
							style={RequestInput.styles.input}
							placeholder='Enter URL..'
						/>

						<button
							onClick={this._onSubmitHandler}
							style={RequestInput.styles.submitBtn}>
							Submit
						</button>
					</div>


					{ /* Request config card */ }
					<div style={RequestInput.styles.uiCard}>

						<Tabs onSelect={this.onTabSelect}>
							<TabList>
								<Tab>Body</Tab>
								<Tab>Headers</Tab>
								<Tab>Authorization</Tab>
								<div ref='jsTabBorder' className='ReactTabs-border' />
							</TabList>


							{ /* Request data fields */ }
							<TabPanel>
								<DataFieldList
									type='requestData'
									list={this.state.requestData}
									updateState={this.updateState.bind(this)}
								/>
							</TabPanel>
							{ /* Header fields */ }
							<TabPanel>
								<DataFieldList
									type='headers'
									list={this.state.headers}
									updateState={this.updateState.bind(this)}
								/>
							</TabPanel>
							{ /* Authorization */ }
							<TabPanel>
								Something
							</TabPanel>
						</Tabs>
					</div>

				</div>
			</div>
		);
	}
}
