/**
 * Project       - ShaCar
 * Team          - Group 3 Carshare
 * Last Modified - 2018/05/25
 * Authors
 *               - Paul Crow
 *               - Inga Pflaumer
 */
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
