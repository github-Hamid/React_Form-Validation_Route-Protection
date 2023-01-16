import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../hooks/useRefershToken.js";
import useAuth from "../hooks/useAuth.js";

function PersistLogin() {
  const [isLoading, setLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth, persist } = useAuth();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        setLoading(true);
        await refresh();
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    !auth?.accessToken && persist ? verifyRefreshToken() : setLoading(false);
  }, []);

  useEffect(() => {
    console.log(`isLoading: ${isLoading}`);
    console.log(`aT: ${JSON.stringify(auth?.accessToken)}`);
  }, [isLoading]);

  return <>{isLoading ? <p>Loading....</p> : <Outlet />}</>;
}

export default PersistLogin;
