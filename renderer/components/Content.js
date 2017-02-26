
import React from 'react';

import RequestInput from './RequestInput';
import ResponseOutput from './ResponseOutput';

import Fetcher from '../utils/Fetcher';

import colors from '../constants/colors';

export default class Content extends React.Component {

	static styles= {

		wrapper: {
			position: 'relative',
			padding: '1em'
		},

		container: {
			margin: '1em auto',
		}
	};

	state= {
		showOutput: false,
		response: {},
	};

	constructor(props) {
		super(props);
		
		this.onSubmit= this.onSubmit.bind(this);
	}

	onTabSelect(nextIndex, prevIndex, context) {

		const $tabs= context.refs.formWrapper.querySelectorAll('.ReactTabs__Tab');
		const $tabList= context.refs.formWrapper.querySelector('.ReactTabs__TabList');

		const $nextTab= $tabs[nextIndex];

		if($nextTab) {

			console.log($tabList, $nextTab);

			const bounds= $nextTab.getBoundingClientRect();

			// Wait for the next frame
			requestAnimationFrame(() => {
				
				const wrapperBounds= $tabList.getBoundingClientRect();

				// Skip another frame
				requestAnimationFrame(() => {

					context.refs.jsTabBorder.style.transform= `
						translateX(${bounds.left - wrapperBounds.left}px)
						scaleX(${bounds.width})
					`;
				});
			});
		}
	}

	onSubmit(request) {

		const fetcher= new Fetcher(request);

		this.setState({ showOutput: false });

		fetcher
			.send()
			.then(response => {

				const responseData= {
					status: response.status,
					headers: Array
						.from(response.headers.keys())
						.reduce(
							(obj, key) => {
								obj[key]= response.headers.get(key);
								return obj;
							}, {}
						),
				};

				response.text()
					.then(data => {
						responseData.body= data;
						this.setState({ response: responseData });
					});
			})
			.catch(e => e)
			.then(() => this.setState({ showOutput: true }));
	}

	render() {

		return (

			<div style={Content.styles.wrapper}>
				
				<div style={Content.styles.container}>

					<RequestInput
						onSubmit={this.onSubmit}
						onTabSelect={this.onTabSelect}
					/>

					<ResponseOutput
						response={this.state.response}
						onTabSelect={this.onTabSelect}
						showOutput={this.state.showOutput}
					/>

				</div>

			</div>
		);
	}
}
