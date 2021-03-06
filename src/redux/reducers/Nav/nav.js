const UPDATE_VIEW = 'nav/UPDATE_VIEW';

const initialState = {
  currentView: 'main',
  views: [
    'main',
    'review',
    'contact',
    'confirm',
    'submit',
    'error',
    'success',
  ],
};

export default (state = initialState, action) => {

  switch (action.type) {
    case UPDATE_VIEW:
      return {
        ...state,
        currentView: action.view
      };
    default:
      return state;
  }
};

export function updateView(view) {
  return {
    type: UPDATE_VIEW,
    view
  };
}
