import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

console.log(
  `%c ${process.env.REACT_APP_APPLICATION_NAME} ${process.env.REACT_APP_APPLICATION_VERSION}`,
  'font-weight: bold; font-size: 50px;color: #07bc60; text-shadow: 2px 2px 0 #fff'
);

ReactDOM.render(<App />, document.getElementById('root'));
