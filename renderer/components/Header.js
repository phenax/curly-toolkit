
import React from 'react';
import {ipcRenderer} from 'electron';

import colors from '../constants/colors';

export default class Header extends React.Component {

	static styles= {

		header: {
			display: 'flex',
			backgroundColor: colors.primary,
			justifyContent: 'space-between',
			height: '50px',
			alignItems: 'center',
			position: 'relative',
		},

		header__underlay: {
			WebkitAppRegion: 'drag',
			position: 'absolute',
			left: 0,
			top: 0,
			width: '100%',
			height: '100%',
			backgroundColor: 'pink',
			zIndex: 0
		},

		header__logo: {
			color: '#fff',
			fontSize: '2em',
			position: 'relative',
			zIndex: 1
		},

		header__actions: {
		},

		header__actions__btn: {
			position: 'relative',
			zIndex: 1
		}
	};

	constructor(props) {
		super(props);
		
		this._closeBtnClickHandler= this._closeBtnClickHandler.bind(this);
	}


	_closeBtnClickHandler() {
		console.log('closeBtnClick')
		ipcRenderer.send('close-main-window');
	}

	render() {

		return (

			<header style={Header.styles.header}>

				<div style={Header.styles.header__logo} className='fa fa-facebook'></div>

				<div style={Header.styles.header__actions}>

					<button style={Header.styles.header__actions__btn}>Hello</button>

					<button
						onClick={this._closeBtnClickHandler}
						style={Header.styles.header__actions__btn}>
						Close
					</button>

				</div>

			</header>
		);
	}
}
