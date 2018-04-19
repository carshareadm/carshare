/**
 * Root Reducer
 */
import { combineReducers } from 'redux';

// Import Reducers
import auth from './infrastructure/AuthReducer';

// Combine all reducers into one root reducer
export default combineReducers({
  auth,
});
