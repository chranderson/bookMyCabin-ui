const getExtraGuestFee = (guests, stay, fee) => {
  let extraFee = 0;
  if (guests > 2) {
    const extraGuests = guests - 2;
    const extraGuestsTotal = extraGuests * stay * fee;
    extraFee += extraGuestsTotal;
  }
  return extraFee;
}

const getTax = (total, taxRate) => {
  const lessTax = total / (1 + taxRate);
  const tax = (total - lessTax);
  // console.log('tax: ', tax);
  return tax;
}

export function getCabinTotals(reservation, cabinDetails, priceConfig) {
  // console.log('reservation: ', reservation);
  const cabinReservation = reservation.cabins;
  // console.log('cabinReservation: ', cabinReservation);
  // const cabinKeys = Object.keys(cabinReservation);
  const cabinKeys = cabinReservation.map(cabinRes => cabinRes.id);
  // console.log('cabinKeys: ', cabinKeys);
  const cabinTotals = cabinKeys.reduce((acc, key) => {
    const thisCabin = cabinDetails.filter(cbn => cbn.id === key)[0];
    // console.log('thisCabin: ', thisCabin);
    const thisCabinReservation = cabinReservation.reduce((acc, cabinRes) => {
      if (cabinRes.id ===  key) {
        acc = cabinRes;
      }
      return acc;
    }, {});
    // console.log('thisCabinReservation: ', thisCabinReservation);
    const stayLength = thisCabinReservation.dates.length;
    // console.log('stayLength: ', stayLength);
    const guestCount = thisCabinReservation.guests;
    // console.log('guestCount: ', guestCount);
    const baseFee = thisCabin.price * stayLength;
    // console.log('baseFee: ', baseFee);
    const extraGuestFee = getExtraGuestFee(guestCount, stayLength, priceConfig.extraGuestFee);
    // console.log('key extraGuestFee: ', extraGuestFee);
    const totalFee = baseFee + extraGuestFee;
    acc[key] = {
      base: baseFee,
      extra: extraGuestFee,
      total: totalFee,
    };
    acc.total += totalFee;
    return acc;
  }, {
    total: 0,
  });
  // console.log('cabinTotals: ', cabinTotals);

  const taxFee = parseFloat(getTax(cabinTotals.total, priceConfig.taxRate));
  // console.log('taxFee: ', taxFee);

  const totalWithTax = cabinTotals.total + taxFee;
  // console.log('totalWithTax: ', totalWithTax);

  const returnVal = {
    cabins: cabinTotals,
    total: cabinTotals.total,
    tax: taxFee,
    totalWithTax: totalWithTax
  }
  // console.log('returnVal: ', returnVal);
  return returnVal;

}
