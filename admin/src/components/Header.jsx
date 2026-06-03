import React from "react";
import { Link } from "react-router-dom";
import "./header.styles.scss";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, reset } from "../features/auth/authSlice";

const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    dispatch(logoutUser());
    dispatch(reset());
  };
  return (
    <header className="main-header">
      <div className="container">
        <Link to="/">
          <h1 className="logo">Hotel Booking</h1>
        </Link>

        <nav className="">
          <Link to="/">Home</Link>
          <Link to="/rooms">Rooms</Link>
          {user ? (
            <>
              <Link to="/rooms/create">Create</Link>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
