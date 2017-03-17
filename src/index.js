import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import './index.scss';

import {
  App,
  Contact,
  // Home
} from './containers';

import { Provider } from 'react-redux';
import configureStore from './redux/store/configure-store';

const store = configureStore();

const component = (
  <Router history={hashHistory} component={App}>
    <Route path="/" component={App} />
    <Route path="/contact" component={Contact} />
  </Router>
);

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider>
      {component}
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);
