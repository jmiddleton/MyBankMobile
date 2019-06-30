import React from 'react';
import _ from 'lodash';

import {
  StyleSheet,
  View,
  Text,
  SectionList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { colors, fonts } from '../../styles';

const bankIcon = {
  'cba': require('../../../assets/banks/cba.png'),
  'citi': require('../../../assets/banks/citi.png'),
  'mebank': require('../../../assets/banks/mebank.png'),
  'anz': require('../../../assets/banks/anz.png'),
  'hsbc': require('../../../assets/banks/hsbc.png'),
  'rabobank': require('../../../assets/banks/rabobank.png'),
  'westpac': require('../../../assets/banks/westpac.png'),
  'undefined': require('../../../assets/banks/undefined.png'),
  'macquarie': require('../../../assets/banks/macquarie.png')
}

const categoriesMap = new Map();
categoriesMap.set("TRANS_AND_SAVINGS_ACCOUNTS", "Saving Accounts");
categoriesMap.set("CRED_AND_CHRG_CARDS", "Credit Cards");
categoriesMap.set("TERM_DEPOSITS", "Term Deposits");
categoriesMap.set("PERS_LOANS", "Personal Loans");
categoriesMap.set("MARGIN_LOANS", "Margin Loans");
categoriesMap.set("TRAVEL_CARDS", "Travel Cards");
categoriesMap.set("REGULATED_TRUST_ACCOUNTS", "Trust Accounts");
categoriesMap.set("RESIDENTIAL_MORTGAGES", "Mortgages");
categoriesMap.set("LEASES", "Leases");
categoriesMap.set("TRADE_FINANCE", "Trades");

export default function AccountsScreen(props) {

  showAccountDetails = account => {
    this.props.navigation.navigate({
      routeName: 'AccountDetails',
      params: { ...account },
    });
  };

  renderItem = ({ item }) => (
    <TouchableOpacity
      key={item.accountId}
      style={styles.itemThreeContainer}
      onPress={() => this.showAccountDetails(item)}
    >
      <View style={styles.itemThreeSubContainer}>
        <Image source={bankIcon[item.institution]} style={styles.itemThreeImage} />
        <View style={styles.itemThreeContent}>
          <Text style={styles.itemThreeTitle} numberOfLines={1}>{item.nickname}</Text>
          <View>
            <Text style={styles.itemOneTitle}>{item.maskedNumber}</Text>
          </View>
          <View style={styles.itemThreeMetaContainer}>
            <Text style={styles.itemOneSubTitle} numberOfLines={1}>Updated 3 days ago</Text>

          </View>
        </View>

        <View>
          <Text style={styles.itemBalance} numberOfLines={1}>$ {item.currentBalance}</Text>
          <Text style={styles.itemAvBalance} numberOfLines={1}>$ {item.availableBalance}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  renderSeparator = () => {
    return (<View
      style={{
        height: 1,
        backgroundColor: "#CED0CE",
      }}
    />)
  };

  const categories = _.uniq(_.map(props.accounts, 'productCategory'));
  const sections = [];
  for (let index = 0; index < categories.length; index++) {
    const cat = categories[index];
    const filteredAccounts = _.filter(props.accounts, ['productCategory', cat]);

    sections.push({ title: categoriesMap.get(cat), data: filteredAccounts });
  }

  return (
    <View>
      <SectionList
        sections={sections}
        renderSectionHeader={({ section }) => <Text style={styles.productCategory}> {section.title} </Text>}
        renderItem={this.renderItem}
        keyExtractor={item => item.accountId}
        onRefresh={() => props.loadAccounts()}
        refreshing={props.accounts.length === 0 && props.isLoading}
        style={{paddingHorizontal: 15 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  },
  itemThreeSubContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  itemThreeImage: {
    height: 40,
    width: 40,
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
    fontFamily: fonts.primaryBold,
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
});
