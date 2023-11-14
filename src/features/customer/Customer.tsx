import { useDispatch, useSelector } from "react-redux";
import { RootType } from "../../store";
import { useState } from "react";
import { updateName } from "./customerSlice";

function Customer() {
  const [newName, setNewName] = useState<string>("");
  const { fullName } = useSelector((store: RootType) => store.customer);

  const dispatch = useDispatch();

  function handleUpdate() {
    if (!newName) return;
    dispatch(updateName(newName));
    setNewName("");
  }

  return (
    <>
      <h2>Welcome, {fullName}</h2>
      <div className="updateName">
        <input
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Update name"
        />{" "}
        <button onClick={handleUpdate}>Update</button>
      </div>
    </>
  );
}

export default Customer;
