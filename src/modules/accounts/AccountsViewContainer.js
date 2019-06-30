import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';

import { loadAccounts } from './AccountsState';

import AccountsScreen from './AccountsView';

export default compose(
  connect(
    state => ({
      isLoading: state.accounts.isLoading,
      accounts: state.accounts.accounts,
    }),
    dispatch => ({
      loadAccounts: () => dispatch(loadAccounts()),
    }),
  ),
  lifecycle({
    componentDidMount() {
      this.props.loadAccounts();
    },
  }),
)(AccountsScreen);
