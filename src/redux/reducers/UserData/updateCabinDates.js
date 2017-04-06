function updateDates(newDate, currentDates) {
  const newDates = !currentDates.includes(newDate)
                 ? [...currentDates, newDate]
                 : currentDates.filter(date => date !== newDate);

  const sortedDates = newDates.sort((itemA, itemB) => itemA < itemB ? -1 : 1);
  return sortedDates;
};

export default function updateCabinDates(savedCabins, newItem) {
  const cabinKeys = savedCabins.map(savedCabin => savedCabin.id);
  const newCabinKeys = !cabinKeys.includes(newItem.id)
                     ? [...cabinKeys, newItem.id]
                     : cabinKeys;

  const updatedCabins = newCabinKeys.reduce((acc, key) => {
    // filter current cabin out of list with key
    const thisCabin = savedCabins.filter(cabin => cabin.id === key)[0];
    // if cabin is defined, use current dates, else initiate empty array
    const theseDates = thisCabin ? thisCabin.dates : [];

    let returnObj;

    // update the cabin object if the current mappedId key === newItem id
    if (key === newItem.id) {
      const newDates = updateDates(newItem.date, theseDates);
      returnObj = {
        id: key,
        dates: newDates,
        guests: thisCabin && newDates.length ? thisCabin.guests : 0,
      };

    } else {
      // return the unmodified cabin object
      returnObj = thisCabin;
    }
    // use slice to add returnObj to array
    return [...acc, returnObj];
  }, []);

  return updatedCabins;
}
