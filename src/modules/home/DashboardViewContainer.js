import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';

import { loadBalances, loadCashflow, loadSpendings } from './DashboardState';
import DashboardScreen from './DashboardView';

export default compose(
    connect(
        state => ({
            //isLoading: state.accounts.isLoading,
            balances: state.dashboard.balances,
            cashflow: state.dashboard.cashflow,
            spendings: state.dashboard.spendings,
        }),
        dispatch => ({
            loadBalances: () => dispatch(loadBalances()),
            loadCashflow: () => dispatch(loadCashflow()),
            loadSpendings: () => dispatch(loadSpendings()),
        }),
    ),
    lifecycle({
        componentDidMount() {
            this.props.loadBalances();
            this.props.loadCashflow();
            this.props.loadSpendings();
        },
    }),
)(DashboardScreen);
