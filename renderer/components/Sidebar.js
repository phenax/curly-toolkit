
import React from 'react';
import assign from 'object-assign';
import {ipcRenderer} from 'electron';

import colors from '../constants/colors';


export default class Sidebar extends React.Component {

	static styles= {

		wrapper: {

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
			marginRight: '.5em'
		},

		actions__btn__close: {
			color: colors.close__text,
			backgroundColor: colors.close,
		},
		actions__btn__max: {
			color: colors.maximize__text,
			backgroundColor: colors.maximize,
		},
		actions__btn__min: {
			color: colors.minimize__text,
			backgroundColor: colors.minimize,
		}

	};

	constructor(props) {
		super(props);

		this._closeBtnClickHandler= this._closeBtnClickHandler.bind(this);
	}


	_closeBtnClickHandler() {
		ipcRenderer.send('close-main-window');
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
						onClick={this._closeBtnClickHandler}
						style={assign({}, Sidebar.styles.actions__btn, Sidebar.styles.actions__btn__max)}
						className='fa fa-window-maximize'
					/>

					<button
						onClick={this._closeBtnClickHandler}
						style={assign({}, Sidebar.styles.actions__btn, Sidebar.styles.actions__btn__min)}
						className='fa fa-window-minimize'
					/>

				</div>
			</div>
		);
	}
}
