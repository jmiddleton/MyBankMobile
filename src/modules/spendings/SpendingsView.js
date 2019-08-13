import React from 'react';
import _ from 'lodash';
import moment from 'moment';

import LinearGradient from 'react-native-linear-gradient';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import TabBar from "react-native-underline-tabbar";
import { RadioGroup } from '../../components';

import {
  StyleSheet,
  View,
  Text,
  FlatList,
  RefreshControl,
  Image,
  ScrollView,
} from 'react-native';
import { colors, fonts } from '../../styles';

const monthFormat = "YYYY-MM";

export default class SpendingsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      menuStateIndex: 0,
      selectedMonth: moment().format(monthFormat)
    };
  }

  renderCategories = ({ item }) => (
    <View style={styles.itemThreeContainer}>
      <Image source={categoryConfig[item.category].icon} style={{
        height: 35,
        width: 35,
        marginRight: 10,
        tintColor: categoryConfig[item.category].color
      }} />
      <View style={styles.itemThreeContent}>
        <View style={styles.itemThreeMetaContainer}>
          <Text style={styles.itemThreeTitle} numberOfLines={1}>{item.category}</Text>
          <Text style={styles.itemBalance} numberOfLines={1}>$ {item.totalSpent}</Text>
        </View>
        <View>
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={[categoryConfig[item.category].color, categoryConfig[item.category].color, "#FFFFFF"]}
            style={{ height: 10, borderRadius: 2, width: 15 * (Math.abs(item.totalSpent) / 280) }}>
            <Text>
              {' '}
            </Text>
          </LinearGradient>
        </View>
        <Text style={styles.itemAvBalance} numberOfLines={1}>{item.totalOfTrans} transactions</Text>
      </View>
      <View>

      </View>
    </View>
  );

  render() {
    const menuState = ['Categories', 'Merchants', 'Transactions'];

    const Page = ({ month }) => (
      <View>
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

    const pages = [];
    let i = 4;
    let month= moment();
    while (i >= 0 ) {
      month = moment().subtract(i, 'month');
      pages.push((<Page key={i} tabLabel={{ label: month.format('MMMM') }} month={month.format(monthFormat)} />));
      i--;
    }

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
          {pages}
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
    fontFamily: fonts.primaryBold,
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
    height: 35,
    width: 35,
    marginRight: 10
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
    fontSize: 14,
    color: '#5F5F5F',
    padding: 5
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
  },
  linearGradient: {
    borderRadius: 5,
  },
});

const categoryConfig = {
  'Business': { icon: require('../../../assets/categories/Business.png'), color: "#ffc247" },
  'Cash': { icon: require('../../../assets/categories/Cash.png'), color: "#1EC9E8" },
  'Donations': { icon: require('../../../assets/categories/Donations.png'), color: "#9964e3" },
  'EatingOut': { icon: require('../../../assets/categories/EatingOut.png'), color: "#78c448" },
  'Education': { icon: require('../../../assets/categories/Education.png'), color: "#547fff" },
  'Entertainment': { icon: require('../../../assets/categories/Entertainment.png'), color: "#17a2b8" },
  'FeesAndInterest': { icon: require('../../../assets/categories/FeesAndInterest.png'), color: "#E4A537" },
  'General': { icon: require('../../../assets/categories/General.png'), color: "#B62070" },
  'Groceries': { icon: require('../../../assets/categories/Groceries.png'), color: "#A7B620" },
  'Health': { icon: require('../../../assets/categories/Health.png'), color: "#20B6B6" },
  'Housing': { icon: require('../../../assets/categories/Housing.png'), color: "#ffc247" },
  'Income': { icon: require('../../../assets/categories/Income.png'), color: "#ffc247" },
  'Others': { icon: require('../../../assets/categories/Others.png'), color: "#ffc247" },
  'PersonalCare': { icon: require('../../../assets/categories/PersonalCare.png'), color: "#ffc247" },
  'Shopping': { icon: require('../../../assets/categories/Shopping.png'), color: "#FF7272" },
  'Transfers': { icon: require('../../../assets/categories/Transfers.png'), color: "#ffc247" },
  'Transport': { icon: require('../../../assets/categories/Transport.png'), color: "#CE3D1D" },
  'Travel': { icon: require('../../../assets/categories/Travel.png'), color: "#9964e3" },
  'Uncategorized': { icon: require('../../../assets/categories/Uncategorized.png'), color: "#D7E1E9" },
  'Utilities': { icon: require('../../../assets/categories/Utilities.png'), color: "#ffc247" },
}
