export default function updateCabinGuestCount(savedCabins, newItem) {
  const cabinKeys = savedCabins.map(savedCabin => savedCabin.id);
  const updatedCabins = cabinKeys.reduce((acc, key) => {
    const thisCabin = savedCabins.filter(cbn => cbn.id === key)[0];
    const returnObj = {
      id: key,
      dates: thisCabin.dates,
      guests: key === newItem.id ? newItem.count : thisCabin.guests,
    };

    return [...acc, returnObj];
  }, []);

  return updatedCabins;
}
