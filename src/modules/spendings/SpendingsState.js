import axios from 'axios';
import moment from 'moment';

const monthFormat = "YYYY-MM";
const SPENDINGS_LOADED = 'SpendingsState/SPENDINGS_LOADED';
const START_SPENDINGS_LOADING = 'SpendingsState/START_SPENDINGS_LOADING';
const CLEAR_SPENDINGS = 'SpendingsState/CLEAR_SPENDINGS';

async function _loadSpendings() {
  const currentMonth = moment().format(monthFormat);

  try {
    const response = await axios.get('/analytics/spendings/' + currentMonth,
      {
        params: {
          monthsToPrefetch: 3,
          'page-size': 50
        }
      });

    if (response && response.data && response.data.data) {
      return response.data.data.spendings;
    }
    return [];

  } catch (error) {
    console.log(error);
  }
}

function startSpendingsLoading() {
  return { type: START_SPENDINGS_LOADING };
}

function clearSpendings() {
  return { type: CLEAR_SPENDINGS };
}

function spendingsLoaded(spendings) {
  return {
    type: SPENDINGS_LOADED,
    spendings,
  };
}

export function loadSpendings() {
  return async dispatch => {
    dispatch(startSpendingsLoading());

    const spendings = await _loadSpendings();
    dispatch(spendingsLoaded(spendings));
  };
}

export function refreshSpendings() {
  return async dispatch => {
    dispatch(startSpendingsLoading());
    dispatch(clearSpendings());

    const spendings = await _loadSpendings();
    dispatch(spendingsLoaded(spendings));
  };
}

const defaultState = {
  spendings: [],
  isLoading: false,
};

export default function SpendingsStateReducer(state = defaultState, action) {
  switch (action.type) {
    case START_SPENDINGS_LOADING:
      return Object.assign({}, state, {
        isLoading: true,
      });
    case SPENDINGS_LOADED:
      return Object.assign({}, state, {
        isLoading: true,
        spendings: action.spendings,
      });
    case CLEAR_SPENDINGS:
      return Object.assign({}, state, {
        spendings: [],
      });
    default:
      return state;
  }
}
