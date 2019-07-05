import axios from 'axios';
import _ from 'lodash';

const BALANCES_LOADED = 'DashboarState/BALANCES_LOADED';
const CASHFLOW_LOADED = 'DashboarState/CASHFLOW_LOADED';
// const START_LOADING = 'DashboarState/START_LOADING';

export function loadBalances() {
  const totals = {};
  axios.defaults.headers.common["Authorization"] = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik1rSTBOakJET0VVeU5qSTRSREJFTURWR1JUVTJSREV4TmpsRlEwVXdSVU01UXpFMFFrWTNRZyJ9.eyJuaWNrbmFtZSI6Im15YmFua3Rlc3QiLCJuYW1lIjoibXliYW5rdGVzdEBteWJhbmsuY29tIiwicGljdHVyZSI6Imh0dHBzOi8vcy5ncmF2YXRhci5jb20vYXZhdGFyL2Y2OGY0NDA5M2FiZWFjMWEyMjBmNzRlZjdiODdjNzNiP3M9NDgwJnI9cGcmZD1odHRwcyUzQSUyRiUyRmNkbi5hdXRoMC5jb20lMkZhdmF0YXJzJTJGbXkucG5nIiwidXBkYXRlZF9hdCI6IjIwMTktMDctMDVUMDA6NTM6MDAuODE5WiIsImVtYWlsIjoibXliYW5rdGVzdEBteWJhbmsuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJpc3MiOiJodHRwczovL2Rldi1teWJhbmsuYXUuYXV0aDAuY29tLyIsInN1YiI6ImF1dGgwfDVjYTMwZGQ1MDQwOTljMGU0YWVjNDQ3MSIsImF1ZCI6IlIyemJTUUxGdmR5Y0FoUG5Geko2RkNCSmpPRkNRQW84IiwiaWF0IjoxNTYyMjg3OTgwLCJleHAiOjE1NjIzMjM5ODB9.AN1mdAEGO7lxdZwvC-EofA9T0Umv4Z6uODAkSDfL6ROf_fYfR-g1wXoLrAQZb9zK9fp4MUQKeQ7bGUAp-nPrzC0x15UMS9BlsHv28_IBucA-2WtHKPfAy8tyfgUCFBoOLOJEUa-vCztzRG5sPfqQ9nx6kxtnyYdJAONurk5-CBzAl7ZGD4-cvHBjX7KhBrWsVLD8elw9WVatIYGMSA-hWDkmJcvcPbU4Ae57MxV865VnWF04nRSBre7OryldL9cEfY9oKsXF4ZTPRdl9C-e0TqXq81L94bibCUNw3huqCg8m0Kt0YZ5tJCj_nnTSnvpNfrQ-rKY1tVBmV42mv4AFMA";

  return async dispatch => {
    try {
      const response = await axios.get('/accounts/balances');

      if (response && response.data) {
        const balances = response.data.data.balances;
        balances.forEach(balance => {
          let total = totals[balance.productCategory];
          if (!total) {
            total = {
              balance: 0,
              available: 0
            };
          }

          total.balance = Math.round(total.balance + parseFloat(balance.currentBalance), 2);
          total.available = Math.round(total.available + parseFloat(balance.availableBalance), 2);

          totals[balance.productCategory]= total;
        });
      }

      dispatch(balancesLoaded(totals));
    } catch (error) {
      console.log(error);
    }
  };
}

