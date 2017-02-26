
import { createElement } from 'react';
import { render } from 'react-dom';

import App from './components/RootApp';

// import store from './utils/Storage';


// store.set('url', 'https://google.com');
// store.set('headers', JSON.stringify({ key: 'Value', game: 'blast' }));

// console.log(store.getAll());

render(createElement(App), document.querySelector('.js-application-hook'));
