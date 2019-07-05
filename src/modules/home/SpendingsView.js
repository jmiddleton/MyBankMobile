import React from 'react';
import { VictoryPie } from 'victory-native';

import {
    StyleSheet,
    View,
    Text,
    Image,
} from 'react-native';
import { fonts } from '../../styles';

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

export default class CashflowScreen extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>SPENDINGS</Text>
                <VictoryPie viewBox="0 0 200 200"
                    data={[
                        { x: "Cats", y: 35 },
                        { x: "Dogs", y: 40 },
                        { x: "Birds", y: 55 }
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