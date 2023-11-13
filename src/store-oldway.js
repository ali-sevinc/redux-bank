/*old way */
import { combineReducers, createStore } from "redux";

const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

const initialStateCustomer = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

const ACCOUNT_DEPOSIT = "account/deposit";
const ACCOUNT_WITHDRAW = "account/withdraw";
const ACCOUNT_REQUESTLOAN = "account/requestLoan";
const ACCOUNT_PAYLOAN = "account/payLoan";

function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case ACCOUNT_DEPOSIT:
      return {
        ...state,
        balance: state.balance + action.payload,
      };
    case ACCOUNT_WITHDRAW:
      return {
        ...state,
        balance: state.balance - action.payload,
      };
    case ACCOUNT_REQUESTLOAN:
      if (state.loan > 0) return state;
      return {
        ...state,
        balance: state.balance + action.payload.loan,
        loan: action.payload.loan,
        loanPurpose: action.payload.purpose,
      };
    case ACCOUNT_PAYLOAN:
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan,
      };

    default:
      return state;
  }
}

function customerReducer(state = initialStateCustomer, action) {
  switch (action.type) {
    case "customer/createCustomer":
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalID: action.payload.nationalID,
        createdAt: action.payload.createdAt,
      };
    case "customer/updateName":
      return {
        ...state,
        fullName: action.payload,
      };
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

const store = createStore(rootReducer);

//direct usage.
console.log("------------------direct usages---------------------------");
store.dispatch({ type: ACCOUNT_DEPOSIT, payload: 450 });
console.log(store.getState().account);
store.dispatch({ type: ACCOUNT_WITHDRAW, payload: 125 });
console.log(store.getState().account);
store.dispatch({
  type: ACCOUNT_REQUESTLOAN,
  payload: { loan: 1050, purpose: "Buy a car" },
});
console.log(store.getState().account);
store.dispatch({
  type: ACCOUNT_PAYLOAN,
});
console.log(store.getState().account);

//action creators.
console.log("----------------action creators usages-----------------------");
function deposit(amount) {
  return { type: ACCOUNT_DEPOSIT, payload: amount };
}
function withdraw(amount) {
  return { type: ACCOUNT_WITHDRAW, payload: amount };
}
function requestLoan(amount, purpose) {
  return {
    type: ACCOUNT_REQUESTLOAN,
    payload: { loan: amount, purpose: purpose },
  };
}
function payLoan() {
  return { type: ACCOUNT_PAYLOAN };
}
store.dispatch(deposit(350));
console.log(store.getState());
store.dispatch(withdraw(140));
console.log(store.getState());
store.dispatch(requestLoan(500, "new pc"));
console.log(store.getState());
store.dispatch(payLoan());
console.log(store.getState());

function createCustomer(fullName, nationalID) {
  return {
    type: "customer/createCustomer",
    payload: { fullName, nationalID, createdAt: new Date().toISOString() },
  };
}
function updateName(fullName) {
  return {
    type: "customer/updateName",
    payload: fullName,
  };
}

console.log("-----------------second reducer (customer)---------------------");
store.dispatch(createCustomer("Eren jeager", "123c321"));
console.log(store.getState().customer);
store.dispatch(updateName("updated eren"));
console.log(store.getState().customer);
