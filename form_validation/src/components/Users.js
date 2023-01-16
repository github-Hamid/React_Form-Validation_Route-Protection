import React, { useState, useEffect, useRef } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate.js";
import useRefershToken from "../hooks/useRefershToken.js";
import { useNavigate, useLocation } from "react-router-dom";

function Users() {
  const effectRun = useRef(false);
  const [users, setUsers] = useState();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    // with controller we can cancel our request by axios
    const controller = new AbortController();

    const getUsers = async () => {
      try {
        const response = await axiosPrivate.get("/users", {
          signal: controller.signal,
        });

        console.log("response:", response.data);
        const userNames = response.data.map((user) => user.username);
        isMounted && setUsers(userNames);
      } catch (err) {
        console.error(err);
        // this is for when refresh token expires
        navigate("/login", { state: { from: location }, replace: true });
      }
    };

    if (effectRun.current) {
      getUsers();
    }

    return () => {
      isMounted = false;
      controller.abort();
      effectRun.current = true; // update the value of effectRun to true
    };
  }, []);
  return (
    <article>
      <h2>Users List</h2>
      {users?.length ? (
        <ul>
          {users.map((user, i) => (
            <li key={i}>{user}</li>
          ))}
        </ul>
      ) : (
        <p>No users to display</p>
      )}
    </article>
  );
}

export default Users;
