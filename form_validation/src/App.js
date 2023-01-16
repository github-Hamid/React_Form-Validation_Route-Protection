import Register from "./components/Register.js";
import Login from "./components/Login.js";
import Home from "./components/Home.js";
import Layout from "./components/Layout.js";
import Editor from "./components/Editor.js";
import Admin from "./components/Admin.js";
import Missing from "./components/Missing.js";
import Unauthorized from "./components/Unauthorized.js";
import Lounge from "./components/Lounge.js";
import LinkPage from "./components/Linkpage.js";
import RequireAuth from "./components/RequireAuth.js";
import PersistLogin from "./components/PersistLogin.js";
import { Routes, Route } from "react-router-dom";

const ROLES = {
  User: 2001,
  Editor: 1984,
  Admin: 5150,
};

function App() {
  return (
    <Routes>
      {/*Public Routes*/}
      <Route path="/" element={<Layout />}>
        <Route index element={<LinkPage />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        <Route path="unauthorized" element={<Unauthorized />} />

        {/*Protected Routes*/}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
            <Route path="home" element={<Home />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[ROLES.Editor]} />}>
            <Route path="editor" element={<Editor />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
            <Route path="admin" element={<Admin />} />
          </Route>
          <Route
            element={<RequireAuth allowedRoles={[ROLES.Admin, ROLES.Editor]} />}
          >
            <Route path="lounge" element={<Lounge />} />
          </Route>
        </Route>

        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
