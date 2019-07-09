import React from 'react';
import {
    Text,
    View,
    Dimensions,
    StyleSheet
} from 'react-native';
import { fonts } from '../../styles';
import { PieChart } from 'react-native-svg-charts';
import { bold } from 'ansi-colors';

export const colors = [
    "#ffc247",
    "#f55d5d",
    "#9964e3",
    "#78c448",
    "#547fff",
    "#17a2b8",
    "#E4A537",
    "#B62070",
    "#A7B620",
    "#20B6B6"
];

export default class SpendingsScreen extends React.Component {
    constructor(props) {
        super(props);

        let firstCategory = { category: '', total: 0 };
        if (this.props.spendings && this.props.spendings.length > 0) {
            firstCategory = this.props.spendings[0];
        }

        this.state = {
            selectedSlice: {
                label: firstCategory.category,
                value: firstCategory.totalSpent
            },
            labelWidth: 0
        };
    }

    render() {
        const { labelWidth, selectedSlice } = this.state;
        const { label, value } = selectedSlice;
        const deviceWidth = Dimensions.get('window').width;
        const chartData = [];

        for (let index = 0; index < this.props.spendings.length; index++) {
            const s = this.props.spendings[index];
            chartData.push({
                key: s.category,
                value: s.totalSpent,
                svg: { fill: colors[index] },
                arc: { outerRadius: '90%', padAngle: label === s.category ? 0.1 : 0 },
                onPress: () => this.setState({ selectedSlice: { label: s.category, value: s.totalSpent } })
            });
        }

        return (
            <View style={styles.container}>
                <Text style={styles.title}>SPENDINGS</Text>
                <View style={styles.metaContainer}>
                    <PieChart
                        animate={true}
                        style={{ height: 270, top: -30, }}
                        outerRadius={'70%'}
                        innerRadius={'45%'}
                        data={chartData}
                    />
                    <Text
                        onLayout={({ nativeEvent: { layout: { width } } }) => {
                            this.setState({ labelWidth: width });
                        }}
                        style={{
                            position: 'absolute',
                            fontSize: 12,
                            fontFamily: fonts.primaryBold,
                            top: 90,
                            left: deviceWidth / 2 - labelWidth / 2 - 25,
                            textAlign: 'center'
                        }}>
                        {`${label} \n $${value}`}
                    </Text></View>
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