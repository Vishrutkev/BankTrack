import { Dispatch, createContext } from "react";
import { PlaidLinkState, PlaidLinkAction } from "./PlaidProvider";

export const initialState: PlaidLinkState = {
  linkSuccess: false,
  isItemAccess: true,
  isPaymentInitiation: false,
  linkToken: "", // Don't set to null or error message will show up briefly when site loads
  accessToken: null,
  itemId: null,
  isError: false,
  backend: true,
  products: ["transactions"],
  linkTokenError: {
    error_type: "",
    error_code: "",
    error_message: "",
  },
};

interface PlaidLinkContextType extends PlaidLinkState {
  dispatch: Dispatch<PlaidLinkAction>;
}

const PlaidLinkContext = createContext<PlaidLinkContextType>(
  initialState as PlaidLinkContextType
);

export default PlaidLinkContext;
