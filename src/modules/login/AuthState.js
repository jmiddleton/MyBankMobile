import { AsyncStorage } from 'react-native';
import axios from 'axios';

// Initial state
const initialState = {
  isLoggedIn: false,
  currentUser: null,
  authenticationToken: null
};

// Actions
const USER_LOGIN_SUCCESS = 'AuthState/USER_LOGIN_SUCCESS';
const USER_LOGIN_ERROR = 'AuthState/USER_LOGIN_ERROR';

export function onLoginSuccess(credentials, profile) {
  console.log(credentials);
  return {
    type: USER_LOGIN_SUCCESS,
    payload: {
      userToken: credentials,
      userProfile: profile
    }
  };
}

export function onLoginError(error) {
  console.log(error);
  return {
    type: USER_LOGIN_ERROR,
    payload: error,
    error: true
  };
}

// Reducer
export default async function AuthStateReducer(state = initialState, action = {}) {
  switch (action.type) {
    case USER_LOGIN_SUCCESS:
      const userToken= action.payload.userToken;
      AsyncStorage.setItem('userToken', userToken);
      //AsyncStorage.setItem('userProfile', action.payload.userProfile);

      axios.defaults.headers.common["Authorization"] = userToken.tokenType + " " + userToken.idToken;  

      return Object.assign({}, state, {
        currentUser: action.payload.currentUser,
        userToken: action.payload.userToken
      });
    case USER_LOGIN_ERROR:
      await AsyncStorage.removeItem('userToken');
      return initialState;
    default:
      return state;
  }
}