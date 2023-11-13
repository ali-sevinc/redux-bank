import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import { composeWithDevTools } from "@redux-devtools/extension";

import accountReducer, {
  AccountStateType,
} from "./features/account/accountSlice";
import customerReducer, {
  CustomerStateType,
} from "./features/customer/customerSlice";

export type RootType = {
  account: AccountStateType;
  customer: CustomerStateType;
};

const rootReducer = combineReducers<RootType>({
  account: accountReducer,
  customer: customerReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