export function loadCashflow() {
  axios.defaults.headers.common["Authorization"] = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik1rSTBOakJET0VVeU5qSTRSREJFTURWR1JUVTJSREV4TmpsRlEwVXdSVU01UXpFMFFrWTNRZyJ9.eyJuaWNrbmFtZSI6Im15YmFua3Rlc3QiLCJuYW1lIjoibXliYW5rdGVzdEBteWJhbmsuY29tIiwicGljdHVyZSI6Imh0dHBzOi8vcy5ncmF2YXRhci5jb20vYXZhdGFyL2Y2OGY0NDA5M2FiZWFjMWEyMjBmNzRlZjdiODdjNzNiP3M9NDgwJnI9cGcmZD1odHRwcyUzQSUyRiUyRmNkbi5hdXRoMC5jb20lMkZhdmF0YXJzJTJGbXkucG5nIiwidXBkYXRlZF9hdCI6IjIwMTktMDctMDVUMDA6NTM6MDAuODE5WiIsImVtYWlsIjoibXliYW5rdGVzdEBteWJhbmsuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJpc3MiOiJodHRwczovL2Rldi1teWJhbmsuYXUuYXV0aDAuY29tLyIsInN1YiI6ImF1dGgwfDVjYTMwZGQ1MDQwOTljMGU0YWVjNDQ3MSIsImF1ZCI6IlIyemJTUUxGdmR5Y0FoUG5Geko2RkNCSmpPRkNRQW84IiwiaWF0IjoxNTYyMjg3OTgwLCJleHAiOjE1NjIzMjM5ODB9.AN1mdAEGO7lxdZwvC-EofA9T0Umv4Z6uODAkSDfL6ROf_fYfR-g1wXoLrAQZb9zK9fp4MUQKeQ7bGUAp-nPrzC0x15UMS9BlsHv28_IBucA-2WtHKPfAy8tyfgUCFBoOLOJEUa-vCztzRG5sPfqQ9nx6kxtnyYdJAONurk5-CBzAl7ZGD4-cvHBjX7KhBrWsVLD8elw9WVatIYGMSA-hWDkmJcvcPbU4Ae57MxV865VnWF04nRSBre7OryldL9cEfY9oKsXF4ZTPRdl9C-e0TqXq81L94bibCUNw3huqCg8m0Kt0YZ5tJCj_nnTSnvpNfrQ-rKY1tVBmV42mv4AFMA";

  return async dispatch => {
    try {
      const response = await axios.get('/analytics/cashflow');
      dispatch(cashflowLoaded(response.data));
    } catch (error) {
      console.log(error);
    }
  };
}

// function startLoading() {
//   return { type: START_ACCOUNTS_LOADING };
// }

// function clearAccounts() {
//   return { type: CLEAR_ACCOUNTS };
// }

function balancesLoaded(balances) {
  console.log("balances>>>>>>"); console.log(balances);
  return {
    type: BALANCES_LOADED,
    balances,
  };
}

function cashflowLoaded(cashflow) {
  console.log("cashflow>>>>>>"); console.log(cashflow);
  return {
    type: CASHFLOW_LOADED,
    balances,
  };
}

// export function loadAccounts() {
//   return async dispatch => {
//     dispatch(startAccountsLoading());

//     console.log("auth: " + axios.defaults.headers.common["Authorization"]);

//     const accounts = await _loadAccounts();
//     //const balances = await _loadBalances();

//     if (accounts) {
//       accounts.forEach(account => {
//         const balance = _.find(balances, ["accountId", account.accountId]);
//         if (balance) {
//           account.currentBalance = balance.currentBalance;
//           account.availableBalance = balance.availableBalance;
//         }
//       });
//       dispatch(accountsLoaded(accounts));
//     }
//   };
// }

// export function refreshAccounts() {
//   return async dispatch => {
//     dispatch(startAccountsLoading());
//     dispatch(clearAccounts());

//     const accounts = await _loadAccounts();
//     const balances = await loadBalances();

//     if (accounts) {
//       accounts.forEach(account => {
//         const balance = _.find(balances, ["accountId", account.accountId]);
//         if (balance) {
//           account.currentBalance = balance.currentBalance;
//           account.availableBalance = balance.availableBalance;
//         }
//       });
//       dispatch(accountsLoaded(accounts));
//     }
//   };
// }

const defaultState = {
  accounts: [],
  isLoading: false,
};

export default function DashboarStateReducer(state = defaultState, action) {
  switch (action.type) {
    case BALANCES_LOADED:
      return Object.assign({}, state, {
        isLoading: true,
        balances: action.balances
      });
    case CASHFLOW_LOADED:
        return Object.assign({}, state, {
          isLoading: true,
          cashflow: action.cashflow
        });
    // case ACCOUNTS_LOADED:
    //   return Object.assign({}, state, {
    //     isLoading: true,
    //     accounts: action.accounts,
    //   });
    // case CLEAR_ACCOUNTS:
    //   return Object.assign({}, state, {
    //     accounts: [],
    //   });
    default:
      return state;
  }
}
