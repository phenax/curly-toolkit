
module.exports= {

	closeWindow(_window) {

		if(typeof _window === 'object') {
			_window.close();
		}
	},

	minimizeWindow(_window) {

		if(typeof _window === 'object') {
			_window.minimize();
		}
	},

	maximizeWindow(_window) {

		if(typeof _window === 'object') {
			(_window.isMaximized())?
				_window.unmaximize():
				_window.maximize();
		}
	},
};
