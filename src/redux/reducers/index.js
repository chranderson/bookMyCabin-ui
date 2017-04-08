import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'
import cabins from './Cabins/cabins.js';
import calendar from './Calendar/calendar.js';
import nav from './Nav/nav.js';
import userData from './UserData/userData.js';
import { reducer as reduxAsyncConnect } from 'redux-connect'

const rootReducer = combineReducers({
  form: formReducer,
  reduxAsyncConnect,
  cabins,
  calendar,
  nav,
  userData
});

export default rootReducer;
