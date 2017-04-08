function getCheckoutDate(lastDay) {
  const date = new Date(lastDay);
  const checkoutDate = new Date(date.setDate(date.getDate() + 1)).toLocaleDateString();
  return `${checkoutDate.slice(0, -5)}/${checkoutDate.slice(-2)}`;
}

function createCabinPayload(cabinRes, cabinFees, config) {
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

export default function createPayload(user, reservation, fees, cabins) {
  return {
    user: {
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
      phone: user.phone,
      message: user.message
    },
    reservation: {
      firstDay: reservation.cabins[0].dates[0],
      cabins: createCabinPayload(reservation.cabins, fees.cabins, cabins),
      price: {
        total: fees.total.toFixed(2),
        tax: fees.tax.toFixed(2),
        totalWithTax: fees.totalWithTax.toFixed(2)
      }
    }
  }
};
