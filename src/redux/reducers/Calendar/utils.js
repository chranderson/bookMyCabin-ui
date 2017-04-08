// formatDate output: 3/3/17
export function formatDate(ogDate) {
  const date = new Date(ogDate);
  return `${date.toLocaleDateString().slice(0, -5)}/${date.toLocaleDateString().slice(-2)}`;
}
// getWeek output: ['3/14/17', ...]
export function getWeek(start) {
   let week = [];
   for (let index = 0; index < 7; index++) {
     const date = start ? new Date(start) : new Date();
     week.push(formatDate(date.setDate(date.getDate() + index)));
   }
   return week;
};

export function getDays(start, count, type) {
   let days = [];
   for (let index = 0; index < count; index++) {
     const date = new Date(start);
     let thisDate;
     if (type === 'previous') {
       thisDate = (date.getDate() - (index + 1));
     } else if (type === 'now') {
       thisDate = (date.getDate() + index);
     } else if (type === 'future') {
       thisDate = (date.getDate() + (index + 1));
     }
     days.push(formatDate(date.setDate(thisDate)));
   }
   return days;
};


const addDays = (start, days) => {
  var dat = new Date(start);
  dat.setDate(dat.getDate() + days);
  return dat;
}

export function getBookedDates(dateRanges) {

  const createDates = (dateRanges) => {

    return dateRanges.reduce((acc, range) => {

      const start = new Date(range.start);
      const end = new Date(range.end);
      const fullDay = 86400000;
      const stayLength = (end - start) + fullDay;
      const totalDays = (stayLength / fullDay);
      let datesList = [];
      for (let index = 1; index < totalDays + 1; index++) {
        const thisDate = addDays(start, index);
        if (!acc.includes(thisDate)) {
          datesList.push(formatDate(addDays(start, index)));
        }
      }

      return [...acc, ...datesList];
    }, []);
  };

  const sort = (dates) => dates.sort((dateA, dateB) => dateA < dateB ? -1 : 1);

  const parsedCalendar = {
    id: 'cabin1',
    booked: sort(createDates(dateRanges))
  };

  return parsedCalendar.booked;
}


export function getUpdatedBookings(cabinId, dates, bookings) {
  return Object.keys(bookings).reduce((acc, key) => {
    const accCopy = Object.assign({}, acc);
    if (key === cabinId) {
      accCopy[key] = dates
    } else {
      accCopy[key] = bookings[key];
    }
    return accCopy;
  }, {});
};
