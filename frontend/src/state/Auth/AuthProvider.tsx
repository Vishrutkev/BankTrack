import React, {
  useContext,
  Dispatch,
  ReactNode,
  useReducer,
  useEffect,
} from "react";
import { AuthContext, AuthContextType } from "./authContext";

interface LogoutAction {
  type: "LOGOUT";
}

interface LoginAction {
  type: "LOGIN";
  userName: string;
  token: string;
  id: string;
  isAuthenticated: boolean;
}

export type AuthAction = LoginAction | LogoutAction;

export interface AuthState {
  userName: string;
  token: string;
  id: string;
  isAuthenticated: boolean;
}

// Initial user state
const initialState: AuthState = {
  userName: "",
  token: "",
  id: "",
  isAuthenticated: false
};

// Reducer function
const loginReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN":
      return {
        userName: action.userName,
        token: action.token,
        id: action.id,
        isAuthenticated: action.isAuthenticated
      };
    case "LOGOUT":
      sessionStorage.clear();
      return initialState;
    default:
      return state;
  }
};

interface Props {
  children: ReactNode;
}

const AuthProvider = ({ children }: Props) => {
  const [user, dispatch] = useReducer(loginReducer, initialState);

  useEffect(() => {
    const savedUser = sessionStorage.getItem("user");
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        dispatch({ type: "LOGIN", ...parsedUser });
      } catch (error) {
        console.error("Failed to parse user data from sessionStorage", error);
      }
    }
  }, []);

  useEffect(() => {
    if (user.userName) {
      sessionStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  return (
    <>
      <AuthContext.Provider value={{ user, dispatch }}>
        {children}
      </AuthContext.Provider>
    </>
  );
};

export { AuthProvider };
