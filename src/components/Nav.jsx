import React from "react";
import { Link } from "react-router-dom"; // For navigation
import Cookies from 'js-cookie'
import { useNavigate } from "react-router-dom";

function Nav({ isLogin,setIsLogin }) {
  const navigate = useNavigate();
  const handleLogout= () =>{
    Cookies.remove('role');
    Cookies.remove('userId');
    Cookies.remove('isLogin');
    setIsLogin(false)
      navigate('/login')
  }


  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container">
        <Link className="navbar-brand fs-3 " to="/">
          LearnIT
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {isLogin ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/contact-us">
                    Contact Us
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/profile">
                    Profile
                  </Link>
                </li>
                <li className="nav-item">
                  <button className="btn text-white" onClick={handleLogout} >Logout</button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
