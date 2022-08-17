import React from "react";
import { Route, Routes } from "react-router-dom";

import Login from "./routes/Login";
import Register from "./routes/Register";
import Home from "./routes/Home";

import "./App.scss";

function App() {
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
