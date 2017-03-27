import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router'
import { ReduxAsyncConnect } from 'redux-connect'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ApiClient from './helpers/ApiClient';

import './index.scss';

import {
  App,
} from './containers';

import { Provider } from 'react-redux';
import configureStore from './redux/store/configure-store';
const client = new ApiClient();

const store = configureStore(client, window.__data);

const component = (
  <Router history={hashHistory}
          render={(props) => <ReduxAsyncConnect {...props} helpers={{client}} />}>
    <Route path="/" component={App} />
  </Router>
);

ReactDOM.render(
  <Provider key="provider" store={store}>
    <MuiThemeProvider>
      {component}
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);
