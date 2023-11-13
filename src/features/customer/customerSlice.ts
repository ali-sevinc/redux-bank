export type CustomerStateType = {
  fullName: string;
  nationalID: string;
  createdAt: string;
};
type CustomerActionType = {
  type: "customer/createCustomer" | "customer/updateName";
  fullName?: string;
  nationalID?: string;
  createdAt?: string;
};
const initialStateCustomer: CustomerStateType = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

export default function reducer(
  state: CustomerStateType = initialStateCustomer,
  action: CustomerActionType
) {
  switch (action.type) {
    case "customer/createCustomer":
      return {
        ...state,
        fullName: action.fullName,
        nationalID: action.nationalID,
        createdAt: action.createdAt,
      } as CustomerStateType;
    case "customer/updateName":
      return {
        ...state,
        fullName: action.fullName,
      } as CustomerStateType;
    default:
      return state;
  }
}

export function createCustomer(
  fullName: string,
  nationalID: string
): {
  type: "customer/createCustomer";
  fullName: string;
  nationalID: string;
  createdAt: string;
} {
  return {
    type: "customer/createCustomer",
    fullName,
    nationalID,
    createdAt: new Date().toISOString(),
  };
}
export function updateName(fullName: string): {
  type: "customer/updateName";
  payload: string;
} {
  return {
    type: "customer/updateName",
    payload: fullName,
  };
}
