

import React from 'react';

import colors from '../constants/colors';

export default class DataFieldList extends React.Component {

	static styles= {

		list: {
			padding: '1em 0'
		},

		requstInput: {
			display: 'flex',
			flexDirection: 'row',
			marginBottom: '.3em',
		},

		requstInput__closeBtn: {
			width: '40px',
			fontSize: '.7em',
			backgroundColor: colors.primary,
			color: '#fff',
		},

		requstInput__field: {
			flex: 11,
			border: '1px solid #ddd',
			padding: '.4em .8em',
		},

		addFieldBtn: {
			padding: '.6em 1em',
			backgroundColor: colors.accent_blue,
			color: '#fff',
			fontFamily: 'Roboto Condensed',
		},
	};


	mutateRequestFields(fn) {

		const list= Array.from(this.props.list);

		fn(list);

		this.props.updateState({ [this.props.type]: list });
	}


	addField() {
		this.mutateRequestFields(fields => fields.push({ key: '', value: '' }));
	}	

	removeField(i) {
		this.mutateRequestFields(fields => fields.splice(i, 1));
	}

	inputValueChange(i, target, e) {
		this.mutateRequestFields( fields => fields[i][target]= e.currentTarget.value );
	}



	render() {

		return (
			<div>

				<ul style={DataFieldList.styles.list}>

					{this.props.list.map((data, i) => (

						<li key={i} style={DataFieldList.styles.requstInput}>

							<input
								style={DataFieldList.styles.requstInput__field}
								type='text'
								className='js-data__key'
								placeholder='Key'
								onChange={this.inputValueChange.bind(this, i, 'key')}
								value={data.key}
							/>
							<input
								style={DataFieldList.styles.requstInput__field}
								type='text'
								className='js-data__value'
								placeholder='Value'
								onChange={this.inputValueChange.bind(this, i, 'value')}
								value={data.value}
							/>

							<button
								style={DataFieldList.styles.requstInput__closeBtn}
								onClick={this.removeField.bind(this, i)}
								className='fa fa-close'
							/>

						</li>
					))}
				</ul>

				<div style={{ textAlign: 'right', fontSize: '.8em', }}>
					<button
						style={DataFieldList.styles.addFieldBtn}
						onClick={this.addField.bind(this)}>
						<i className='fa fa-plus fa--padd' />
						Add field
					</button>
				</div>
			</div>
		);
	}
}
