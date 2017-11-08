import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import reducers from './reducers';

import App from './containers/App';
import Login from './containers/Login';
import registerServiceWorker from './registerServiceWorker';



const store = createStore(
  reducers,
  applyMiddleware(thunk)
);

ReactDOM.render(
  <Provider store={store}>
  <div>
    <Login />
    <App />
  </div>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();