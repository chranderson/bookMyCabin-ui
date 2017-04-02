export function updateCabinDates(reservation, item) {
  // console.log('reservation, item: ', reservation, item);
  const cabins = reservation.cabins;

  // console.log('cabins: ', cabins);
  const cabinKeys = cabins.map(cabin => cabin.id);
  // console.log('cabinKeys: ', cabinKeys);
  const newCabinKeys = !cabinKeys.includes(item.cabinId)
                     ? [...cabinKeys, item.cabinId]
                     : cabinKeys;

  // console.log('newCabinKeys: ', newCabinKeys);

  const updatedCabins = newCabinKeys.reduce((acc, key) => {
    const thisCabin = cabins.filter(cbn => cbn.id === key)[0];
    const theseDates = thisCabin
                     ? thisCabin.dates
                     : [];

    let newCabinRes;
    if (key === item.cabinId) {
      const newDates = !theseDates.includes(item.date)
                     ? [...theseDates, item.date]
                     : theseDates.filter(date => date !== item.date);

      console.log('newDates: ', newDates);
      newCabinRes = {
        dates: newDates,
        guests: 2
      }

    } else {
      newCabinRes = thisCabin;
    }
    console.log('newCabinRes: ', newCabinRes);
    return [...acc, newCabinRes];
  }, []);

  return {
    cabins: updatedCabins,
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
