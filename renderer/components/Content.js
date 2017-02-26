
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

	onSubmit(request) {

		const fetcher= new Fetcher(request);

		fetcher
			.send()
			.then(response => {

				console.log(response.status);
				console.log(response.headers.get('Content-Type'));
				response.text().then(console.log);
			})
			.catch(console.error);
	}

	render() {

		return (

			<div style={Content.styles.wrapper}>
				
				<div style={Content.styles.container}>

					<RequestInput onSubmit={this.onSubmit} />

					<ResponseOutput response={this.state.response} showOutput={this.state.showOutput} />

				</div>

			</div>
		);
	}
}
