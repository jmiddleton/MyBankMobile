import React from 'react';
import { BarChart, Grid, XAxis, YAxis } from 'react-native-svg-charts';
import * as scale from 'd3-scale';

import {
    StyleSheet,
    View,
    Text,
} from 'react-native';
import { fonts } from '../../styles';

export const colors = ["#ffc247", "#f55d5d", "#547fff"];

export default class CashflowScreen extends React.Component {

    render() {
        const axesSvg = { fontSize: 10, fill: 'grey' };
        const verticalContentInset = { top: 0, bottom: 10 }
        const xAxisHeight = 15
        const chartData = [];

        if (this.props.cashflow) {
            for (let index = 0; index < this.props.cashflow.length; index++) {
                let s = this.props.cashflow[index];
                s.svg = { fill: colors[index], strokeWidth: 1 };
                chartData.push(s);
            }
        } else {
            return (
                <View style={styles.container}>
                    <Text style={styles.title}>CASHFLOW</Text>
                    <View style={{ height: 210, paddingTop: 10, paddingLeft: 0, paddingBottom: 15, flexDirection: 'row' }}>
                    </View>
                </View>
            );
        }

        return (
            <View style={styles.container}>
                <Text style={styles.title}>CASHFLOW</Text>
                <View style={{ height: 210, paddingTop: 10, paddingLeft: 0, paddingBottom: 15, flexDirection: 'row' }}>
                    <YAxis
                        data={chartData}
                        yAccessor={({ item }) => item.total}
                        style={{ marginBottom: xAxisHeight }}
                        contentInset={verticalContentInset}
                        svg={axesSvg}
                    />
                    <View style={{ flex: 1, marginLeft: 10 }}>
                        <BarChart animate={true}
                            style={{ flex: 1 }}
                            data={chartData}
                            yAccessor={({ item }) => item.total}
                            spacing={0.2}
                            spacingOuter={0.3}
                            spacingInner={0.2}
                            bandwidth={5}
                            contentInset={{ top: 0, bottom: 10 }}>
                            <Grid />
                        </BarChart>
                        <XAxis
                            style={{ marginTop: 0 }}
                            data={this.props.cashflow}
                            formatLabel={(value, index) => this.props.cashflow[index].name}
                            labelStyle={{ color: 'black' }}
                            scale={scale.scaleBand}
                        />
                    </View>
                </View>
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