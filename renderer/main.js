
import { createElement } from 'react';
import { render } from 'react-dom';

import App from './components/RootApp';


render(createElement(App), document.querySelector('.js-application-hook'));
