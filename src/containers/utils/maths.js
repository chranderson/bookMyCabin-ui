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
  const tax = (total - lessTax).toFixed(2);
  return parseFloat(tax);
}

export function getCabinTotals(reservation, cabinDetails, priceConfig) {
  const cabinReservation = reservation.cabins;
  const cabinKeys = Object.keys(cabinReservation);

  const cabinTotals = cabinKeys.reduce((acc, key) => {
    const thisCabin = cabinDetails.filter(cbn => cbn.id === key)[0];
    const stayLength = cabinReservation[key].dates.length;
    // console.log('guestCount: ', cabinReservation[key]);
    const guestCount = cabinReservation[key].guests;
    // console.log('guestCount: ', guestCount);
    const baseFee = thisCabin.price * stayLength;

    const extraGuestFee = getExtraGuestFee(guestCount, stayLength, priceConfig.extraGuestFee);
    // console.log('key extraGuestFee: ', extraGuestFee);
    const totalFee = baseFee + extraGuestFee;
    acc[key] = {
      base: baseFee,
      extraGuestFee: extraGuestFee,
      total: totalFee,
    };
    acc.total += totalFee;
    return acc;
  }, {
    total: 0,
  });

  const taxFee = getTax(cabinTotals.total, priceConfig.taxRate);
  // console.log('taxFee: ', taxFee);

  const totalWithTax = cabinTotals.total + taxFee;
  // console.log('totalWithTax: ', totalWithTax);

  return {
    cabins: cabinTotals,
    total: cabinTotals.total,
    tax: taxFee,
    totalWithTax: totalWithTax
  }

}
