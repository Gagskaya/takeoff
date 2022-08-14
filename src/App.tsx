import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import Login from "./routes/Login";
import Register from "./routes/Register";
import Home from "./routes/Home";

import "./App.scss";

function App() {
  const loggedInUser = localStorage.getItem("loggedInUser");
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedInUser) {
      navigate("/home");
    } else {
      navigate("/login");
    }
  }, [loggedInUser, navigate]);
  return (
    <div className="app">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
