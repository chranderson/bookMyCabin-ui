const sampleData = require('./sampleSession.json');

const UPDATE_FORM_DATA = 'userData/UPDATE_FORM_DATA';
const UPDATE_SELECTED = 'userData/UPDATE_SELECTED';

const SEND_EMAIL = 'userData/SEND_EMAIL';
const SEND_EMAIL_SUCCESS = 'userData/SEND_EMAIL_SUCCESS';
const SEND_EMAIL_FAIL = 'userData/SEND_EMAIL_FAIL';

const initialState = {
  loading: false,
  selected: {
    // cabin1: ['5/17/17', '5/18/17', '5/19/17', '5/20/17', '5/21/17'],
    // cabin2: ['5/17/17', '5/18/17', '5/19/17', '5/20/17', '5/21/17'],
    // cabin3: ['5/17/17', '5/18/17', '5/19/17', '5/20/17', '5/21/17'],
    // cabin4: ['5/17/17', '5/18/17', '5/19/17', '5/20/17', '5/21/17'],
  },
  totalCharge: 0,
  values: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  }
};

function updateSelectedItems(currentItems, newItem) {
  const selectedKeys = Object.keys(currentItems);
  const updatedKeys = selectedKeys.includes(newItem.cabinId)
                    ? selectedKeys
                    : [...selectedKeys, newItem.cabinId];

  return updatedKeys.reduce((acc, key) => {
    const accCopy = Object.assign({}, acc);

    if (key === newItem.cabinId) {
      const thisCabin = currentItems[key] || [];
      accCopy[key] = !thisCabin.length
                   ? [ newItem.date ] // if cabin dates arr has no dates, create arr with date
                   : thisCabin.includes(newItem.date) // if it has dates, check if it has input date
                     ? thisCabin.filter(date => date !== newItem.date) // if it has input date, remove it
                     : [...thisCabin, newItem.date] // if it does not have input date, add it

    } else {
      accCopy[key] = currentItems[key]; // add cabinId key and attach previous cabin dates
    }

    return accCopy;
  }, {});

}


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
    case UPDATE_SELECTED:
      const newSelection = updateSelectedItems(Object.assign({}, state.selected), action.item);
      const totalAmount = Object.keys(newSelection).reduce((acc, key) => acc + newSelection[key].length, 0);
      return {
        ...state,
        selected: newSelection,
        totalCharge: (totalAmount * 185)
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

export function updateSelected(item) {
  return {
    type: UPDATE_SELECTED,
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
