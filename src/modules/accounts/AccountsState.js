import axios from 'axios';
import _ from 'lodash';

const ACCOUNTS_LOADED = 'AccountsState/ACCOUNTS_LOADED';
const START_ACCOUNTS_LOADING = 'AccountsState/START_ACCOUNTS_LOADING';

axios.defaults.baseURL = "http://localhost:3000/mybank/v1";
axios.defaults.headers.common['x-api-key'] = "d41d8cd98f00b204e9800998ecf8427e";
axios.defaults.headers.common["Authorization"] = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik1rSTBOakJET0VVeU5qSTRSREJFTURWR1JUVTJSREV4TmpsRlEwVXdSVU01UXpFMFFrWTNRZyJ9.eyJuaWNrbmFtZSI6Im15YmFua3Rlc3QiLCJuYW1lIjoibXliYW5rdGVzdEBteWJhbmsuY29tIiwicGljdHVyZSI6Imh0dHBzOi8vcy5ncmF2YXRhci5jb20vYXZhdGFyL2Y2OGY0NDA5M2FiZWFjMWEyMjBmNzRlZjdiODdjNzNiP3M9NDgwJnI9cGcmZD1odHRwcyUzQSUyRiUyRmNkbi5hdXRoMC5jb20lMkZhdmF0YXJzJTJGbXkucG5nIiwidXBkYXRlZF9hdCI6IjIwMTktMDYtMjdUMDk6MzU6NDcuMTYwWiIsImVtYWlsIjoibXliYW5rdGVzdEBteWJhbmsuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJpc3MiOiJodHRwczovL2Rldi1teWJhbmsuYXUuYXV0aDAuY29tLyIsInN1YiI6ImF1dGgwfDVjYTMwZGQ1MDQwOTljMGU0YWVjNDQ3MSIsImF1ZCI6IlIyemJTUUxGdmR5Y0FoUG5Geko2RkNCSmpPRkNRQW84IiwiaWF0IjoxNTYxOTM2NzQyLCJleHAiOjE1NjE5NzI3NDIsIm5vbmNlIjoiMTJrSTdiaTM4bkV0cUJmeFRucllYampTSlFIfmhDMG4ifQ.uAb3z29bVztmNXyC3BspK2PvRwzg4otp6YyOrQIlc6DAqZfkwUJwhDZKj_Ek3wR6WTk-O-shHItg8cTcKVbZkVuF-Xy_x4HtoRY7MqE9Ht9ENb6GcPRua00CKD8wNYhX0tRxxsCtvzZ9SLtynNaugyKSoVgMnNMbXJ2nwQNPExq8hUy0DkyiX8g3uR6UqOZoM748KyExd56XrUUqm52jNnVU-2iEfI0Tsm0P8DXU7TrhnXSg3C1YpKTDJIcMP5cxKjKaOmkLhJk9WJFCYe4uia07g4TyfhFCVhC8APkwkGgXeAikUMitBqHJ9z_k9c2LngzCuM_JGEz3BOIgr6yqKA";
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

function accountsLoaded(accounts) {
  return {
    type: ACCOUNTS_LOADED,
    accounts,
  };
}

export function loadAccounts() {
  return async dispatch => {
    dispatch(startAccountsLoading());

    const accounts = await _loadAccounts();
    const balances = await _loadBalances();

    console.log(accounts);
    console.log(balances);
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
    default:
      return state;
  }
}
