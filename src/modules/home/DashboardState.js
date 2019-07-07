import axios from 'axios';
import _ from 'lodash';
import moment from 'moment';

const monthFormat = "YYYY-MM";
const BALANCES_LOADED = 'DashboarState/BALANCES_LOADED';
const CASHFLOW_LOADED = 'DashboarState/CASHFLOW_LOADED';
const SPENDINGS_LOADED = 'DashboarState/SPENDINGS_LOADED';
// const START_LOADING = 'DashboarState/START_LOADING';

axios.defaults.headers.common["Authorization"] = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik1rSTBOakJET0VVeU5qSTRSREJFTURWR1JUVTJSREV4TmpsRlEwVXdSVU01UXpFMFFrWTNRZyJ9.eyJuaWNrbmFtZSI6Im15YmFua3Rlc3QiLCJuYW1lIjoibXliYW5rdGVzdEBteWJhbmsuY29tIiwicGljdHVyZSI6Imh0dHBzOi8vcy5ncmF2YXRhci5jb20vYXZhdGFyL2Y2OGY0NDA5M2FiZWFjMWEyMjBmNzRlZjdiODdjNzNiP3M9NDgwJnI9cGcmZD1odHRwcyUzQSUyRiUyRmNkbi5hdXRoMC5jb20lMkZhdmF0YXJzJTJGbXkucG5nIiwidXBkYXRlZF9hdCI6IjIwMTktMDctMDdUMDc6MzQ6MTMuODU5WiIsImVtYWlsIjoibXliYW5rdGVzdEBteWJhbmsuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJpc3MiOiJodHRwczovL2Rldi1teWJhbmsuYXUuYXV0aDAuY29tLyIsInN1YiI6ImF1dGgwfDVjYTMwZGQ1MDQwOTljMGU0YWVjNDQ3MSIsImF1ZCI6IlIyemJTUUxGdmR5Y0FoUG5Geko2RkNCSmpPRkNRQW84IiwiaWF0IjoxNTYyNTMxMjQ2LCJleHAiOjE1NjI1NjcyNDYsIm5vbmNlIjoiTUhCQ2pGdFVUNTU3U21EWVQwM1YtQlp2YWZIaDBLbkkifQ.RRIEWfCtZfirIhTLlM9kWI-_LCC5LAxrPAO3AcK-sl9sQwriVxAQJ4_D6rNhbtnNoSmXJ_CDeLHHZjX0ZzpvzbmSAfv3NZAuDRevFPWD_jTz2CJS8YcQhlnRXvtb5Haa88aJIkm-yx7K5xj3tgE_2gZTUsdZ07-WTwDqs7qmMcEsOvJ48vLL83PWJNhCeiaLmExJVLwH1SftFC3gOxtHyE_YXkEMsWcIGGFLBNTOUKu6FmAmet_s3i5Ky0Dl4opsDbdBN7Td3U-dQcIDiybEULdtiUNrrsAm9a26p0lo65TMk5-II_azxgw0Az2AKgFTOQ8t1T2cgDrz_OAsj0UCxw";

export function loadBalances() {
  const totals = {};

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

          totals[balance.productCategory] = total;
        });
      }

      dispatch(balancesLoaded(totals));
    } catch (error) {
      console.log(error);
    }
  };
}

export function loadCashflow() {
  const currentMonth = moment().format(monthFormat);

  return async dispatch => {
    try {
      const response = await axios.get('/analytics/chartData');

      console.log(response);

      if (response && response.data) {
        const data = response.data.data;

        if (data) {
          const chartData = [];
          const saving = _.find(data.savings, function (value) {
            return (value.month === currentMonth);
          });

          const income = _.find(data.incomes, function (value) {
            return (value.month === currentMonth);
          });

          const spendings = _.find(data.spendings, function (value) {
            return (value.month === currentMonth);
          });

          chartData.push({
            x: "Incomes", y: income ? income.totalIncome : 0
          });

          chartData.push({
            x: "Spendings", y: spendings ? spendings.totalSpent : 0
          });

          chartData.push({
            x: "Savings", y: saving ? saving.totalSavings : 0
          });

          dispatch(chartDataLoaded(chartData));
        }
      }

    } catch (error) {
      console.log(error);
    }
  };
}

export function loadSpendings() {
  const currentMonth = moment().format(monthFormat);

  return async dispatch => {
    try {
      const response = await axios.get(
        "/analytics/spendings/" + currentMonth,
        {
          params: {
            monthsToPrefetch: 0,
            'page-size': 50
          }
        }
      );

      if (response && response.data) {
        const chartData = [];
        const spendings = response.data.data.spendings;

        spendings.forEach(s => {
          chartData.push({
            name: s.category, total: s.totalSpent
          });
        });

        dispatch(spendingsLoaded(chartData));
      }



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

function chartDataLoaded(chartData) {
  console.log("chartData>>>>>>"); console.log(chartData);
  return {
    type: CASHFLOW_LOADED,
    chartData,
  };
}

function spendingsLoaded(spendings) {
  console.log("spendings>>>>>>"); console.log(spendings);
  return {
    type: SPENDINGS_LOADED,
    spendings,
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
        chartData: action.chartData
      });
    case SPENDINGS_LOADED:
      return Object.assign({}, state, {
        isLoading: true,
        spendings: action.spendings
      });
    default:
      return state;
  }
}
