import React from 'react';
import { BarChart, Grid, XAxis, YAxis } from 'react-native-svg-charts';
import * as scale from 'd3-scale';

import {
    Text,
    View,
    StyleSheet
} from 'react-native';
import { fonts } from '../../styles';

export default class SavingsScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const axesSvg = { fontSize: 10, fill: 'grey' };
        const verticalContentInset = { top: 0, bottom: 10 }
        const xAxisHeight = 15
        const chartData = [];

        if (this.props.savings) {

            return (
                <View style={styles.container}>
                    <Text style={styles.title}>SAVINGS</Text>
                    <View style={{ height: 215, paddingTop:10, paddingLeft: 0, paddingBottom: 20, flexDirection: 'row' }}>
                        <YAxis
                            data={this.props.savings}
                            yAccessor={({ item }) => item.totalSavings}
                            style={{ marginBottom: xAxisHeight }}
                            contentInset={verticalContentInset}
                            svg={axesSvg}
                        />
                        <View style={{ flex: 1, marginLeft: 10 }}>
                            <BarChart animate={true}
                                style={{ flex: 1 }}
                                data={this.props.savings}
                                yAccessor={({ item }) => item.totalSavings}
                                spacing={0.2}
                                contentInset={{ top: 0, bottom: 10 }}
                                svg={{
                                    strokeWidth: 1,
                                    fill: '#52be80',
                                }}>
                                <Grid />
                            </BarChart>
                            <XAxis
                                style={{ marginTop: 0 }}
                                data={this.props.savings}
                                formatLabel={(value, index) => this.props.savings[index].monthName}
                                labelStyle={{ color: 'black' }}
                                scale={scale.scaleBand}
                            />
                        </View>
                    </View>
                </View>
            );
        } else {
            return (
                <View style={styles.container}>
                    <Text style={styles.title}>SAVINGS</Text>
                    <Text>No Data Found</Text>
                </View>
            );
        }
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
        justifyContent: 'space-between',
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 2,
    },
});