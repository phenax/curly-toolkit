
import React from 'react';
import assign from 'object-assign';
import {ipcRenderer} from 'electron';

import colors from '../constants/colors';


export default class Sidebar extends React.Component {

	static styles= {

		wrapper: {
			color: '#fff',
		},

		actions: {
			position: 'relative',
			zIndex: '1',
			textAlign: 'left',
			padding: '.5em',
		},

		actions__btn: {
			width: '20px',
			height: '20px',
			borderRadius: '50%',
			fontSize: '.5em',
			marginRight: '.3em',
			backgroundColor: colors.primary,
			color: '#fff'
		},

		actions__btn__close: {
			// color: colors.close__text,
		},
		actions__btn__max: {
			// color: colors.maximize__text,
			// backgroundColor: colors.maximize,
		},
		actions__btn__min: {
			// color: colors.minimize__text,
			// backgroundColor: colors.minimize,
		},


		list: {
			padding: '1em 0'
		},

		list__item: {
			display: 'block',
			width: '100%',
			color: '#fff',
		}
	};

	constructor(props) {
		super(props);

		this._closeBtnClickHandler= this._closeBtnClickHandler.bind(this);
	}


	_closeBtnClickHandler() {
		ipcRenderer.send('close-main-window');
	}

	_minimizeBtnClickHandler() {
		ipcRenderer.send('min-main-window');
	}

	_maximizeBtnClickHandler() {
		ipcRenderer.send('max-main-window');
	}

	render() {
		return (
			<div style={Sidebar.styles.wrapper}>
				<div style={Sidebar.styles.actions}>

					<button
						onClick={this._closeBtnClickHandler}
						style={assign({}, Sidebar.styles.actions__btn, Sidebar.styles.actions__btn__close)}
						className='fa fa-close'
					/>

					<button
						onClick={this._minimizeBtnClickHandler}
						style={assign({}, Sidebar.styles.actions__btn, Sidebar.styles.actions__btn__min)}
						className='fa fa-minus'
					/>

					<button
						onClick={this._maximizeBtnClickHandler}
						style={assign({}, Sidebar.styles.actions__btn, Sidebar.styles.actions__btn__max)}
						className='fa fa-window-maximize'
					/>

				</div>

				<ul style={Sidebar.styles.list}>
					<li>
						<button style={Sidebar.styles.list__item}>Home</button>
						<button style={Sidebar.styles.list__item}>Coolness</button>
						<button style={Sidebar.styles.list__item}>Wowlo</button>
					</li>
				</ul>
			</div>
		);
	}
}
