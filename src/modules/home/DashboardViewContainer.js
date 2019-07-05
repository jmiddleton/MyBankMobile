import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';

import { loadBalances, loadCashflow } from './DashboardState';
import DashboardScreen from './DashboardView';

export default compose(
    connect(
        state => ({
            //isLoading: state.accounts.isLoading,
            balances: state.dashboard.balances,
            cashflow: state.dashboard.cashflow,
        }),
        dispatch => ({
            loadBalances: () => dispatch(loadBalances()),
            loadCashflow: () => dispatch(loadCashflow()),
        }),
    ),
    lifecycle({
        componentDidMount() {
            this.props.loadBalances();
            this.props.loadCashflow();
        },
    }),
)(DashboardScreen);
