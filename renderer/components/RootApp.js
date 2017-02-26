
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
			backgroundColor: '#eee',
		},

		sidebar: {
			background: `linear-gradient(-180deg, #34b8be 10%, ${colors.accent_blue} 50%)`,
			width: '300px',
			minHeight: '100vh'
		},

		handle: {
			WebkitAppRegion: 'drag',
			width: '100%',
			padding: '1em 2em',
			color: '#fff',
			fontFamily: 'Roboto Condensed',
			backgroundColor: colors.primary,
			boxShadow: '0 2px 4px 1px rgba(0, 0, 0, 0.14)',
		},

		content: {
			width: '100%',
			minHeight: '100vh',
			boxShadow: '-1px 0 5px 3px rgba(0, 0, 0, 0.2)'
		}
	};


	render() {

		return (

			<div style={App.styles.container}>

				<div style={App.styles.sidebar}>

					<Sidebar />

				</div>

				<div style={App.styles.content}>

					<div style={App.styles.handle}>Curly Toolkit</div>

					<Content />

				</div>

			</div>
		);
	}
}
