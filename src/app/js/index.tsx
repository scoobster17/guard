import * as React from 'react';
import { render } from 'react-dom';
import App from './app';


const initialiseApp = () => {
  render(<App />, document.getElementById('container'));
};

window.addEventListener('load', initialiseApp);
