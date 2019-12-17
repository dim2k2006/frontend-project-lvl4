import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import reducer from '../reducers';

const configureStore = (initialState) => {
  const middlewares = [thunk];

  if (process.env.NODE_ENV === 'development') {
    const logger = createLogger({ collapsed: true, diff: true });

    middlewares.push(logger);
  }

  return createStore(
    reducer,
    initialState,
    composeWithDevTools(
      applyMiddleware(...middlewares),
    ),
  );
};

export default configureStore;
