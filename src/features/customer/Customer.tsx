import { useSelector } from "react-redux";
import { RootType } from "../../store";

function Customer() {
  const { fullName } = useSelector((store: RootType) => store.customer);

  return <h2>👋 Welcome, {fullName}</h2>;
}

export default Customer;
