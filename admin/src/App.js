import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Header from "./components/Header";
import "./app.styles.scss";
import Dashboard from "./pages/Dashboard/Dashboard";

function App() {
  useEffect(() => {
    const getData = async () => {
      const res = await fetch("/api/rooms");
      const data = await res.json();

      console.log(data);
    };
    getData();
  }, []);

  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
