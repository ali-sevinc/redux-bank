import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { useDispatch } from "react-redux";

import { createSlice } from "@reduxjs/toolkit";

export type AccountStateType = {
  balance: number;
  loan: number;
  loanPurpose: string;
  isLoading: boolean;
};
type AccountActionType = {
  type:
    | "account/deposit"
    | "account/withdraw"
    | "account/requestLoan"
    | "account/payLoan"
    | "account/loading";
  amount?: number;
  loan?: number;
  purpose?: string;
};

type DispatchType = ThunkDispatch<
  AccountStateType,
  undefined,
  AccountActionType
>;

type DepositThunk = ThunkAction<
  void,
  AccountStateType,
  undefined,
  AccountActionType
>;

const initialStateAccount: AccountStateType = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

const accountSlice = createSlice({
  name: "account",
  initialState: initialStateAccount,
  reducers: {
    deposit(state, action) {
      state.balance = state.balance + action.payload;
      state.isLoading = false;
    },
    withdraw(state, action) {
      state.balance = state.balance - action.payload;
    },
    requestLoan(state, action) {
      if (state.loan > 0) return;
      state.balance = state.balance + action.payload.loanAmount;
      state.loan = action.payload.loanAmount;
      state.loanPurpose = action.payload.loanPurpose;
    },

    payLoan(state) {
      if (state.loan === 0) return;
      state.balance = state.balance - state.loan;
      state.loan = 0;
      state.loanPurpose = "";
    },
    loading(state) {
      state.isLoading = true;
    },
  },
});

export function deposit(amount: number, currency: string): DepositThunk {
  return async function (dispatch: DispatchType /*getState*/) {
    console.log(amount, currency);
    dispatch({ type: "account/loading" });
    if (currency === "USD") {
      dispatch({ type: "account/deposit", amount });
    } else {
      const res = await fetch(
        `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
      );

      const resData = await res.json();
      const data = resData.rates.USD;
      dispatch({ type: "account/deposit", payload: data });
    }
  };
}
export const useAccountDispatch = () => useDispatch<DispatchType>();
export const { payLoan, requestLoan, withdraw } = accountSlice.actions;

export default accountSlice.reducer;
