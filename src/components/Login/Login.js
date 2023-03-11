import React, { useState } from "react";
import "./Login.css";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onLogin(email, password);
  }

  //FORM WITH HARDCODED EMAIL AND PASSWORD TO PASS THE LOGIN SCREEN
  return (
    <div className="login-div">
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className="signup-text">Don’t have an account ? Signup instead</p>
        <button type="submit" className="Login-btn">
          Submit
        </button>
        <span
          style={{ fontWeight: "bold", margin: "10px 0", fontSize: "20px" }}
        >
          OR
        </span>
        <button type="submit" className="google-btn">
          <img
            style={{
              width: "30px",
              height: "30px",
              borderRadius: "50%",
              marginRight: "15px",
            }}
            src={process.env.PUBLIC_URL + "/images/google.png"}
          ></img>
          Login with Google
        </button>
      </form>
    </div>
  );
}

export default Login;
