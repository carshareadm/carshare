// Export Constants
export const ON_LOGIN = 'ON_LOGIN';
export const ON_LOGOUT = 'ON_LOGOUT';
export const IS_ADMIN = 'IS_ADMIN';

// Export Actions
export const setLoggedIn = () => {
  return dispatch => {
    dispatch({ type: ON_LOGIN })
  }
}

export const setLoggedOut = () => {
  return dispatch => {
    dispatch({ type: ON_LOGOUT })
  }
}

export const setAdmin = (isAdmin) => {
  return dispatch => {
    dispatch({
      type: IS_ADMIN,
      isAdmin: isAdmin,
    })
  }
}
