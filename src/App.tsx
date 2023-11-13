import { useSelector } from "react-redux";
import CreateCustomer from "./features/customer/CreateCustomer";
import Customer from "./features/customer/Customer";
import AccountOperations from "./features/account/AccountOperations";

import { RootType } from "./store";

function App() {
  const customer = useSelector((store: RootType) => store.customer);
  return (
    <div>
      <h1>🏦 The React-Redux Bank ⚛️</h1>
      {!customer.fullName && <CreateCustomer />}
      {customer.fullName && (
        <>
          <Customer />
          <AccountOperations />
        </>
      )}
    </div>
  );
}

export default App;
