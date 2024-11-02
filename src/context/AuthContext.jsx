import axios from "axios";
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const userAuth = JSON.parse(localStorage.getItem("auth"));
  const [auth, setAuth] = useState(userAuth);
  ///golabl set header
  axios.defaults.headers.common["Authorization"] = `bearer ${auth?.token}`;
  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using AuthContext
const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuth };
