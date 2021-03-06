/* eslint-disable import/no-unresolved */
import React from 'react';
import { Image, View, StyleSheet, Text } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';
import { colors, fonts } from '../../styles';

import DashboardScreen from '../home/DashboardViewContainer';
import AccountsScreen from '../accounts/AccountsViewContainer';
import GridsScreen from '../grids/GridsViewContainer';
import SpendingsScreen from '../spendings/SpendingsViewContainer';
import ComponentsScreen from '../components/ComponentsViewContainer';

const iconHome = require('../../../assets/images/tabbar/home2.png');
const iconAccounts = require('../../../assets/images/tabbar/wallet.png');
const iconGrids = require('../../../assets/images/tabbar/transfer.png');
const iconSpendings = require('../../../assets/images/tabbar/transaction-list.png');
const iconComponents = require('../../../assets/images/tabbar/components.png');

const headerBackground = require('../../../assets/images/topBarBg.png');

const styles = StyleSheet.create({
  tabBarItemContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 2,
    borderBottomColor: colors.white,
    paddingHorizontal: 10,
  },
  tabBarIcon: {
    width: 23,
    height: 23,
    tintColor: colors.lightGray,
  },
  tabBarIconFocused: {
    tintColor: colors.black,
  },
  headerContainer: {
    height: 70,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 10,
  },
  headerImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: 70,
  },
  headerCaption: {
    fontFamily: fonts.primaryRegular,
    color: colors.white,
    fontSize: 18,
  },
});

const TabNavigator = createBottomTabNavigator(
  {
    Dashboard: {
      screen: DashboardScreen
    },
    Accounts: {
      screen: AccountsScreen
    },
    Payments: {
      screen: GridsScreen
    },
    Spendings: {
      screen: SpendingsScreen
    },
    Others: {
      screen: ComponentsScreen
    }
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        let iconSource;
        switch (routeName) {
          case 'Dashboard':
            iconSource = iconHome;
            break;
          case 'Accounts':
            iconSource = iconAccounts;
            break;
          case 'Payments':
            iconSource = iconGrids;
            break;
          case 'Spendings':
            iconSource = iconSpendings;
            break;
          case 'Others':
            iconSource = iconComponents;
            break;
          default:
            iconSource = iconComponents;
        }
        return (
          <View style={styles.tabBarItemContainer}>
            <Image
              resizeMode="contain"
              source={iconSource}
              style={[styles.tabBarIcon, focused && styles.tabBarIconFocused]}
            />
          </View>
        );
      },
    }),
    tabBarPosition: 'bottom',
    animationEnabled: true,
    swipeEnabled: false,
    tabBarOptions: {
      showLabel: true,
      style: {
        backgroundColor: colors.white,
        borderTopWidth: 0.5,
        borderTopColor: '#d6d6d6'
      },
      activeTintColor: '#000',
      labelStyle: {
        fontSize: 12,
      },
    },
  },
);

TabNavigator.navigationOptions = ({ navigation }) => {
  const { routeName } = navigation.state.routes[navigation.state.index];

  const headerTitle = routeName;
  return {
    header: (
      <View style={styles.headerContainer}>
        <Image style={styles.headerImage} source={headerBackground} />
        <Text style={styles.headerCaption}>{headerTitle}</Text>
      </View>
    )
  };
};

export default TabNavigator;