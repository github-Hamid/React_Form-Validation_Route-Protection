import { useNavigate, Link } from "react-router-dom";
import useLogout from "../hooks/useLogout.js";

const Home = () => {
  const navigate = useNavigate();
  const logout = useLogout();

  const signout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <section>
      <h1>Home</h1>
      <br />
      <p>You are logged in!</p>
      <br />
      <Link to="/editor">Go to the Editor page</Link>
      <br />
      <Link to="/admin">Go to the Admin page</Link>
      <br />
      <Link to="/lounge">Go to the Lounge</Link>
      <br />
      <Link to="/">Go to the link page</Link>
      <div className="flexGrow">
        <button onClick={signout}>Sign Out</button>
      </div>
    </section>
  );
};

export default Home;
