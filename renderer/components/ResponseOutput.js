
import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import RequestInput from './RequestInput';

const ResponseOutput= ({ response, showOutput }) => (
	<div style={{ opacity: (showOutput)? 1: 0.3 }}>
		Showing the output

		{ /* Request config card */ }
		<div style={RequestInput.styles.uiCard}>

			<Tabs>
				<TabList>
					<Tab>Body</Tab>
					<Tab>Headers</Tab>
					<Tab>Authorization</Tab>
					<div className='ReactTabs-border' />
				</TabList>


				{ /* Request data fields */ }
				<TabPanel>
					Tab1
				</TabPanel>
				{ /* Header fields */ }
				<TabPanel>
					Tab2
				</TabPanel>
				{ /* Authorization */ }
				<TabPanel>
					Something
				</TabPanel>
			</Tabs>
		</div>
	</div>
);

export default ResponseOutput;

