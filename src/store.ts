import { configureStore } from "@reduxjs/toolkit";

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

const store = configureStore<RootType>({
  reducer: {
    account: accountReducer,
    customer: customerReducer,
  },
});

export default store;
