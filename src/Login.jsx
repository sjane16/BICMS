import { useState, useEffect } from "react";
import {toast, ToastContainer } from "react-toastify";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Login.css";
import Logo from './assets/BICMS_logo.png'
import LoginProfile from './assets/loginprofile.png'
import EmailIcon from './assets/messageicon.png'
import LockIcon from './assets/lockicon.png'
import notVisible from './assets/notvisible.png'
import Visible from './assets/visible.png'

function Login() {
  const location = useLocation();
  const [activeForm, setActiveForm] = useState("login");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState({
    passwordMatch: "",
    registerError: "",
    loginError: ""
  });

  const handleVisibility = (e) => {
    setShowPassword(!showPassword)
  };

  const handleConfirmVisibility = (e) => {
    setShowConfirm(!showConfirm)
  };


  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/register") {
      setActiveForm("register");
    } else {
      setActiveForm("login");
    }
  }, [location.pathname]);

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    
    if (password && value && password !== value) {
      setErrors({ ...errors, passwordMatch: "Passwords do not match" });
    } else {
      setErrors({ ...errors, passwordMatch: "" });
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    
    if (confirmPassword && value !== confirmPassword) {
      setErrors({ ...errors, passwordMatch: "Passwords do not match" });
    } else {
      setErrors({ ...errors, passwordMatch: "" });
    }
  };

  

  const handleRegister = async (e) => {
    const API_URL = import.meta.env.VITE_API_URL;
    e.preventDefault();
    
    setErrors({ passwordMatch: "", registerError: "", loginError: "" });
    
    if (password !== confirmPassword) {
      setErrors({ ...errors, passwordMatch: "Passwords do not match" });
      return;
    }
    
    try {
      const res = await fetch(`${API_URL}/register.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lastName, firstName, middleName, email, password }),
      });
      
      const data = await res.json();
      
      if (data.status === "error" || data.status === "fail" || (!data.status && data.message)) {
        setErrors({ ...errors, registerError: data.message || "Error registering user" });
        toast.error(data.message || "Registration failed!");
        return;
      }
      
    
      if (data.status === "success") {
        toast.success("Registration successful! Please login.", {autoClose: 2000});
        setLastName("");
        setFirstName("");
        setMiddleName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setActiveForm("login");
      } else {


        setErrors({ ...errors, registerError: "Unexpected response from server" });
        toast.error("Registration failed!");
      }
    } catch (err) {
      console.error(err);
      setErrors({ ...errors, registerError: "Error registering user" });
      toast.error("Error registering user");
    }
  };

  const handleLogin = async (e) => {
    const API_URL = import.meta.env.VITE_API_URL;
    e.preventDefault();
    
    setErrors({ passwordMatch: "", registerError: "", loginError: "" });
    
    try {
      const res = await fetch(`${API_URL}/login.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });
      
      const data = await res.json();
      
    
      if (data.status === "error" || data.status === "fail" || (!data.status && data.message && !data.role)) {
        toast.error(data.message || "Login failed! Invalid Credentials");
        setErrors({ ...errors, loginError: data.message || "Invalid credentials"});
        return;
      }
      
  
      if (data.status === "success" || (data.role && data.fullname)) {
        localStorage.setItem('fullname', data.fullname);
        localStorage.setItem('role', data.role);
        toast.success("Login successful!", {autoClose: 2000});
        
        if (data.role === "admin") {
          setTimeout(() => navigate('/dashboard'), 1000);
        } else if (data.role === "user") {
          setTimeout(() => navigate('/userdashboard'), 1000);
        } else {
    
          setTimeout(() => navigate('/dashboard'), 1000);
        }
      } else {
        toast.error("Login failed! Invalid response from server");
        setErrors({ ...errors, loginError: "Invalid response from server"});
      }
    } catch (err) {
      console.error(err);
      setErrors({ ...errors, loginError: "Error logging in" });
      toast.error("Error logging in");
    }
  };

  return (
    <div className="login-page-wrapper">
      <ToastContainer position = "top-right" autoClose = {2500} />

      <div className="welcome-container">
        <div className="welcome-content">
          <Link to ="/">
          <div className="brgy-badge">  🡠 &nbsp; Return to Home Page</div>
          </Link>
          <h1 className="welcome-title">
            Welcome, <br/>
            <span className="highlight">Barangay 134 Residents!</span>
          </h1>
          <p className="welcome-description">
           Through this system, you can
request barangay certificates or file
complaints in a much more convenient and
quicker manner. Just fill out the necessary
details, and the staffs will take a look, answer
and facilitate your request or complaint!
          </p>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📄</div>
              <div className="feature-text">
                <h4>Document Issuance</h4>
                <p>Request certificates online</p>
              </div>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">💬</div>
              <div className="feature-text">
                <h4>File Complaints</h4>
                <p>Report community concerns</p>
              </div>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <div className="feature-text">
                <h4>Track Status</h4>
                <p>Monitor your requests</p>
              </div>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🔔</div>
              <div className="feature-text">
                <h4>Get Updates</h4>
                <p>Real-time notifications</p>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className="login-container">
        <div className="login-form-box active">
          <div className="logo-section">
            <img src={Logo} alt="Barangay 314 Logo" className="login-bicms-logo" />
          </div>

          {activeForm === "login" ? (
            <>
              <h1 className="login-title">Welcome</h1>
              <p className="login-subtitle">Sign in to access your barangay portal</p>
            </>
          ) : (
            <>
              <h1 className="login-title">Create Account</h1>
              <p className="login-subtitle">Register for Barangay Management System access</p>
            </>
          )}

          <form className="login-form" onSubmit={activeForm === "login" ? handleLogin : handleRegister}>
            <div className={`login-input-group ${activeForm === "login" && errors.loginError ? "input-error" : ""}`}>
              <img src={EmailIcon} alt="Email" className="login-input-icon" />
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {activeForm === "register" && (
              <>
              <div className="login-input-group">
                <img src={LoginProfile} alt="User" className="login-input-icon" />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
          
              <div className="login-input-group">
                <img src={LoginProfile} alt="User" className="login-input-icon" />
                <input
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>

              <div className="login-input-group">
                <img src={LoginProfile} alt="User" className="login-input-icon" />
                <input
                  type="text"
                  placeholder="Middle Name"
                  value={middleName}
                  onChange={(e) => setMiddleName(e.target.value)}
                  required
                />
              </div>
              </>
              )}
            
            <div className={`login-input-group ${activeForm === "login" && errors.loginError ? "input-error" : ""}`}>
              <img src={LockIcon} alt="Password" className="login-input-icon" />
              <img src={showPassword ? Visible : notVisible} alt="Not Visible Icon" className="not-visible-icon" onClick={handleVisibility} />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={handlePasswordChange}
                required
              />
            </div>

            {activeForm === "register" && (
              <>
                <div className={`login-input-group ${errors.passwordMatch ? "input-error" : ""}`}>
                  <img src={LockIcon} alt="Confirm Password" className="login-input-icon" />
                  <img src={showConfirm ? Visible : notVisible} alt="Visibility Icon" className="not-visible-icon" onClick={handleConfirmVisibility} />
                  <input
                    type={showConfirm ? "text" : "password"}
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    required
                  />
                </div>
                {errors.passwordMatch && (
                  <span className="error-message">{errors.passwordMatch}</span>
                )}
              </>
            )}

            {activeForm === "login" && (
              <div className="form-options">
                <Link to="/forgot-password" className="forgot-link">
                  Forgot password?
                </Link>
              </div>
            )}

            <button className="login-submit-btn" type="submit">
              {activeForm === "login" ? "Sign In" : "Create Account"}
            </button>
            
            {activeForm === "login" && errors.loginError && (
              <span className="error-message">{errors.loginError}</span>
            )}
            {activeForm === "register" && errors.registerError && (
              <span className="error-message">{errors.registerError}</span>
            )}
          </form>

          <p className="login-toggle-text">
            {activeForm === "login" ? (
              <>
                Don't have an account?{" "}
                <Link to="/register" className="login-link">Register here</Link>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <Link to="/login" className="login-link">Sign in</Link>
              </>
            )}
          </p>
        </div>
      </div>     
    </div>
  );
}

export default Login;
