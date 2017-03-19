const UPDATE_SELECTED = 'userData/UPDATE_SELECTED';

const initialState = {
  selected: {},
  totalCharge: 0,
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

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_SELECTED:
      const newSelection = updateSelectedItems(Object.assign({}, state.selected), action.item);
      const totalAmount = Object.keys(newSelection).reduce((acc, key) => acc + newSelection[key].length, 0);
      console.log('totalAmount: ', totalAmount * 185);
      return {
        ...state,
        selected: newSelection,
        totalCharge: (totalAmount * 185)
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
