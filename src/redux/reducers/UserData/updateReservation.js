export function updateCabinDates(reservation, item) {
  const cabins = reservation.cabins;
  const cabinKeys = Object.keys(cabins);
  const newCabinKeys = !cabinKeys.includes(item.cabinId)
                     ? [...cabinKeys, item.cabinId]
                     : cabinKeys;

  const updatedCabins = newCabinKeys.reduce((acc, key) => {
    const thisCabin = cabins[key];
    const theseDates = thisCabin
                     ? thisCabin.dates
                     : [];

    if (key === item.cabinId) {
      const newDates = !theseDates.includes(item.date)
                     ? [...theseDates, item.date]
                     : theseDates.filter(date => date !== item.date);
      acc[key] = {
        dates: newDates,
        guests: 2
      }
    } else {
      acc[key] = thisCabin;
    }
    return acc;
  }, {});

  return {
    cabins: updatedCabins,
    user: reservation.user,
  };
}

export function updateCabinGuests(reservation, item) {
  const cabins = reservation.cabins;
  const cabinKeys = Object.keys(cabins);

  const updatedCabins = cabinKeys.reduce((acc, key) => {
    const thisCabin = cabins[key];

    acc[key] = {
      dates: thisCabin.dates,
      guests: item.cabinId === key
              ? item.count
              : thisCabin.guests
    };
    return acc;
  }, {});



  return {
    cabins: updatedCabins,
    user: reservation.user,
  };
}
