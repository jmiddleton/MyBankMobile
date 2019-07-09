import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';

import { loadSpendings } from './SpendingsState';

import SpendingsScreen from './SpendingsView';

export default compose(
  connect(
    state => ({
      isLoading: state.spendings.isLoading,
      spendings: state.spendings.spendings,
    }),
    dispatch => ({
      loadSpendings: () => dispatch(loadSpendings()),
    }),
  ),
  lifecycle({
    componentDidMount() {
      this.props.loadSpendings();
    },
  }),
)(SpendingsScreen);
