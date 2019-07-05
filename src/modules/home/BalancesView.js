import React from 'react';

import {
    StyleSheet,
    View,
    Text,
    Image,
} from 'react-native';
import {  fonts } from '../../styles';

export default class BalancesScreen extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>TOTAL BALANCE</Text>
                <Text></Text>
                <View style={styles.metaContainer}>
                    <Image source={require('../../../assets/images/dollar.png')} style={styles.itemThreeImage} />
                    <Text style={styles.mainBalance}>$ {this.getBalance("TRANS_AND_SAVINGS_ACCOUNTS")}</Text>
                </View>
                <Text></Text>
                <View style={styles.metaContainer}>
                    <Text style={styles.subTitle}>Deposits</Text>
                    <Text style={styles.subTitle}>Available</Text>
                </View>
                <View style={styles.metaContainer}>
                    <Text style={styles.balance}>$ {this.getBalance("TERM_DEPOSITS")}</Text>
                    <Text style={styles.balance}>$ {this.getAvailable("TRANS_AND_SAVINGS_ACCOUNTS")}</Text>
                </View>
                <View style={styles.metaContainer}>
                    <Text style={styles.subTitle}>Loans</Text>
                    <Text style={styles.subTitle}>Credit Limit</Text>
                </View>
                <View style={styles.metaContainer}>
                    <Text style={styles.balance}>$ {this.loansBalance()}</Text>
                    <Text style={styles.balance}>$ {this.getAvailable("CRED_AND_CHRG_CARDS")}</Text>
                </View>
            </View>
        );
    }

    getBalance(type) {
        if (this.props.balances && this.props.balances[type]) {
            return this.props.balances[type].balance;
        }
        return 0;
    }
    getAvailable(type) {
        if (this.props.balances && this.props.balances[type]) {
            return this.props.balances[type].available;
        }
        return 0;
    }
    loansBalance() {
        let total = 0;
        if (this.props.balances && this.props.balances["PERS_LOANS"]) {
            total = this.props.balances["PERS_LOANS"].balance;
        }
        if (this.props.balances && this.props.balances["MARGIN_LOANS"]) {
            total = total + this.props.balances["MARGIN_LOANS"].balance;
        }
        return total;
    }
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        position: 'relative',
        height: 230,
        width: '93%',
        paddingBottom: 2,
        backgroundColor: 'white',
        marginVertical: 10,
    },
    title: {
        fontFamily: fonts.primaryLight,
        fontSize: 18
    },
    metaContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 2,
    },
    subTitle: {
        fontFamily: fonts.primaryRegular,
        fontSize: 16,
        marginVertical: 5,
    },
    balance: {
        fontFamily: fonts.primarySemiBold,
        fontSize: 18,
    },
    mainBalance: {
        fontFamily: fonts.primarySemiBold,
        fontSize: 30,
    },
    itemThreeImage: {
        height: 50,
        width: 50,
    },
});