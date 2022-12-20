import { createContext, useState } from "react";

const AuthContext = createContext({});

// we use this AuthProvider in index.js
// and wrap <App /> inside AuthProvider
// by this all the components have access to auth and setAuth
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  // we put a boolean in local storage to see if we want
  // to trust this device for persist login
  const [persist, setPersist] = useState(
    JSON.parse(localStorage.getItem("persist") || false)
  );

  return (
    <AuthContext.Provider value={{ auth, setAuth, persist, setPersist }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
