
import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import RequestInput from './RequestInput';

const ResponseOutput= ({ response, showOutput }) => (
	<div style={{ opacity: (showOutput)? 1: 0.3 }}>
		Showing the output

		{console.log(response.headers)? '': ''}

		{ /* Request config card */ }
		<div style={RequestInput.styles.uiCard}>

			<Tabs>
				<TabList>
					<Tab>Body</Tab>
					<Tab>Headers</Tab>
					<Tab>More</Tab>
					<div className='ReactTabs-border' />
				</TabList>


				{ /* Request data fields */ }
				<TabPanel>
					<pre className='codeblock selectable'>
						{typeof response.body === 'object'?
							JSON.stringify(response.body, null, 3):
							response.body}
					</pre>
				</TabPanel>
				{ /* Header fields */ }
				<TabPanel>
					<pre className='codeblock selectable'>
						{typeof response.headers === 'object'?
							JSON.stringify(response.headers, null, 3):
							response.headers}
					</pre>
				</TabPanel>
				{ /* Authorization */ }
				<TabPanel>
					Something more
				</TabPanel>
			</Tabs>
		</div>
	</div>
);

export default ResponseOutput;

