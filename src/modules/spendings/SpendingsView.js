import React from 'react';
import _ from 'lodash';

import ScrollableTabView from 'react-native-scrollable-tab-view';
import TabBar from "react-native-underline-tabbar";
import { Button, RadioGroup, Dropdown } from '../../components';

import {
  StyleSheet,
  View,
  Text,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { colors, fonts } from '../../styles';

export default class SpendingsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      menuStateIndex: 0,
      selectedMonth: "2019-07"
    };
  }

  renderCategories = ({ item }) => (
    <View style={styles.itemThreeContainer}>
      <Image source={categoryIcon[item.category]} style={styles.categoryIcon} />
      <View style={styles.itemThreeContent}>
        <Text style={styles.itemThreeTitle} numberOfLines={1}>{item.category}</Text>
      </View>
      <View>
        <Text style={styles.itemBalance} numberOfLines={1}>$ {item.totalSpent}</Text>
        <Text style={styles.itemAvBalance} numberOfLines={1}>{item.totalOfTrans} transactions</Text>
      </View>
    </View>
  );

  render() {
    const menuState = ['Categories', 'Merchants', 'Transactions'];

    const Page = ({ month }) => (
      <View style={styles.container}>
        <FlatList
          keyExtractor={item =>
            item.category
              ? `${this.state.menuStateIndex}-${item.category}`
              : `${item[0] && item[0].category}`
          }
          style={{ backgroundColor: colors.white }}
          data={this._getDataFilteredByMonth(month, this.props.spendings)}
          renderItem={this._getRenderItem()}
        />
      </View>
    );

    return (
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />
        } >
        <RadioGroup
          style={styles.demoItem}
          items={menuState}
          selectedIndex={this.state.menuStateIndex}
          onChange={this._onMenuChange}
        />

        <ScrollableTabView
          initialPage={4}
          tabBarActiveTextColor="#53ac49"
          renderTabBar={() => <TabBar underlineColor="#53ac49"
            tabMargin={45} tabStyles={styles.tabStyle} />}>
          <Page tabLabel={{ label: "April" }} month="2019-04" />
          <Page tabLabel={{ label: "May" }} month="2019-05" />
          <Page tabLabel={{ label: "June" }} month="2019-06" />
          <Page tabLabel={{ label: "July" }} month="2019-07" />
        </ScrollableTabView>

      </ScrollView>
    );
  }

  _onRefresh = () => {
    this.setState({ refreshing: true });
    this.props.loadSpendings().then(() => {
      this.setState({ refreshing: false });
    });
  }
  _onMenuChange = (index) => {
    this.setState({ menuStateIndex: index });
  }
  _getRenderItem = () =>
    // [this.renderCategories, this.renderMerchants, this.renderTransactions][
    [this.renderCategories][
    this.state.menuStateIndex
    ];

  _getDataFilteredByMonth(month, rawData) {
    const data = _.filter(rawData, function (s) {
      return s.month.startsWith(month);
    });
    return data;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 0,
  },
  tabsContainer: {
    alignSelf: 'stretch',
    marginTop: 30,
  },
  productCategory: {
    fontFamily: fonts.primaryRegular,
    fontSize: 18,
    marginTop: 20
  },
  itemOneTitle: {
    fontFamily: fonts.primaryRegular,
    fontSize: 15,
    color: '#B2B2B2',
  },
  itemBalance: {
    fontFamily: fonts.primaryRegular,
    fontSize: 15,
    textAlign: 'right',
    marginRight: 2
  },
  itemAvBalance: {
    fontFamily: fonts.primaryRegular,
    fontSize: 13,
    color: '#B2B2B2',
    textAlign: 'right',
    marginRight: 2
  },
  itemOneSubTitle: {
    fontFamily: fonts.primaryRegular,
    fontSize: 12,
    color: '#B2B2B2',
    marginVertical: 1,
  },
  itemOnePrice: {
    fontFamily: fonts.primaryRegular,
    fontSize: 15,
    textAlign: 'right',
    marginRight: 20
  },
  itemOneRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  itemThreeContainer: {
    backgroundColor: 'white',
    marginTop: 5,
    marginBottom: 10,
    flexDirection: 'row',
    paddingVertical: 5,
  },
  categoryIcon: {
    height: 30,
    width: 30,
  },
  itemThreeContent: {
    flex: 1,
    paddingLeft: 5,
    justifyContent: 'space-between',
  },
  itemThreeBrand: {
    fontFamily: fonts.primaryRegular,
    fontSize: 14,
    color: '#617ae1',
  },
  itemThreeTitle: {
    fontFamily: fonts.primaryRegular,
    fontSize: 16,
    color: '#5F5F5F',
  },
  itemThreeSubtitle: {
    fontFamily: fonts.primaryRegular,
    fontSize: 12,
    color: '#a4a4a4',
  },
  itemThreeMetaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  demoItem: {
    marginVertical: 15,
  },
  tabStyle: {
    width: 90
  }
});

const categoryIcon = {
  'Business': require('../../../assets/categories/Business.png'),
  'Cash': require('../../../assets/categories/Cash.png'),
  'Donations': require('../../../assets/categories/Donations.png'),
  'EatingOut': require('../../../assets/categories/EatingOut.png'),
  'Education': require('../../../assets/categories/Education.png'),
  'Entertainment': require('../../../assets/categories/Entertainment.png'),
  'FeesAndInterest': require('../../../assets/categories/FeesAndInterest.png'),
  'General': require('../../../assets/categories/General.png'),
  'Groceries': require('../../../assets/categories/Groceries.png'),
  'Health': require('../../../assets/categories/Health.png'),
  'Housing': require('../../../assets/categories/Housing.png'),
  'Income': require('../../../assets/categories/Income.png'),
  'Others': require('../../../assets/categories/Others.png'),
  'PersonalCare': require('../../../assets/categories/PersonalCare.png'),
  'Shopping': require('../../../assets/categories/Shopping.png'),
  'Transfers': require('../../../assets/categories/Transfers.png'),
  'Transport': require('../../../assets/categories/Transport.png'),
  'Travel': require('../../../assets/categories/Travel.png'),
  'Uncategorized': require('../../../assets/categories/Uncategorized.png'),
  'Utilities': require('../../../assets/categories/Utilities.png'),
}
