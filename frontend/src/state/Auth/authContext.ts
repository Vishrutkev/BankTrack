import React, { Dispatch } from "react";
import { AuthAction, AuthState } from "./AuthProvider";

export interface AuthContextType {
  user: AuthState;
  dispatch: Dispatch<AuthAction>;
}

export const AuthContext = React.createContext<AuthContextType>(
  {} as AuthContextType
);
