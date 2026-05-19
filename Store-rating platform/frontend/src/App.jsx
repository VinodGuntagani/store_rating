import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Stores from "./pages/Stores";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import OwnerDashboard from "./pages/OwnerDashboard";
import "./App.css";

function Navbar() {
  const token =
    localStorage.getItem("token");

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");

    navigate("/");
  };

return (
  <nav className="navbar">
    <div>
      {token && (
        <h2 className="logo">
          Rating-Store
        </h2>
      )}
    </div>

    <div>
      {token && (
        <button
          className="nav-btn"
          onClick={logout}
        >
          Logout
        </button>
      )}
    </div>
  </nav>
);
}

function App() {
  const token =
    localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            token ? (
              <Stores />
            ) : (
              <Login />
            )
          }
        />

        <Route
          path="/register"
          element={
            token ? (
              <Stores />
            ) : (
              <Register />
            )
          }
        />

        <Route
          path="/stores"
          element={
            <ProtectedRoute>
              <Stores />
            </ProtectedRoute>
          }
        />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
        path="/owner"
         element={<OwnerDashboard />}
/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;