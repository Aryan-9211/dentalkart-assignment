import React, { useState, useEffect } from "react";
import generateToken from "./Utils/generateToken";
import Login from "./Login/Login";
import Dashboard from "./Dashboard/Dashboard";

function Auth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setIsLoggedIn(true);
      setToken(storedToken);
    }
  }, []);

  function handleLogin(email, password) {
    if (email === "aryan@gmail.com" && password === "123456") {
      const token = generateToken(); // Generate a random token
      setIsLoggedIn(true);
      setToken(token);
      localStorage.setItem("token", token); // Save the token in local storage
    } else {
      alert("Invalid credentials");
    }
  }

  function handleLogout() {
    setIsLoggedIn(false);
    setToken(null);
    localStorage.removeItem("token"); // Remove the token from local storage
  }

  return (
    <div>
      {isLoggedIn ? (
        <Dashboard onLogout={handleLogout} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

export default Auth;
