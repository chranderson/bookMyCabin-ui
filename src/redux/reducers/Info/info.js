const GET_TIME = 'info/GET_TIME';

const initialState = {
  time: new Date().toLocaleTimeString(),
};

export default (state = initialState, action) => {

  switch (action.type) {
    case GET_TIME:
      const time = action.time.slice();
      return {
        ...state,
        time
      };
    default:
      return state;
  }
};

export function getTime() {
  const today = new Date();
  return {
    type: GET_TIME,
    time: today.toLocaleTimeString()
  };
}
