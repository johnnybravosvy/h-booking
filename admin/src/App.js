import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Header from "./components/Header";
import "./app.styles.scss";
import Dashboard from "./pages/Dashboard/Dashboard";
import CreateRoom from "./pages/CreateRoom";
import Rooms from "./pages/Rooms/Rooms";
import Room from "./pages/Room/Room";
import EditRoom from "./pages/EditRoom/EditRoom";
import Booking from "./pages/Booking/Booking";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/rooms/create" element={<CreateRoom />} />
          <Route path="/edit/rooms/:id" element={<EditRoom />} />
          <Route path="/rooms/all/:id" element={<Room />} />
          <Route path="/bookings/:id" element={<Booking />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
