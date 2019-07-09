import React from 'react';

import {
    Alert,
    KeyboardAvoidingView,
    Image,
    StyleSheet,
    ImageBackground,
    View
} from 'react-native';

import { Text } from '../../components/StyledText';

import Auth0 from 'react-native-auth0';
import LoginForm from './LoginForm';
import imageLogo from "../../../assets/images/white-logo.png";

var auth0credentials = require('../../../auth0-credentials');
const auth0 = new Auth0(auth0credentials);

export default class LoginScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = { viewLogin: true };
        this.realmLogin = this.realmLogin.bind(this);
        this.webAuth = this.webAuth.bind(this);
        //this.createUser = this.createUser.bind(this);
    }

    onSuccess(credentials) {
        auth0.auth
            .userInfo({ token: credentials.accessToken })
            .then(profile => {
                this.props.onLoginSuccess(credentials, profile);
            })
            .catch(error => {
                console.log("error onSuccess");
                console.log(error);
                this.alert('Error', error.json.error_description)
                this.props.onLoginError(error);
            });
    }

    alert(title, message) {
        Alert.alert(
            title,
            message,
            [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
            { cancelable: false }
        );
    }

    realmLogin(username, password) {
        console.log("entro login");
        auth0.auth
            .passwordRealm({
                username: username,
                password: password,
                realm: 'Username-Password-Authentication',
                scope: 'openid profile email',
                audience: 'https://' + auth0credentials.domain + '/userinfo'
            })
            .then(credentials => {
                this.props.onLoginSuccess(credentials);
                this.props.navigation.navigate('App');
            })
            .catch(error => {
                this.alert('Error', error.json.error_description);
                this.props.onLoginError(error);
            });
    }

    // createUser(username, password) {
    //     auth0.auth
    //         .createUser({
    //             email: username,
    //             password: password,
    //             connection: 'Username-Password-Authentication',
    //         })
    //         .then(success => {
    //             console.log(success)
    //             this.alert('Success', 'New user created')
    //         })
    //         .catch(error => {
    //             console.log(error);
    //             this.alert('Error', error.json.description)
    //         });
    // }

    webAuth(connection) {
        auth0.webAuth
            .authorize({
                scope: 'openid profile email',
                connection: connection,
                responseType: 'id_token',
                audience: 'https://' + credentials.domain + '/userinfo'
            })
            .then(credentials => {
                this.onSuccess(credentials);
            })
            .catch(error => this.alert('Error', error.error_description));
    };

    render() {
        let form = null;
        if (this.state.viewLogin) {
            form = <LoginForm realmLogin={this.realmLogin} />;
        } else {
            //form = <SignupForm createUser={this.createUser} />;
        }
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <ImageBackground
                    source={require('../../../assets/images/background.png')}
                    style={styles.bgImage}
                    resizeMode="cover"
                >
                    <View style={styles.section}>
                        <Image source={imageLogo} style={styles.logo} />
                        <Text size={30} bold white style={styles.title}>
                            Welcome to MyBank</Text>
                        <Text size={18} white style={styles.title}>
                            One single place to manage your banks accounts</Text>
                    </View>

                    <View style={styles.formContainer}>
                        {form}
                    </View>
                </ImageBackground>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    bgImage: {
        flex: 1,
        marginHorizontal: -20,
        width: "100%"
    },
    section: {
        flex: 1,
        paddingHorizontal: 2,
        marginTop: 90,
        justifyContent: 'center',
        alignItems: 'center',
    },
    formContainer: {
        flex: 2,
    },
    headerContainer: {
        flex: 1,
        marginTop: 20,
        alignItems: 'center',
        backgroundColor: '#eeeeee',
        justifyContent: 'center',
    },
    socialContainer: {
        flex: 2,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabContainer: {
        flex: 0.5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        borderRadius: 1,
        borderWidth: 0.5,
        borderColor: '#d6d7da',
    },
    socialIcon: {
        marginTop: 10
    },
    title: {
        marginTop: 10,
    },
    logo: {
        flex: 1,
        width: "60%",
        resizeMode: "contain",
        alignSelf: "center"
    }
});