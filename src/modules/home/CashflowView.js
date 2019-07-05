import React from 'react';
import { VictoryBar } from 'victory-native';

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
                <VictoryBar viewBox="0 0 200 200"
                    data={[
                        { x: "Income", y: 35 },
                        { x: "Spendings", y: 40 },
                        { x: "Savings", y: 55 }
                    ]}
                    padAngle={3}
                    width={200} height={200}
                    innerRadius={70}
                    style={{ labels: { fill: "white", fontSize: 12 } }}
                    colorScale={colors}
                    animate={{ duration: 2000 }}
                />
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