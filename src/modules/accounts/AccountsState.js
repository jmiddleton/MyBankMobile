import axios from 'axios';
import _ from 'lodash';

const ACCOUNTS_LOADED = 'AccountsState/ACCOUNTS_LOADED';
const START_ACCOUNTS_LOADING = 'AccountsState/START_ACCOUNTS_LOADING';
const CLEAR_ACCOUNTS = 'AccountsState/CLEAR_ACCOUNTS';

axios.defaults.baseURL = "http://localhost:3000/mybank/v1";
axios.defaults.headers.common['x-api-key'] = "d41d8cd98f00b204e9800998ecf8427e";

// AsyncStorage.getItem('userToken').then(userToken => {
//   axios.defaults.headers.common["Authorization"] = userToken.tokenType + " " + userToken.idToken;
// });

// Add a response interceptor
axios.interceptors.response.use((response) => {
  return response;
}, function (error) {
  return Promise.reject(error);
});

async function _loadAccounts() {
  try {
    const response = await axios.get('/accounts');
    return response.data.data.accounts;
  } catch (error) {
    console.log(error);
  }
}

async function _loadBalances() {
  try {
    const response = await axios.get('/accounts/balances');
    return response.data.data.balances;
  } catch (error) {
    console.log(error);
  }
}

function startAccountsLoading() {
  return { type: START_ACCOUNTS_LOADING };
}

function clearAccounts() {
  return { type: CLEAR_ACCOUNTS };
}

function accountsLoaded(accounts) {
  return {
    type: ACCOUNTS_LOADED,
    accounts,
  };
}

export function loadAccounts() {
  return async dispatch => {
    dispatch(startAccountsLoading());

    console.log("auth: " + axios.defaults.headers.common["Authorization"]);

    const accounts = await _loadAccounts();
    const balances = await _loadBalances();

    if (accounts) {
      accounts.forEach(account => {
        const balance = _.find(balances, ["accountId", account.accountId]);
        if (balance) {
          account.currentBalance = balance.currentBalance;
          account.availableBalance = balance.availableBalance;
        }
      });
      dispatch(accountsLoaded(accounts));
    }
  };
}

export function refreshAccounts() {
  return async dispatch => {
    dispatch(startAccountsLoading());
    dispatch(clearAccounts());
    
    const accounts = await _loadAccounts();
    const balances = await _loadBalances();

    if (accounts) {
      accounts.forEach(account => {
        const balance = _.find(balances, ["accountId", account.accountId]);
        if (balance) {
          account.currentBalance = balance.currentBalance;
          account.availableBalance = balance.availableBalance;
        }
      });
      dispatch(accountsLoaded(accounts));
    }
  };
}

const defaultState = {
  accounts: [],
  isLoading: false,
};

export default function AccountsStateReducer(state = defaultState, action) {
  switch (action.type) {
    case START_ACCOUNTS_LOADING:
      return Object.assign({}, state, {
        isLoading: true,
      });
    case ACCOUNTS_LOADED:
      return Object.assign({}, state, {
        isLoading: true,
        accounts: action.accounts,
      });
    case CLEAR_ACCOUNTS:
      return Object.assign({}, state, {
        accounts: [],
      });
    default:
      return state;
  }
}
