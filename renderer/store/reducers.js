
import { TYPES } from './actions';

const initialStates= {

	router: {
		url: '/',
	},

	request: {
		body: [ { key: '', value: '', }, ],
		headers: [ { key: '', value: '', }, ],
		auth: { type: 0, user: '', pass: '', }
	},
};

export const router= (state=initialStates.router, action) => {

	switch(action.type) {

		case TYPES.HASH_CHANGE:
			return { ...state, url: action.url };
	}

	return state;
};


export const request= (state=initialStates.request, action) => {

	switch(action.type) {

		case TYPES.REQUEST_BODY_CHANGE:
			return { ...state, body: action.body };

		case TYPES.REQUEST_HEADER_CHANGE:
			return { ...state, header: action.header };

		case TYPES.REQUEST_AUTH_CHANGE:
			return { ...state, auth: action.auth };
	}
};
