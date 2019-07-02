import React from 'react';

import {
    StyleSheet,
    View,
} from 'react-native';

import { Button, TextInput } from '../../components';

export default class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { username: "", password: "", usernameError: false, passwordError: false }
    }

    validateLogin = () => {
        usernameError = false
        passwordError = false

        if (!this.state.username.length) {
            usernameError = true
        }
        if (!this.state.password.length) {
            passwordError = true
        }
        this.setState({ usernameError: usernameError, passwordError: passwordError })
        if (usernameError === false && passwordError === false) {
            this.props.realmLogin(this.state.username, this.state.password)
        }
    }

    render() {
        return (
            <View style={styles.form}>
                <TextInput
                    onChangeText={(text) => this.setState({ username: text.trim() })}
                    placeholder="Username"
                    style={[styles.inputText, this.state.usernameError && styles.inputError]}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                />
                <TextInput
                    secureTextEntry
                    returnKeyType="go"
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={[styles.inputText, this.state.passwordError && styles.inputError]}
                    onChangeText={(text) => this.setState({ password: text.trim() })}
                    placeholder="Password"
                />
                <Button
                    style={styles.demoButton}
                    primary
                    bordered
                    rounded
                    caption="Login"
                    onPress={() => this.validateLogin()}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    form: {
        flex: 1,
        paddingHorizontal: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    demoButton: {
        marginTop: 30,
        marginBottom: 8,
    },
    inputText: {
        marginTop: 15,
        fontSize: 18
    },
    inputError: {
        borderColor: '#ff0000'
    },

});
