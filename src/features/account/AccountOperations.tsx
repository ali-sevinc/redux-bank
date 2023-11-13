import { useState } from "react";
import { useSelector } from "react-redux";

import {
  deposit,
  payLoan,
  requestLoan,
  withdraw,
  useAccountDispatch,
} from "./accountSlice";
import { RootType } from "../../store";

import BalanceDisplay from "./BalanceDisplay";

function AccountOperations() {
  const [depositAmount, setDepositAmount] = useState<string | number>("");
  const [withdrawalAmount, setWithdrawalAmount] = useState<string | number>("");
  const [loanAmount, setLoanAmount] = useState<string | number>("");
  const [loanPurpose, setLoanPurpose] = useState<string>("");
  const [currency, setCurrency] = useState("USD");

  const { loan, isLoading } = useSelector((store: RootType) => store.account);

  const dispatch = useAccountDispatch();

  function handleDeposit() {
    if (
      !depositAmount ||
      +depositAmount < 0 ||
      isNaN(+depositAmount) ||
      !currency
    )
      return;
    dispatch(deposit(Number(depositAmount), currency));
    setDepositAmount("");
    setCurrency("USD");
  }

  function handleWithdrawal() {
    if (!withdrawalAmount || +withdrawalAmount < 0 || isNaN(+withdrawalAmount))
      return;
    dispatch(withdraw(Number(withdrawalAmount)));
    setWithdrawalAmount("");
  }

  function handleRequestLoan() {
    if (!loanAmount || +loanAmount < 0 || isNaN(+loanAmount)) return;
    if (!loanPurpose) return;
    dispatch(requestLoan(Number(loanAmount), loanPurpose));
    setLoanAmount("");
    setLoanPurpose("");
  }

  function handlePayLoan() {
    dispatch(payLoan());
  }

  return (
    <div className="account">
      <h2>Your account operations</h2>
      <BalanceDisplay />
      <div className="inputs">
        <div>
          <label>Deposit</label>
          <input
            type="number"
            value={depositAmount}
            onChange={(e) => setDepositAmount(+e.target.value)}
          />
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option value="USD">US Dollar</option>
            <option value="EUR">Euro</option>
            <option value="GBP">British Pound</option>
          </select>

          <button disabled={isLoading} onClick={handleDeposit}>
            {isLoading ? "Loading..." : "Deposit"} {depositAmount}
          </button>
        </div>
        <div>
          <label>Withdraw</label>
          <input
            type="number"
            value={withdrawalAmount}
            onChange={(e) => setWithdrawalAmount(+e.target.value)}
          />
          <button onClick={handleWithdrawal}>
            Withdraw {withdrawalAmount}
          </button>
        </div>
        {loan === 0 && (
          <div>
            <label>Request loan</label>
            <input
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(+e.target.value)}
              placeholder="Loan amount"
            />
            <input
              value={loanPurpose}
              onChange={(e) => setLoanPurpose(e.target.value)}
              placeholder="Loan purpose"
            />
            <button onClick={handleRequestLoan}>Request loan</button>
          </div>
        )}
        {loan > 0 && (
          <div>
            <span>Pay back ${loan}</span>
            <button onClick={handlePayLoan}>Pay loan</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AccountOperations;
