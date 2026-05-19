import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      setError("");
      const role = res.data.user.role;
      if (role === "ADMIN") navigate("/admin");
      else if (role === "OWNER") navigate("/owner");
      else navigate("/stores");
    } catch (error) {
      console.log(error.message);
      setError("Invalid Email or Password");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2 className="login-title">Login</h2>
        <form onSubmit={handleLogin}>

          <div className="form-group">
          
            <input
              type="email"
              placeholder="Enter email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            
            <input
              type="password"
              placeholder="Enter password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <p className="error-msg">{error}</p>}

          <button type="submit" className="login-btn">Login</button>

          <p className="register-link">
            Don't have an account? <Link to="/register">Register</Link>
          </p>

        </form>
      </div>
    </div>
  );
}

export default Login;