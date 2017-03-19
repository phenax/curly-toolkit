

export default new (class Storage {

	PREFIX= 'curly__';

	PREFIX_REGEX= new RegExp(`^${this.PREFIX}`, 'gi');

	constructor(props) {
		
		this.data= {};
	}


	getPrefixedKey(key) {
		return this.PREFIX + key;
	}

	get(key) {

		let value= localStorage.getItem(this.getPrefixedKey(key));

		try {
			value= JSON.parse(value);
		} catch(e) {
			console.log(e.message);
		}

		return value;
	}

	set(key, value) {

		if(typeof value === 'object')
			value= JSON.stringify(value);

		localStorage.setItem(this.getPrefixedKey(key), value);
		return this;
	}

	getAll() {

		return Object
			.keys(localStorage)
			.reduce((obj, key) => {

				if(this.PREFIX_REGEX.test(key)) {

					const shortKey= key.replace(this.PREFIX_REGEX, '');

					obj[shortKey]= this.get(shortKey);
				}

				return obj;
			}, {});
	}

});
