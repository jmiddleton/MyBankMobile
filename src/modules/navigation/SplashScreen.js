import React from 'react';

import {
    Image,
    StyleSheet,
    ImageBackground,
    View,
    Text
} from 'react-native';

import imageLogo from "../../../assets/images/white-logo.png";

class SplashScreen extends React.Component {
    performTimeConsumingTask = async () => {
        return new Promise((resolve) =>
            setTimeout(
                () => { resolve('result') },
                200
            )
        )
    }

    async componentDidMount() {
        // Preload data from an external API
        // Preload data using AsyncStorage
        const data = await this.performTimeConsumingTask();

        if (data !== null) {
            this.props.navigation.navigate('App');
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <ImageBackground
                    source={require('../../../assets/images/background.png')}
                    style={styles.bgImage}
                    resizeMode="cover"
                >
                    <View style={styles.section}>
                        <Image source={imageLogo} style={styles.logo} />
                    </View>

                    <View style={styles.formContainer}>
                    </View>
                </ImageBackground>
            </View>
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

export default SplashScreen;