
import React from 'react';

import colors from '../constants/colors';

import Sidebar from './Sidebar';
import Content from './Content';

export default class App extends React.Component {

	static styles= {

		container: {
			display: 'flex',
			flexDirection: 'row',
			alignItems: 'stretch',
		},

		sidebar: {
			backgroundColor: colors.primary,
			width: '300px',
			minHeight: '100vh'
		},

		handle: {
			WebkitAppRegion: 'drag',
			width: '100%',
			padding: '1em',
			backgroundColor: colors.accent_blue,
		},

		content: {
			width: '100%',
			minHeight: '100vh',
		}
	};

	render() {
		return (
			<div style={App.styles.container}>
				<div style={App.styles.sidebar}>
					<Sidebar />
				</div>
				<div style={App.styles.content}>
					<div style={App.styles.handle}>
						Curly
					</div>
					<Content />
				</div>
			</div>
		);
	}
}
