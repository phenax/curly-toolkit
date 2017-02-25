

import React from 'react';


export default class DataFieldList extends React.Component {

	static styles= {

		list: {
			padding: '1em 0'
		},

		requstInput: {
			display: 'flex',
			flexDirection: 'row',
		},

		requstInput__closeBtn: {
			flex: 1,
			border: '1px solid #000'
		},

		requstInput__field: {
			flex: 5,
			border: '1px solid #ddd'
		},
	};

	constructor(props) {
		super(props);


	}

	_mutateRequestFields(fn) {

		const requestData= Array.from(this.props.requestData);

		fn(requestData);

		this.props.updateState({ requestData });
	}


	_addRequestField() {
		this._mutateRequestFields(fields => fields.push({ key: '', value: '' }));
	}	

	_removeRequestField(i) {
		this._mutateRequestFields(fields => fields.splice(i, 1));
	}

	_requestValueChange(i, target, e) {
		this._mutateRequestFields( fields => fields[i][target]= e.currentTarget.value );
	}



	render() {

		return (
			<div>

				<ul style={DataFieldList.styles.list}>

					{this.props.requestData.map((data, i) => (

						<li key={i} style={DataFieldList.styles.requstInput}>

							<input
								style={DataFieldList.styles.requstInput__field}
								type='text'
								className='js-data__key'
								placeholder='Key'
								onChange={this._requestValueChange.bind(this, i, 'key')}
								value={data.key}
							/>
							<input
								style={DataFieldList.styles.requstInput__field}
								type='text'
								className='js-data__value'
								placeholder='Value'
								onChange={this._requestValueChange.bind(this, i, 'value')}
								value={data.value}
							/>

							<button
								style={DataFieldList.styles.requstInput__closeBtn}
								onClick={this._removeRequestField.bind(this, i)}
								className='fa fa-close'
							/>

						</li>
					))}
				</ul>

				<button onClick={this._addRequestField.bind(this)}>Add field</button>
			</div>
		);
	}
}
