
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
			marginRight: '.4em',
			backgroundColor: '#fff',
			color: colors.primary,
		},


		list: {
			marginTop: '2em',
			padding: '1em 0 1em',
		},

		list__item: {
			display: 'block',
			width: '100%',
			color: '#fff',
			textAlign: 'left',
			padding: '.3em 2em',
			fontSize: '.9em',
			fontFamily: 'Roboto Condensed',
			textTransform: 'uppercase',
			textDecoration: 'none',
		}
	};


	constructor(props) {
		super(props);

		this._closeBtnClickHandler= this._closeBtnClickHandler.bind(this);
		this._minimizeBtnClickHandler= this._minimizeBtnClickHandler.bind(this);
		this._maximizeBtnClickHandler= this._maximizeBtnClickHandler.bind(this);
	}


	_closeBtnClickHandler() { ipcRenderer.send('close-main-window'); }
	_minimizeBtnClickHandler() { ipcRenderer.send('min-main-window'); }
	_maximizeBtnClickHandler() { ipcRenderer.send('max-main-window'); }


	render() {

		return (

			<div style={Sidebar.styles.wrapper}>

				<div style={Sidebar.styles.actions}>

					<button
						onClick={this._closeBtnClickHandler}
						style={Sidebar.styles.actions__btn}
						className='fa fa-close'
					/>

					<button
						onClick={this._minimizeBtnClickHandler}
						style={Sidebar.styles.actions__btn}
						className='fa fa-minus'
					/>

					<button
						onClick={this._maximizeBtnClickHandler}
						style={Sidebar.styles.actions__btn}
						className='fa fa-window-maximize'
					/>

				</div>


				<ul style={Sidebar.styles.list}>
					<li>
						<a href='#/coolboy'
							className='sidebar-btn'
							style={Sidebar.styles.list__item}>
							Home
						</a>
					</li>
					<li>
						<a href='#/coolboy---1'
							className='sidebar-btn'
							style={Sidebar.styles.list__item}>
							Coolness
						</a>
					</li>
					<li>
						<a href='#/coo---boy'
							className='sidebar-btn'
							style={Sidebar.styles.list__item}>
							Wowlo
						</a>
					</li>
				</ul>

			</div>
		);
	}
}
