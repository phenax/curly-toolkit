
export const TYPES= {
	HASH_CHANGE: 'HASH_CHANGE',
};

export const actions= {

	triggerRoute: url => ({ type: TYPES.HASH_CHANGE, url }),
};
