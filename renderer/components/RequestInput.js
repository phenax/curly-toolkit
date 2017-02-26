
import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import DataFieldList from './DataFieldList';

import colors from '../constants/colors';

Tabs.setUseDefaultStyles(false);

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

	requestMethods= [
		'GET', 'POST', 'HEAD', 'PUT', 'DELETE'
	];

	state= {
		requestData: [
			{ key: '', value: '' }
		]
	};


	constructor(props) {
		super(props);
		
		this._onSubmitHandler= this._onSubmitHandler.bind(this);
		this._onTabSelect= this._onTabSelect.bind(this);
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


	componentDidMount() {

		this._onTabSelect(0);
	}

	_onTabSelect(nextIndex, prevIndex) {

		const $tabs= this.refs.formWrapper.querySelectorAll('.ReactTabs__Tab');
		const $tabList= this.refs.formWrapper.querySelector('.ReactTabs__TabList');
		const $tabBorder= this.refs.jsTabBorder;

		const $nextTab= $tabs[nextIndex];

		if($nextTab) {

			const bounds= $nextTab.getBoundingClientRect();
			const wrapperBounds= $tabList.getBoundingClientRect();

			requestAnimationFrame(() => {
				
				$tabBorder.style.transform= `
					translateX(${bounds.left - wrapperBounds.left}px)
					scaleX(${bounds.width})
				`;
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

						<select>{requestMethodOptions}</select>

						<input
							type='text' name='url'
							style={RequestInput.styles.input}
							placeholder='Enter URL..'
						/>

						<button onClick={this._onSubmitHandler} style={RequestInput.styles.submitBtn}>Submit</button>
					</div>


					<Tabs onSelect={this._onTabSelect}>
						<TabList>
							<Tab>Body</Tab>
							<Tab>Headers</Tab>
							<Tab>Another one</Tab>
							<div ref='jsTabBorder' className='ReactTabs-border' />
						</TabList>
						
						<TabPanel>
							<DataFieldList requestData={this.state.requestData} updateState={this._updateState.bind(this)} />
						</TabPanel>
						<TabPanel>
							HGaderss pleasgolder
						</TabPanel>
						<TabPanel>
							Something
						</TabPanel>
					</Tabs>

				</div>
			</div>
		);
	}
}
