function getCheckoutDate(lastDay) {
  const date = new Date(lastDay);
  const checkoutDate = new Date(date.setDate(date.getDate() + 1)).toLocaleDateString();
  return `${checkoutDate.slice(0, -5)}/${checkoutDate.slice(-2)}`;
}

export default function createCabinPayload(cabinRes, cabinFees, config) {
  const savedCabinKeys = cabinRes.map(cabinObj => cabinObj.id);
  const returnVal = savedCabinKeys.reduce((acc, key) => {
    const cabinReservation = cabinRes.filter(item => item.id === key)[0];
    let newCabinObj = {
      id: key,
      checkout: getCheckoutDate(cabinReservation.dates.slice(-1)[0]),
      nights: cabinReservation.dates.length,
      name: config.filter(item => item.id === key)[0].name,
      dates: cabinReservation.dates,
      guests: cabinReservation.guests,
      price: cabinFees[key]
    };
    return [...acc, newCabinObj];
  }, []);

  return returnVal;
}
