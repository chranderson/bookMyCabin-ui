import rootReducer from '../reducers';

import {
  createStore as _createStore,
  applyMiddleware,
  // compose
} from 'redux';
import createMiddleware from '../middleware/clientMiddleware';

export default (client, initialState) => {
  const middleware = [createMiddleware(client)];

  const finalCreateStore = applyMiddleware(...middleware)(_createStore);

  return finalCreateStore(rootReducer, initialState)
};
