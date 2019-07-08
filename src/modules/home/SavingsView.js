import React from 'react';
import { LinearGradient, Stop, Defs } from 'react-native-svg';
import { BarChart, Grid, XAxis } from 'react-native-svg-charts';
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
        const chartData = [];
        const chartLabels = [];

        if (this.props.savings) {
            for (let index = 0; index < this.props.savings.length; index++) {
                const s = this.props.savings[index];
                chartData.push(s.totalSavings);
                chartLabels.push(s.monthName);
            }
        }

        const Gradient = () => (
            <Defs key={'gradient'}>
                <LinearGradient id={'gradient'} x1={'0%'} y={'0%'} x2={'0%'} y2={'100%'}>
                    <Stop offset={'0%'} stopColor={'rgb( 162, 217, 206 )'} />
                    <Stop offset={'100%'} stopColor={'rgb( 40, 180, 99 )'} />
                </LinearGradient>
            </Defs>
        )

        const Labels = ({ x, y, bandwidth, data }) => (
            data.map((value, index) => (
                <Text
                    key={ index }
                    x={ x(index) -10}
                    y={ y(value) - 10}
                    fontSize={ 14 }
                    fill={ 'black' }
                    alignmentBaseline={ 'middle' }
                    textAnchor={ 'middle' }
                >
                    {value}
                </Text>
            ))
        )

        return (
            <View style={styles.container}>
                <Text style={styles.title}>SAVINGS</Text>
                <View style={styles.metaContainer}>
                    <BarChart
                        style={{ height: 170 }}
                        data={chartData}
                        spacing={0.2}
                        contentInset={{ top: 20, bottom: 10 }}
                        svg={{
                            strokeWidth: 1,
                            fill: 'url(#gradient)',
                        }}>
                        <Grid />
                        <Gradient />
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
        fontSize: 18
    },
    metaContainer: {
        justifyContent: 'space-between',
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 2,
    },
});