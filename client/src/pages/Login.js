import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../providers/authContext";
import "./Login.css";

function Login() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      var res = await auth.login(loginUsername, loginPassword);
      if (res) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      var res = await auth.signup(registerUsername, registerPassword);
      if (res) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth.user) {
      navigate("/");
    }
  }, [auth.user, navigate]);

  return (
    <>
      <div className="auth-background"></div>
      <div className="auth">
        <div className="main">
          <input
            className="auth-input"
            type="checkbox"
            id="chk"
            aria-hidden="true"
          />

          <div className="signup">
            <form onSubmit={handleSignup}>
              <label
                className="signup-text-label"
                htmlFor="chk"
                aria-hidden="true"
              >
                Sign up
              </label>
              <input
                className="auth-input"
                type="text"
                name="txt"
                placeholder="Username"
                onChange={(e) => setRegisterUsername(e.target.value)}
                value={registerUsername}
                required
              />
              <input
                className="auth-input"
                type="password"
                name="pswd"
                placeholder="Password"
                required
                onChange={(e) => setRegisterPassword(e.target.value)}
                value={registerPassword}
              />
              <button className="auth-button">Sign up</button>
            </form>
          </div>

          <div className="login">
            <form onSubmit={handleLogin}>
              <label
                className="login-text-label"
                htmlFor="chk"
                aria-hidden="true"
              >
                Login
              </label>
              <input
                className="auth-input"
                type="text"
                name="Username"
                placeholder="Username"
                onChange={(e) => setLoginUsername(e.target.value)}
                required
              />
              <input
                className="auth-input"
                type="password"
                name="pswd"
                placeholder="Password"
                onChange={(e) => setLoginPassword(e.target.value)}
                required
              />
              <button className="auth-button">Login</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
