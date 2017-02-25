
module.exports= {

	closeWindow(_window) {

		if(typeof _window === 'object') {
			_window.close();
		}
	}
};
