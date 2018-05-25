/**
 * Project       - ShaCar
 * Team          - Group 3 Carshare
 * Last Modified - 2018/05/25
 * Authors
 *               - Paul Crow
 */
// Import Actions
import { ON_LOGIN, ON_LOGOUT, IS_ADMIN } from './AuthActions'; // import actions here

// Initial State
const initialState = {
  loggedIn: false,
  isAdmin: false,
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case ON_LOGIN:
      return {...state, loggedIn: true};
    case ON_LOGOUT:
      return {...state, loggedIn: false};
    case IS_ADMIN:
      return {...state, isAdmin: action.isAdmin};

    default:
      return state;
  }
};

// Export Reducer
export default AuthReducer;