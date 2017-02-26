
import React from 'react';

import colors from '../constants/colors';

import Sidebar from './Sidebar';
import Content from './Content';

const dimens= {

};

export default class App extends React.Component {

	static sidebarWidth= '250px';
	static contentWidth= `calc(100vw - ${App.sidebarWidth})`;


	static styles= {

		container: {
			display: 'flex',
			flexDirection: 'row',
			alignItems: 'stretch',
			backgroundColor: '#eee',
		},

		sidebar: {
			background: `linear-gradient(-180deg, #34b8be 10%, ${colors.accent_blue} 50%)`,
			width: App.sidebarWidth,
			minHeight: '100vh',
		},

		handle: {
			WebkitAppRegion: 'drag',
			padding: '1em 2em',
			color: '#fff',
			fontFamily: 'Roboto Condensed',
			backgroundColor: colors.primary,
			boxShadow: '0 2px 4px 1px rgba(0, 0, 0, 0.14)',
			position: 'static',
			top: 0,
			right: 0,
			zIndex: 10,
			width: '100%',
		},

		content: {
			minHeight: '100vh',
			boxShadow: '-1px 0 5px 3px rgba(0, 0, 0, 0.2)',
			width: App.contentWidth,
		},
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
