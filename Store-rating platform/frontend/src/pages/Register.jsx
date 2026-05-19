import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
        address,
      });
      navigate("/");
    } catch (error) {
      console.log(error);
      alert("Registration Failed");
    }
  };

  return (
    <div className="register-page">
      <div className="register-card">
        <h2 className="register-title">Register</h2>

        <form onSubmit={handleRegister}>

          <div className="form-group">
           
            <input
              type="text"
              placeholder="Enter name"
              minLength="20"
              maxLength="60"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

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
              minLength="8"
              maxLength="16"
              required
              pattern="^(?=.*[A-Z])(?=.*[!@#$%^&*]).+$"
              title="Password must contain uppercase and special character"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <small className="field-hint">Min 8 chars, must include uppercase and special character</small>
          </div>

          <div className="form-group">
            
            <input
              type="text"
              placeholder="Enter address"
              maxLength="400"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <button type="submit" className="register-btn">Register</button>

          <p className="login-link">
            Already have an account? <Link to="/">Login</Link>
          </p>

        </form>
      </div>
    </div>
  );
}

export default Register;