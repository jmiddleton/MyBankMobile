import { connect } from 'react-redux';
import { compose } from 'recompose';

import { onLoginSuccess, onLoginError } from './AuthState';

import LoginScreen from './LoginView';

export default compose(
    connect(
        state => ({
            isLoggedIn: state.auth.isLoggedIn,
        }),
        dispatch => ({
            onLoginSuccess: (credentials, profile) => dispatch(onLoginSuccess(credentials, profile)),
            onLoginError: (error) => dispatch(onLoginError(error))
        }),
    ),
)(LoginScreen);
