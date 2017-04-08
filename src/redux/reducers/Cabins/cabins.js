// const GET_CALENDAR = 'calendar/GET_CALENDAR';


const initialState = [
  {
    id: 'cabin1',
    thumbnails: ['https://s3-us-west-2.amazonaws.com/silvertip-cabin-booker/imgs/cabin1-thumb.jpg'],
    imgs: ['https://s3-us-west-2.amazonaws.com/silvertip-cabin-booker/imgs/cabin1.jpeg'],
    url: 'http://silvertiplodgeandcabins.com/tour/cabin-1/',
    booked: [],
    name: 'Cabin 1',
    price: 185.00,
    sleeps: 5
  },
  {
    id: 'cabin2',
    thumbnails: ['https://s3-us-west-2.amazonaws.com/silvertip-cabin-booker/imgs/cabin2-thumb.jpg'],
    imgs: ['https://s3-us-west-2.amazonaws.com/silvertip-cabin-booker/imgs/cabin2.jpeg'],
    url: 'http://silvertiplodgeandcabins.com/tour/cabin-2/',
    booked: [],
    name: 'Cabin 2',
    price: 185.00,
    sleeps: 5
  },
  {
    id: 'cabin3',
    thumbnails: ['https://s3-us-west-2.amazonaws.com/silvertip-cabin-booker/imgs/cabin3-thumb.jpg'],
    imgs: ['https://s3-us-west-2.amazonaws.com/silvertip-cabin-booker/imgs/cabin3.jpeg'],
    url: 'http://silvertiplodgeandcabins.com/tour/cabin-3/',
    booked: [],
    name: 'Cabin 3',
    price: 185.00,
    sleeps: 6
  },
  {
    id: 'cabin4',
    thumbnails: ['https://s3-us-west-2.amazonaws.com/silvertip-cabin-booker/imgs/cabin4-thumb.jpg'],
    imgs: ['https://s3-us-west-2.amazonaws.com/silvertip-cabin-booker/imgs/cabin4.jpeg'],
    url: 'http://silvertiplodgeandcabins.com/tour/cabin-4/',
    booked: [],
    name: 'Cabin 4',
    price: 185.00,
    sleeps: 5
  },
  {
    id: 'cabin5',
    thumbnails: ['https://s3-us-west-2.amazonaws.com/silvertip-cabin-booker/imgs/cabin5-thumb.jpg'],
    imgs: ['https://s3-us-west-2.amazonaws.com/silvertip-cabin-booker/imgs/cabin5.jpeg'],
    url: 'http://silvertiplodgeandcabins.com/tour/cabin-5/',
    booked: [],
    name: 'Cabin 5',
    price: 185.00,
    sleeps: 5
  },
  {
    id: 'cabin7',
    thumbnails: ['https://s3-us-west-2.amazonaws.com/silvertip-cabin-booker/imgs/cabin7-thumb.jpg'],
    imgs: ['https://s3-us-west-2.amazonaws.com/silvertip-cabin-booker/imgs/cabin7.jpeg'],
    url: 'http://silvertiplodgeandcabins.com/tour/cabin-6/',
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
