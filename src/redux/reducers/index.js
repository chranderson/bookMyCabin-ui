import { combineReducers } from 'redux';
import cabins from './Cabins/cabins.js';
import calendar from './Calendar/calendar.js';
import info from './Info/info.js';
import nav from './Nav/nav.js';
import userData from './UserData/userData.js';
import { reducer as reduxAsyncConnect } from 'redux-connect'

const rootReducer = combineReducers({
  reduxAsyncConnect,
  cabins,
  calendar,
  info,
  nav,
  userData
});

export default rootReducer;
