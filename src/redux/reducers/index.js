import { combineReducers } from 'redux';
import cabins from './Cabins/cabins.js';
import calendar from './Calendar/calendar.js';
import info from './Info/info.js';

const rootReducer = combineReducers({
  cabins,
  calendar,
  info
});

export default rootReducer;
