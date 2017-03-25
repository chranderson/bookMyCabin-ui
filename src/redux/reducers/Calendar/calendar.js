import {
  getBookedDates,
  getDays,
  // getWeek,
  getUpdatedBookings
} from './utils';

const GET_DATES = 'calendar/GET_DATES';
const GET_NEXT_DATES = 'calendar/GET_NEXT_DATES';
const GET_PREV_DATES = 'calendar/GET_PREV_DATES';
const LOAD_EVENTS = 'calendar/LOAD_EVENTS';
// const SELECT_DATE = 'calendar/SELECT_DATE';


const initialState = {
  controlledDate: new Date(),
  days: getDays(new Date(), 14, 'now'),
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
      const updatedDays = getDays(action.date, action.count, 'now');
      return {
        ...state,
        controlledDate: new Date(updatedDays[0]),
        days: updatedDays
      };
    case GET_NEXT_DATES:
      const theseDays = state.days.slice();
      const lastDay = theseDays[theseDays.length - 1];
      const newDays = getDays(lastDay, 14, 'future');
      return {
        ...state,
        controlledDate: new Date(newDays[0]),
        days: newDays
      };
    case GET_PREV_DATES:
      const thoseDays = state.days.slice();
      const firstDay = thoseDays[0];
      const oldDays = getDays(firstDay, 14, 'previous').reverse();
      return {
        ...state,
        controlledDate: new Date(oldDays[0]),
        days: oldDays
      };
    case LOAD_EVENTS:
      // const bookings = Object.assign({}, state.bookings);
      return {
        ...state,
        bookings: getUpdatedBookings(action.cabinId, action.dates, Object.assign({}, state.bookings))
      };
    default:
      return state;
  }
};

export function getDates(date, count) {
  return {
    type: GET_DATES,
    count,
    date,
  };
}

export function getNextDates() {
  return {
    type: GET_NEXT_DATES,
  };
}

export function getPrevDates() {
  return {
    type: GET_PREV_DATES,
  };
}

export function loadEvents(res, cabinId) {
  return {
    type: LOAD_EVENTS,
    cabinId,
    dates: getBookedDates(res)
  };
}
