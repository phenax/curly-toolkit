
import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import RequestInput from './RequestInput';


export default class ResponseOutput extends React.Component {

	static styles= {
		responseOutput: {
			fontSize: '.7em',
			position: 'relative',
			maxWidth: 'calc(100vw - 320px)',
			padding: '1em',
		}
	};

	componentDidMount() {
		this.onTabSelect(0);
	}

	onTabSelect(i, j) {
		this.props.onTabSelect(i, j, this);
	}

	render() {

		return (
			<div style={{ opacity: (this.props.showOutput)? 1: 0.3 }} ref='formWrapper'>

				{ /* Request config card */ }
				<div style={RequestInput.styles.uiCard}>

					<Tabs onSelect={this.onTabSelect.bind(this)}>
						<TabList>
							<Tab>Body</Tab>
							<Tab>Headers</Tab>
							<Tab>More</Tab>
							<div ref='jsTabBorder' className='ReactTabs-border' />
						</TabList>


						{ /* Request data fields */ }
						<TabPanel>
							{
								this.props.showOutput?
									<pre className='codeblock selectable' style={ResponseOutput.styles.responseOutput}>
										{typeof this.props.response.body === 'object'?
											JSON.stringify(this.props.response.body, null, 3):
											this.props.response.body}
									</pre>: null
							}
						</TabPanel>

						{ /* Header fields */ }
						<TabPanel>
							{
								this.props.showOutput?
									<pre className='codeblock selectable' style={ResponseOutput.styles.responseOutput}>
										{typeof this.props.response.headers === 'object'?
											JSON.stringify(this.props.response.headers, null, 3):
											this.props.response.headers}
									</pre>: null
							}
						</TabPanel>

						{ /* Authorization */ }
						<TabPanel>
							{
								this.props.showOutput?
									<div>
										Something
									</div>: null
							}
						</TabPanel>
					</Tabs>
				</div>
			</div>
		);
	}
}

