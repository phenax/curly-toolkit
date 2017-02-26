
import assign from 'object-assign';
import queryString from 'querystring';
import url from 'url';

export default class Fetched {

	static hashMapify(array) {

		const obj= {};

		array.forEach((field, i) => {
			if(!!field.key && !!field.value)
				obj[field.key]= field.value;
		});

		return obj;
	}

	static sanitizeHeaders(headers) {

		const SANITIZE_REGEX= /\s/gi;

		for(let key in headers) {
			key.replace(SANITIZE_REGEX, '-');
		}

		return new Headers(headers);
	}

	static sanitizeRequest(request) {
		request= assign({}, request);

		request.headers= Fetched.sanitizeHeaders(request.headers);
		
		if(request.method.toLowerCase() === 'get') {
			const reqUrl= url.parse(request.url, true);
			const query= assign(reqUrl.query, request.body);
			const queryStr= queryString.stringify(reqUrl.query);

			request.url= (reqUrl.protocol || 'http:') + '//' + reqUrl.host + reqUrl.pathname + '?' + queryStr;
		}

		return new Request(request.url, request);
	}

	constructor(request) {

		this.request= Fetched.sanitizeRequest(request);
	}


	send(type, _fetch=fetch) {

		return fetch(this.request)
			.then(res => res[type]? res[type](): res.text());
	}
}
