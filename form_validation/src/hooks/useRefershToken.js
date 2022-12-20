import React from "react";
import axios from "../api/axios.js";
import useAuth from "./useAuth.js";

function useRefershToken() {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.get("/refresh", {
      // this is important to send cookies with axios
      withCredentials: true,
    });
    setAuth((prev) => {
      console.log(JSON.stringify(prev));
      console.log(JSON.stringify(response.data.accessToken));
      return {
        ...prev,
        roles: response.data.roles,
        accessToken: response.data.accessToken,
      };
    });
    return response.data.accessToken;
  };

  return refresh;
}

export default useRefershToken;
