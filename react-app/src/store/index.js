import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session'
import profileReducer from './profile';
import mealReducer from './meals';
import calorieReducer from './calories';
import weightReducer from './weightGoal';

const rootReducer = combineReducers({
  session,
  profile:profileReducer,
  meal:mealReducer,
  calorieReducer:calorieReducer || null,
  weightReducer:weightReducer
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
