
import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

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

		requestWrapper: {
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


	// Form submit handler(Submit button click)
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

	updateState(newState) { this.setState(newState); }

	componentDidMount() {

		this.onTabSelect(0);
	}

	onTabSelect(nextIndex, prevIndex) {

		const $tabs= this.refs.formWrapper.querySelectorAll('.ReactTabs__Tab');
		const $tabList= this.refs.formWrapper.querySelector('.ReactTabs__TabList');
		const $tabBorder= this.refs.jsTabBorder;

		const $nextTab= $tabs[nextIndex];

		if($nextTab) {

			const bounds= $nextTab.getBoundingClientRect();

			// Wait for the next frame
			requestAnimationFrame(() => {
				
				const wrapperBounds= $tabList.getBoundingClientRect();

				// Skip another frame
				requestAnimationFrame(() => {

					$tabBorder.style.transform= `
						translateX(${bounds.left - wrapperBounds.left}px)
						scaleX(${bounds.width})
					`;
				});
			});
		}
	}


	render() {

		const requestMethodOptions=
			this.requestMethods.map((method, i) => (
				<option value={i} key={i}>{method}</option>
			));

		return (

			<div style={RequestInput.styles.wrapper}>

				<div ref='formWrapper'>

					<div style={RequestInput.styles.urlInputWrapper}>

						<select style={RequestInput.styles.select}>
							{requestMethodOptions}
						</select>

						<input
							type='text' name='url'
							style={RequestInput.styles.input}
							placeholder='Enter URL..'
						/>

						<button onClick={this._onSubmitHandler} style={RequestInput.styles.submitBtn}>Submit</button>
					</div>


					<div style={RequestInput.styles.requestWrapper}>
						<Tabs onSelect={this.onTabSelect}>
							<TabList>
								<Tab>Body</Tab>
								<Tab>Headers</Tab>
								<Tab>Authorization</Tab>
								<div ref='jsTabBorder' className='ReactTabs-border' />
							</TabList>
							
							<TabPanel>
								<DataFieldList
									type='requestData'
									list={this.state.requestData}
									updateState={this.updateState.bind(this)}
								/>
							</TabPanel>
							<TabPanel>
								<DataFieldList
									type='headers'
									list={this.state.headers}
									updateState={this.updateState.bind(this)}
								/>
							</TabPanel>
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
