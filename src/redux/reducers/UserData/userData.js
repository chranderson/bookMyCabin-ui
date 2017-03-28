const sampleData = require('./sampleSession.json');
import {
  updateCabinDates,
  updateCabinGuests,
} from './updateReservation';

const UPDATE_CABIN_DATES = 'userData/UPDATE_CABIN_DATES';
const UPDATE_GUEST_COUNT = 'userData/UPDATE_GUEST_COUNT';

const UPDATE_FORM_DATA = 'userData/UPDATE_FORM_DATA';
// const UPDATE_SELECTED = 'userData/UPDATE_SELECTED';

const SEND_EMAIL = 'userData/SEND_EMAIL';
const SEND_EMAIL_SUCCESS = 'userData/SEND_EMAIL_SUCCESS';
const SEND_EMAIL_FAIL = 'userData/SEND_EMAIL_FAIL';

const initialState = {
  loading: false,
  totalCharge: 0,
  values: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  },
  reservation: {
    cabins: sampleData.cabins,
    user: sampleData.user
  },
  priceConfig: {
    baseGuestCount: 2,
    extraGuestFee: 25,
    taxRate: 0.03
  }
};

function updateFieldValue(values, field, newValue) {
  const fieldKeys = Object.keys(values);
  return fieldKeys.reduce((acc, key) => {
    const accCopy = Object.assign({}, acc);
    if (key === field) {
      accCopy[key] = newValue;
    } else {
      accCopy[key] = values[key];
    }
    return accCopy;
  }, {});
};


export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_FORM_DATA:
      const newValues = updateFieldValue(state.values, action.field, action.value);
      return {
        ...state,
        values: newValues
      };
    case UPDATE_CABIN_DATES:
      const reservationCopy = Object.assign({}, state.reservation);
      const newReservation = updateCabinDates(reservationCopy, action.item);
      return {
        ...state,
        reservation: newReservation,
      };
    case UPDATE_GUEST_COUNT:
      return {
        ...state,
        reservation: updateCabinGuests(Object.assign({}, state.reservation), action.item),
      };

    case SEND_EMAIL:
      console.log('SEND_EMAIL: ', action);
      return {
        ...state,
        loading: true,
      };
    case SEND_EMAIL_SUCCESS:
      console.log('SEND_EMAIL_SUCCESS: ', action);
      return {
        ...state,
        loading: false,
      };
    case SEND_EMAIL_FAIL:
      console.log('SEND_EMAIL_FAIL: ', action);
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export function updateSavedDates(item) {
  return {
    type: UPDATE_CABIN_DATES,
    item
  };
}

export function updateGuestCount(item) {
  return {
    type: UPDATE_GUEST_COUNT,
    item
  };
}

export function updateFormData(field, value) {
  return {
    type: UPDATE_FORM_DATA,
    field,
    value
  };
}

export function sendEmail(sessionData) {
  const url = 'https://odn75i78e8.execute-api.us-west-2.amazonaws.com/prod/message';
  return {
    types: [SEND_EMAIL, SEND_EMAIL_SUCCESS, SEND_EMAIL_FAIL],
    promise: (client) => client.post(url, { data: sampleData }),
  };
}
