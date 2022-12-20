import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.js";
import Public from "./components/Public.js";
import Login from "./features/auth/Login.js";
import Welcome from "./features/auth/Welcome.js";
import RequireAuth from "./features/auth/RequireAuth.js";
import UsersList from "./features/users/UsersList.js";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />

        {/* protected routes */}
        <Route element={<RequireAuth />}>
          <Route path="welcome" element={<Welcome />} />
          <Route path="userslist" element={<UsersList />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
