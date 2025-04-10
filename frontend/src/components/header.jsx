import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearCredentials } from '../slices/userAuthSlice';
import { useNavigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import api from '../axios';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const user = useSelector((state) => state.auth.user);

  const handleLogout = async () => {
    try {
      await api.post('/users/logout');
      dispatch(clearCredentials());
      navigate('/users/Login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{
        backgroundColor: '#0A2647',
        padding: '12px 50px',
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <div className="container-fluid">
        <Link
          className="navbar-brand text-white"
          to="/"
          style={{
            fontSize: '1.8rem',
            fontWeight: '700',
          }}
        >
          EaseResume
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

        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            {user ? (
              <>
                <li className="nav-item">
                  <span
                    className="nav-link text-white"
                    style={{ fontSize: '1rem', fontWeight: '500', marginLeft: '30px' }}
                  >
                    Welcome, {user.name}
                  </span>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link text-white"
                    href="#"
                    onClick={handleLogout}
                    style={{ fontSize: '1rem', fontWeight: '500', marginLeft: '30px' }}
                  >
                    Logout
                  </a>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link
                    className="nav-link text-white"
                    to="/users/Login"
                    style={{ fontSize: '1rem', fontWeight: '500', marginLeft: '30px' }}
                  >
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link text-white"
                    to="/users/Register"
                    style={{ fontSize: '1rem', fontWeight: '500', marginLeft: '30px' }}
                  >
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
};

export default Header;
