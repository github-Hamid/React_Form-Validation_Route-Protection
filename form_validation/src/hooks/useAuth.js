import { useContext } from "react";
import AuthContext from "../context/AuthProvider.js";

// by using this hook in each component
// we can have access to auth and setAuth of the authContext
function useAuth() {
  return useContext(AuthContext);
}

export default useAuth;
