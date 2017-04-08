function getCheckoutDate(lastDay) {
  const date = new Date(lastDay);
  const checkoutDate = new Date(date.setDate(date.getDate() + 1)).toLocaleDateString();
  return `${checkoutDate.slice(0, -5)}/${checkoutDate.slice(-2)}`;
}

function generateId() {
  const date = new Date();
  let text = ((date.getMonth() + 1).toString() + date.getDate().toString());
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const extraChars = 8 - text.toString().length;
  for(var i = 0; i < extraChars; i++) {
      const variable = possible.charAt(Math.floor(Math.random() * possible.length)).toUpperCase();
      text += variable;
  }
  return text;
}

function createCabinPayload(cabinRes, cabinFees, config) {
  const savedCabinKeys = cabinRes.map(cabinObj => cabinObj.id);
  const returnVal = savedCabinKeys.reduce((acc, key) => {
    const cabinReservation = cabinRes.filter(item => item.id === key)[0];
    let newCabinObj = {
      id: key,
      url: config.filter(item => item.id === key)[0].url,
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
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      message: user.message
    },
    reservation: {
      id: generateId(),
      firstDay: reservation.cabins[0].dates[0],
      cabins: createCabinPayload(reservation.cabins, fees.cabins, cabins),
      price: {
        deposit: (fees.totalWithTax / 2).toFixed(2),
        subTotal: fees.total.toFixed(2),
        tax: fees.tax.toFixed(2),
        totalWithTax: fees.totalWithTax.toFixed(2)
      }
    }
  }
};
