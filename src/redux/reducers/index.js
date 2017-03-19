import { combineReducers } from 'redux';
import cabins from './Cabins/cabins.js';
import calendar from './Calendar/calendar.js';
import info from './Info/info.js';
import nav from './Nav/nav.js';
import userData from './UserData/userData.js';

const rootReducer = combineReducers({
  cabins,
  calendar,
  info,
  nav,
  userData
});

export default rootReducer;
