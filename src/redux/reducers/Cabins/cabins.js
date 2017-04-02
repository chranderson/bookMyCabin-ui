// const GET_CALENDAR = 'calendar/GET_CALENDAR';


const initialState = [
  {
    id: 'cabin1',
    imgs: ['https://s3-us-west-2.amazonaws.com/silvertip-cabin-booker/imgs/cabin1.jpeg'],
    booked: [],
    name: 'Cabin 1',
    price: 185.00,
    sleeps: 5
  },
  {
    id: 'cabin2',
    imgs: ['https://s3-us-west-2.amazonaws.com/silvertip-cabin-booker/imgs/cabin2.jpeg'],
    booked: [],
    name: 'Cabin 2',
    price: 185.00,
    sleeps: 5
  },
  {
    id: 'cabin3',
    imgs: ['https://s3-us-west-2.amazonaws.com/silvertip-cabin-booker/imgs/cabin3.jpeg'],
    booked: [],
    name: 'Cabin 3',
    price: 185.00,
    sleeps: 6
  },
  {
    id: 'cabin4',
    imgs: ['https://s3-us-west-2.amazonaws.com/silvertip-cabin-booker/imgs/cabin4.jpeg'],
    booked: [],
    name: 'Cabin 4',
    price: 185.00,
    sleeps: 5
  },
  {
    id: 'cabin5',
    imgs: ['https://s3-us-west-2.amazonaws.com/silvertip-cabin-booker/imgs/cabin5.jpeg'],
    booked: [],
    name: 'Cabin 5',
    price: 185.00,
    sleeps: 5
  },
  {
    id: 'cabin7',
    imgs: ['https://s3-us-west-2.amazonaws.com/silvertip-cabin-booker/imgs/cabin7.jpeg'],
    booked: [],
    name: 'Cabin 7',
    price: 185.00,
    sleeps: 4
  }
];

export default (state = initialState, action) => {

  switch (action.type) {
    // case GET_CALENDAR:
    //   return {
    //     ...state,
    //   };
    default:
      return state;
  }
};

// export function getCalendar() {
//   return {
//     type: GET_CALENDAR,
//   };
// }
