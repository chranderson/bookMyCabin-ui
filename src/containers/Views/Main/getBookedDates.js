Date.prototype.addDays = function(days) {
  var dat = new Date(this.valueOf());
  dat.setDate(dat.getDate() + days);
  return dat;
}

export default function getBookedDates(dateRanges) {

  const createDates = (dateRanges) => {

    return dateRanges.reduce((acc, range) => {

      const start = new Date(range.start);
      const end = new Date(range.end);
      const fullDay = 86400000;
      const stayLength = (end - start) + fullDay;
      const totalDays = (stayLength / fullDay);

      let datesList = [];
      for (let index = 0; index < totalDays; index++) {
        const thisDate = start.addDays(index);
        if (!acc.includes(thisDate)) {
          datesList.push(start.addDays(index).toLocaleDateString());
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
