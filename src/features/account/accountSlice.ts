import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { useDispatch } from "react-redux";

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

const initialStateAccount: AccountStateType = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

export default function reducer(
  state: AccountStateType = initialStateAccount,
  action: AccountActionType
) {
  switch (action.type) {
    case "account/deposit":
      return {
        ...state,
        balance: state.balance + action.amount!,
        isLoading: false,
      } as AccountStateType;
    case "account/withdraw":
      return {
        ...state,
        balance: state.balance - action.amount!,
      } as AccountStateType;
    case "account/requestLoan":
      if (state.loan > 0) return state;
      return {
        ...state,
        balance: state.balance + action.loan!,
        loan: action.loan,
        loanPurpose: action.purpose!,
      } as AccountStateType;
    case "account/payLoan":
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan,
      } as AccountStateType;
    case "account/loading":
      return {
        ...state,
        isLoading: true,
      };
    default:
      return state;
  }
}

type DepositThunk = ThunkAction<
  void,
  AccountStateType,
  undefined,
  AccountActionType
>;

type DispatchType = ThunkDispatch<
  AccountStateType,
  undefined,
  AccountActionType
>;

export const useAccountDispatch = () => useDispatch<DispatchType>();

export function deposit(amount: number, currency: string): DepositThunk {
  return async function (dispatch: DispatchType /*getState*/) {
    dispatch({ type: "account/loading" });
    if (currency === "USD") {
      dispatch({ type: "account/deposit", amount });
    } else {
      const res = await fetch(
        `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
      );

      const resData = await res.json();
      const data = resData.rates.USD;
      dispatch({ type: "account/deposit", amount: data });
    }
  };
}

export function withdraw(amount: number): {
  type: "account/withdraw";
  amount: number;
} {
  return { type: "account/withdraw", amount };
}
export function requestLoan(
  amount: number,
  purpose: string
): {
  type: "account/requestLoan";
  loan: number;
  purpose: string;
} {
  return {
    type: "account/requestLoan",
    loan: amount,
    purpose: purpose,
  };
}
export function payLoan(): { type: "account/payLoan" } {
  return { type: "account/payLoan" };
}
