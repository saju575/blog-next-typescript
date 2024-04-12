"use client";
import { createContext, useEffect, useReducer } from "react";
import axios from "../../axios-request/axios-request";

// Define initial state
interface AuthState {
  isLoading: boolean;
  isError: boolean;
  error: null | string;
  user: null | User;
}

const initialState: AuthState = {
  isLoading: true,
  isError: false,
  error: null,
  user: null,
};

// Define actions
type Action =
  | { type: "LOGIN_SUCCESS"; payload: User }
  | { type: "LOGIN_FAILURE"; payload: string }
  | { type: "LOGOUT" };

// reducer function

const authReducer = (state: AuthState, action: Action): AuthState => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isError: false,
        error: null,
        user: action.payload,
      };

    case "LOGIN_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true,
        error: action.payload,
        user: null,
      };

    case "LOGOUT":
      return {
        ...state,
        isLoading: false,
        isError: false,
        error: null,
        user: null,
      };

    default:
      return state;
  }
};

export const AuthContext = createContext<{
  state: AuthState;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

// fetch user profile
const fetchUserProfile = async (): Promise<User | null> => {
  const res = await axios.get("/profile");

  if (res.status !== 200) {
    return null;
  }
  return res.data;
};

const AuthContextProvider = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Effect to check if user token is stored in localStorage
  // then get the user data
  useEffect(() => {
    async function fetchData() {
      const storedToken = localStorage.getItem("blog_token");
      if (storedToken) {
        const userProfileData: User | null = await fetchUserProfile();

        if (userProfileData) {
          dispatch({ type: "LOGIN_SUCCESS", payload: userProfileData });
        } else {
          dispatch({ type: "LOGOUT" });
        }
      } else {
        dispatch({ type: "LOGOUT" });
      }
    }
    fetchData();
  }, []);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;