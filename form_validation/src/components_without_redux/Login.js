import { useRef, useEffect, useState } from "react";
import axios from "../api/axios.js";
import useAuth from "../hooks/useAuth.js";
import { Link, useNavigate, useLocation } from "react-router-dom";

const LOGIN_URL = "/auth";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/home";
  const { setAuth, persist, setPersist } = useAuth();
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [pwd, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ user, pwd }),
        {
          headers: { "content-Type": "application/json" },
          withCredentials: true,
        }
      );
      const accessToken = response?.data?.accessToken;
      setAuth({ user, accessToken });
      setUser("");
      setPwd("");

      navigate(from, { replace: true });
    } catch (err) {
      // when there is no response from server
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  const togglrPersist = (e) => {
    setPersist((prev) => !prev);
  };

  useEffect(() => {
    localStorage.setItem("persist", persist);
  }, [persist]);

  return (
    <section>
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          ref={userRef}
          autoComplete="off"
          onChange={(e) => setUser(e.target.value)}
          value={user}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          onChange={(e) => setPwd(e.target.value)}
          value={pwd}
          required
        />
        <button>Login</button>
        <div className="persistCheck">
          <input
            type="checkbox"
            id="persist"
            onChange={togglrPersist}
            checked={persist}
          />
          <label htmlFor="persist">Trust this Device</label>
        </div>
        <p>
          Need an Account?
          <br />
          <span className="line">
            <a href="/signup">Sign up</a>
          </span>
        </p>
      </form>
    </section>
  );
}

export default Login;
