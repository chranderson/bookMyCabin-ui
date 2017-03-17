// const GET_CALENDAR = 'calendar/GET_CALENDAR';


const initialState = [
  {
    id: 'cabin1',
    imgs: ['http://silvertiplodgeandcabins.com/wp-content/themes/midway/framework/extensions/timthumb/timthumb.php?src=http://silvertiplodgeandcabins.com/wp-content/uploads/2016/06/cabin-1-outside.jpg&w=527'],
    booked: [],
    name: 'Cabin 1',
    price: 185.00,
    sleeps: 5
  },
  {
    id: 'cabin2',
    imgs: ['http://silvertiplodgeandcabins.com/wp-content/themes/midway/framework/extensions/timthumb/timthumb.php?src=http://silvertiplodgeandcabins.com/wp-content/uploads/2016/06/cabin-2-outside.jpg&w=527'],
    booked: [],
    name: 'Cabin 2',
    price: 185.00,
    sleeps: 5
  },
  {
    id: 'cabin3',
    imgs: ['http://silvertiplodgeandcabins.com/wp-content/themes/midway/framework/extensions/timthumb/timthumb.php?src=http://silvertiplodgeandcabins.com/wp-content/uploads/2016/06/cabin-3-outside.jpg&w=527'],
    booked: [],
    name: 'Cabin 3',
    price: 185.00,
    sleeps: 6
  },
  {
    id: 'cabin4',
    imgs: ['http://silvertiplodgeandcabins.com/wp-content/themes/midway/framework/extensions/timthumb/timthumb.php?src=http://silvertiplodgeandcabins.com/wp-content/uploads/2016/06/cabin-4-outside.jpg&w=527'],
    booked: [],
    name: 'Cabin 4',
    price: 185.00,
    sleeps: 5
  },
  {
    id: 'cabin5',
    imgs: ['http://silvertiplodgeandcabins.com/wp-content/themes/midway/framework/extensions/timthumb/timthumb.php?src=http://silvertiplodgeandcabins.com/wp-content/uploads/2016/06/cabin-5-outside.jpg&w=527'],
    booked: [],
    name: 'Cabin 5',
    price: 185.00,
    sleeps: 5
  },
  {
    id: 'cabin7',
    imgs: ['http://silvertiplodgeandcabins.com/wp-content/themes/midway/framework/extensions/timthumb/timthumb.php?src=http://silvertiplodgeandcabins.com/wp-content/uploads/2016/06/cabin-7-outside.jpg&w=527'],
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
