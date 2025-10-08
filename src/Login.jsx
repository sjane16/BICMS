import { useState } from "react";
import './Login.css'
import Logo from './assets/BICMS_logo.png'
import LoginProfile from './assets/loginprofile.png'
import EmailIcon from './assets/messageicon.png'
import LockIcon from './assets/lockicon.png'

function Login() {
  const [activeForm, setActiveForm] = useState("login");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      const res = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, password }),
      });
      const data = await res.json();
      alert(data.message);
      setFullName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setActiveForm("login");
    } catch (err) {
      console.error(err);
      alert("Error registering user");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      alert(data.message);
    } catch (err) {
      console.error(err);
      alert("Error logging in");
    }
  };

  return (
    <div className="container">
      <div className="form-box active">
        <img src={Logo} alt="logo" className="bicms_logo" />

        {activeForm === "login" ? (
          <>
            <h1>Barangay Management System</h1>
            <h3>Sign in to access the complaint and issuance portal</h3>
          </>
        ) : (
          <>
            <h1>Create Account</h1>
            <h3>Register for Barangay Management System access.</h3>
          </>
        )}

        <form onSubmit={activeForm === "login" ? handleLogin : handleRegister}>
          <div className="input-group">
            <img src={EmailIcon} alt="emailicon" className="input-icon" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {activeForm === "register" && (
            <div className="input-group">
              <img src={LoginProfile} alt="usericon" className="input-icon" />
              <input
                type="text"
                placeholder="Enter Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
          )}

          <div className="input-group">
            <img src={LockIcon} alt="passwordicon" className="input-icon" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {activeForm === "register" && (
            <div className="input-group">
              <img src={LockIcon} alt="passwordicon" className="input-icon" />
              <input
                type="password"
                placeholder="Confirm Your Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          )}

          <button type="submit">
            {activeForm === "login" ? "Sign In" : "Register"}
          </button>
        </form>

        <p>
          {activeForm === "login" ? (
            <>
              Don’t have an account?{" "}
              <a href="#" onClick={() => setActiveForm("register")}>
                Register here
              </a>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <a href="#" onClick={() => setActiveForm("login")}>
                Login
              </a>
            </>
          )}
        </p>
      </div>
    </div>
  );
}

export default Login;