
import { TYPES } from './actions';

const initialStates= {

	router: {
		url: '/',
	}
};

export const router= (state=initialStates.router, action) => {

	switch(action.type) {

		case TYPES.HASH_CHANGE:
			return { ...state, url: action.url };
	}

	return state;
};
