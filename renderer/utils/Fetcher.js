
import assign from 'object-assign';
import queryString from 'querystring';
import url from 'url';

export default class Fetched {

	/**
	 * Convert an array of objects with key and value([ { key: '', value: '' } ]) to an object
	 * 
	 * @param  {Array}   array
	 * 
	 * @return {Object}
	 */
	static hashMapify(array) {

		const obj= {};

		array.forEach((field, i) => {

			if(!!field.key && !!field.value) {

				obj[field.key]= field.value;
			}

		});

		return obj;
	}


	/**
	 * Sanitize the headers to be sent
	 * 
	 * @param  {Object}   headers
	 * 
	 * @return {Headers}
	 */
	static sanitizeHeaders(headers) {

		const SANITIZATION_REGEX= /\s/gi;

		for(let key in headers) {
			key.replace(SANITIZATION_REGEX, '-');
		}

		return new Headers(headers);
	}



	/**
	 * Sanitize the request
	 * 
	 * @param  {Object}   request
	 * 
	 * @return {Request}
	 */
	static sanitizeRequest(request) {

		request= assign({}, request);

		request.headers= Fetched.sanitizeHeaders(request.headers);

		if(request.method.toLowerCase() === 'get') {

			const reqUrl= url.parse(request.url, true);
			const query= assign(reqUrl.query, request.body);
			const queryStr= queryString.stringify(reqUrl.query);

			request.url=
				(reqUrl.protocol || 'http:') + '//' + 
				reqUrl.host + reqUrl.pathname + 
				(queryStr? '?'+queryStr: '');

		} else {

			// If the body is not formdata, make it formdata
			if(!FormData.prototype.isPrototypeOf(request.body)) {

				const formData= Object.keys(request.body).reduce((formData, key) => {

					formData.append(key, request.body[key]);

					return formData;

				}, new FormData());

				request.body= formData;
			}
		}

		return new Request(request.url, request);
	}


	/**
	 * @param  {Object} request
	 */
	constructor(request) {

		this.request= Fetched.sanitizeRequest(request);
	}


	/**
	 * Send the fetch request
	 * 
	 * @param  {Function} _fetch  Dependency inject
	 * 
	 * @return {Promise}          Resolves the network response
	 */
	send(_fetch=fetch) {

		return fetch(this.request);
	}
}
