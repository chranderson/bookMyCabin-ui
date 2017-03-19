import {
  getBookedDates,
  getDays,
  getWeek
} from './utils';

const GET_DATES = 'calendar/GET_DATES';
const LOAD_EVENTS = 'calendar/LOAD_EVENTS';
const SELECT_DATE = 'calendar/SELECT_DATE';


const initialState = {
  controlledDate: new Date(),
  days: getWeek(),
  bookings: {
    cabin1: [],
    cabin2: [],
    cabin3: [],
    cabin4: [],
    cabin5: [],
    cabin7: []
  },
};

export default (state = initialState, action) => {

  switch (action.type) {
    case GET_DATES:
      return {
        ...state,
        days: action.days
      };
    case LOAD_EVENTS:
      const bookings = Object.assign({}, state.bookings);
      const updatedBookings =
      Object.keys(bookings).reduce((acc, key) => {
        const accCopy = Object.assign({}, acc);
        if (key === action.cabinId) {
          accCopy[key] = action.dates
        } else {
          accCopy[key] = bookings[key];
        }
        return accCopy;
      }, {});
      return {
        ...state,
        bookings: updatedBookings
      };
    case SELECT_DATE:
      return {
        ...state,
        controlledDate: action.date
      };
    default:
      return state;
  }
};

export function selectDate(date) {
  return {
    type: SELECT_DATE,
    date
  };
}

export function getDates(date, count) {
  return {
    type: GET_DATES,
    days: getDays(date, count)
  };
}

export function loadEvents(res, cabinId) {
  return {
    type: LOAD_EVENTS,
    cabinId,
    dates: getBookedDates(res)
  };
}
