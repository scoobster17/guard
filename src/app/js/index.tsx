import * as React from 'react';
import { render } from 'react-dom';


const initialiseApp = () => {
  render(<p>Hello world</p>, document.getElementById('container'));
};

window.addEventListener('load', initialiseApp);
