import React from 'react';
import BalancesScreen from './BalancesView';
import CashflowScreen from './CashflowView';
import SpendingsScreen from './SpendingsView';

import {
    StyleSheet,
    View,
    ScrollView,
    RefreshControl
} from 'react-native';

export default class DashboardScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
        };
    }

    _onRefresh = () => {
        this.setState({ refreshing: true });
        this.props.loadBalances().then(() => {
            this.setState({ refreshing: false });
        });
        this.props.loadCashflow().then(() => {
            this.setState({ refreshing: false });
        });
        this.props.loadSpendings().then(() => {
            this.setState({ refreshing: false });
        });
    }

    render() {
        return (
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh}
                    />
                } >
                <View style={styles.container}>
                    <BalancesScreen balances={this.props.balances} />
                </View>
                <View style={styles.container}>
                    <CashflowScreen cashflow={this.props.cashflow} />
                </View>
                <View style={styles.container}>
                    <SpendingsScreen spendings={this.props.spendings} />
                </View>
            </ScrollView>
        );
    }
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f7ff',
        alignItems: 'center',
    }
});