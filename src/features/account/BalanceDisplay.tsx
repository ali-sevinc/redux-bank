import { useSelector } from "react-redux";

import { RootType } from "../../store";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

function BalanceDisplay() {
  const account = useSelector((store: RootType) => store.account);
  return (
    <div className="balance">
      <p>Your Balance: </p>
      {formatCurrency(account.balance)}
    </div>
  );
}

export default BalanceDisplay;
