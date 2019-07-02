import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { createAppContainer, createStackNavigator } from 'react-navigation';

import LoginScreen from '../login/LoginViewContainer';
import MainTabNavigator from './MainTabNavigator';

import { colors, fonts } from '../../styles';

const headerBackground = require('../../../assets/images/topBarBg.png');

const stackNavigator = createStackNavigator(
  {
    Login: {
      screen: LoginScreen,
      navigationOptions: {
        header: null,
      },
    },
    Main: {
      screen: MainTabNavigator,
      navigationOptions: () => ({
        title: 'MyBank',
        headerLeft: null,
        headerBackground: (
          <Image
            style={{ flex: 1 }}
            source={headerBackground}
            resizeMode="cover"
          />
        ),
      }),
    },
  },
  {
    defaultNavigationOptions: () => ({
      titleStyle: {
        fontFamily: fonts.primaryLight,
      },
      headerStyle: {
        backgroundColor: colors.primary,
        borderBottomWidth: 0,
      },
      headerBackground: (
        <Image
          style={{ flex: 1 }}
          source={headerBackground}
          resizeMode="cover"
        />
      ),
      headerTitleStyle: {
        color: colors.white,
        fontFamily: fonts.primaryRegular,
      },
      headerTintColor: '#222222',
      headerLeft: props => (
        <TouchableOpacity
          onPress={props.onPress}
          style={{
            paddingLeft: 25,
          }}
        >
          <Image
            source={require('../../../assets/images/icons/arrow-back.png')}
            resizeMode="contain"
            style={{
              height: 20,
            }}
          />
        </TouchableOpacity>
      ),
    }),
  },
);

export default createAppContainer(stackNavigator);
