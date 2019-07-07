import React from 'react';
import { VictoryBar, VictoryChart } from 'victory-native';

import {
    StyleSheet,
    View,
    Text,
} from 'react-native';
import { fonts } from '../../styles';

export const colors = ["#ffc247", "#f55d5d", "#547fff"];

export default class CashflowScreen extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>CASHFLOW</Text>
                <VictoryChart domainPadding={{x:30, y: 10}} viewBox="0 0 230 230"
                width={350} height={230}>
                    <VictoryBar
                        data={this.props.cashflow}
                        style={{ data: { fill: (d) => d.x == "Incomes" ? colors[0] : d.x == "Savings" ? colors[2] : colors[1] } }}
                        barWidth={50}
                        animate={{ duration: 200 }}
                    />
                </VictoryChart>
            </View>
        );
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
        fontSize: 18,
    }
});