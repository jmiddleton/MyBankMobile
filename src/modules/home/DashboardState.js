import axios from 'axios';
import _ from 'lodash';
import moment from 'moment';

const monthFormat = "YYYY-MM";
const BALANCES_LOADED = 'DashboarState/BALANCES_LOADED';
const CASHFLOW_LOADED = 'DashboarState/CASHFLOW_LOADED';
const SPENDINGS_LOADED = 'DashboarState/SPENDINGS_LOADED';
const SAVINGS_LOADED = 'DashboarState/SAVINGS_LOADED';

axios.defaults.headers.common["Authorization"] = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik1rSTBOakJET0VVeU5qSTRSREJFTURWR1JUVTJSREV4TmpsRlEwVXdSVU01UXpFMFFrWTNRZyJ9.eyJuaWNrbmFtZSI6Im15YmFua3Rlc3QiLCJuYW1lIjoibXliYW5rdGVzdEBteWJhbmsuY29tIiwicGljdHVyZSI6Imh0dHBzOi8vcy5ncmF2YXRhci5jb20vYXZhdGFyL2Y2OGY0NDA5M2FiZWFjMWEyMjBmNzRlZjdiODdjNzNiP3M9NDgwJnI9cGcmZD1odHRwcyUzQSUyRiUyRmNkbi5hdXRoMC5jb20lMkZhdmF0YXJzJTJGbXkucG5nIiwidXBkYXRlZF9hdCI6IjIwMTktMDctMThUMDg6MTA6MTYuNzM2WiIsImVtYWlsIjoibXliYW5rdGVzdEBteWJhbmsuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJpc3MiOiJodHRwczovL2Rldi1teWJhbmsuYXUuYXV0aDAuY29tLyIsInN1YiI6ImF1dGgwfDVjYTMwZGQ1MDQwOTljMGU0YWVjNDQ3MSIsImF1ZCI6IlIyemJTUUxGdmR5Y0FoUG5Geko2RkNCSmpPRkNRQW84IiwiaWF0IjoxNTYzNDM4NzE1LCJleHAiOjE1NjM0NzQ3MTUsIm5vbmNlIjoiekgxYWhrMGZJU0dtbnBvblRKdDIyTDJOZmNyd3V0TFAifQ.V9Iy8ZH5qPhhLBdLwo5wN0hrIY5GL5-RhsDLVW3g_j8kl2979q_jeSB3OB_fp5y6XaijdUzfPe__g3YgMRwBUTc3dnrS0_er3rICBGG2P7LEIlTtURisGFKcHXnVtM6YntXLXAmdIO0u3e6vfTkOCXaG0p8y85347XpHf3Ub87tFCjQIaeAJ4CZQ96jBKqjmZbOHAwbivMefVeChiSzJBQ7Hdo-Tf-KZWPA8BE-YNKM0l5pBb8QVLETwPHepsA_86Bo8MWstdYmqYe5DwvM89puhyzGW0eo16NglLVmXcyq7jgQrPniCLIrXvJoy4kAEE65BQKJ25J4wHosoAY5ymQ";

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
      dispatch(balancesLoaded(totals));
    }
  };
}

export function loadCashflow() {
  const currentMonth = moment().format(monthFormat);

  return async dispatch => {
    try {
      const response = await axios.get('/analytics/cashflow');

      console.log(response);

      if (response && response.data) {
        const data = response.data.data;
        const cashflow = [];

        const saving = _.find(data.savings, function (value) {
          return (value.month === currentMonth);
        });

        const income = _.find(data.incomes, function (value) {
          return (value.month === currentMonth);
        });

        const spendings = _.find(data.spendings, function (value) {
          return (value.month === currentMonth);
        });

        cashflow.push({
          name: "Incomes", total: income ? income.totalIncome : 0
        });

        cashflow.push({
          name: "Spendings", total: spendings ? spendings.totalSpent : 0
        });

        cashflow.push({
          name: "Savings", total: saving ? saving.totalSavings : 0
        });

        dispatch(cashflowLoaded(cashflow));
      } else {
        dispatch(cashflowLoaded([]));
      }

    } catch (error) {
      console.log(error);
      dispatch(cashflowLoaded([]));
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

      if (response && response.data && response.data.data) {
        dispatch(spendingsLoaded(response.data.data.spendings));
      } else {
        dispatch(spendingsLoaded([]));
      }
    } catch (error) {
      console.log(error);
      dispatch(spendingsLoaded([]));
    }
  };
}

export function loadSavings() {
  const currentMonth = moment().subtract(3, "months").format(monthFormat);

  return async dispatch => {
    try {
      const response = await axios.get(
        "/analytics/savings/" + currentMonth, { "page-size": 4 }
      );

      if (response && response.data && response.data.data) {
        dispatch(savingsLoaded(response.data.data.savings));
      } else {
        dispatch(savingsLoaded([]));
      }

    } catch (error) {
      console.log(error);
      dispatch(savingsLoaded([]));
    }
  };
}

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
    cashflow,
  };
}

function spendingsLoaded(spendings) {
  console.log("spendings>>>>>>"); console.log(spendings);
  return {
    type: SPENDINGS_LOADED,
    spendings,
  };
}

function savingsLoaded(savings) {
  console.log("savings>>>>>>"); console.log(savings);
  return {
    type: SAVINGS_LOADED,
    savings,
  };
}

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
    case SPENDINGS_LOADED:
      return Object.assign({}, state, {
        isLoading: true,
        spendings: action.spendings
      });
    case SAVINGS_LOADED:
      return Object.assign({}, state, {
        isLoading: true,
        savings: action.savings
      });
    default:
      return state;
  }
}
