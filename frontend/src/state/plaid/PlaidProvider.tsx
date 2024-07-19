import { ReactNode, useReducer } from 'react'
import PlaidLinkContext, { initialState } from './plaidLinkContext';

export interface PlaidLinkState {
    linkSuccess: boolean;
    isItemAccess: boolean;
    isPaymentInitiation: boolean;
    linkToken: string | null;
    isError: boolean;
    backend: boolean;
    products: string[];
    linkTokenError: {
        error_message: string;
        error_code: string;
        error_type: string;
    };
}

export type PlaidLinkAction = {
    type: "SET_STATE";
    state: Partial<PlaidLinkState>;
};

const plaidLinkReducer = (
    state: PlaidLinkState,
    action: PlaidLinkAction
): PlaidLinkState => {
    switch (action.type) {
        case "SET_STATE":
            return { ...state, ...action.state };
        default:
            return { ...state };
    }
};

interface Props {
    children: ReactNode;
}

const PlaidProvider = ({ children }: Props) => {
    const [state, dispatch] = useReducer(plaidLinkReducer, initialState);
    return (
        <PlaidLinkContext.Provider value={{ ...state, dispatch }}>
            {children}
        </PlaidLinkContext.Provider>
    )
}

export default PlaidProvider