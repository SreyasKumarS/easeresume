import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearCredentials } from '../slices/userAuthSlice';
import { useNavigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import api from '../axios';
import { FaUserCircle, FaSignOutAlt } from 'react-icons/fa';

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
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
      <div className="container">
        {/* Logo/Brand with Gradient Text */}
        <Link
          className="navbar-brand"
          to="/"
          style={{
            fontSize: '1.8rem',
            fontWeight: '700',
            display: 'flex',
            alignItems: 'center',
            background: 'linear-gradient(135deg, #6B46C1 0%, #38B2AC 100%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
            textDecoration: 'none'
          }}
        >
          EaseResume
        </Link>

        {/* Mobile Toggle */}
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

        {/* Navigation Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-lg-center">
            {user ? (
              <>
                {/* Dashboard Link */}
                <li className="nav-item me-3">
                  <Link
                    className="nav-link"
                    to="/dashboard"
                    style={{
                      fontWeight: '500',
                      color: '#4b5563',
                      transition: 'color 0.2s'
                    }}
                  >
                    Dashboard
                  </Link>
                </li>
                
                {/* User Dropdown */}
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle d-flex align-items-center"
                    href="#"
                    id="userDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{
                      color: '#1f2937',
                      fontWeight: '500'
                    }}
                  >
                    <FaUserCircle className="me-2" size={20} />
                    {user.name.split(' ')[0]}
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                    {/* <li>
                      <Link className="dropdown-item" to="/profile">
                        My Profile
                      </Link>
                    </li> */}
                    {/* <li>
                      <Link className="dropdown-item" to="/settings">
                        Account Settings
                      </Link>
                    </li> */}
                    {/* <li><hr className="dropdown-divider" /></li> */}
                    <li>
                      <button
                        className="dropdown-item d-flex align-items-center"
                        onClick={handleLogout}
                      >
                        <FaSignOutAlt className="me-2" />
                        Logout
                      </button>
                    </li>
                  </ul>
                </li>
              </>
            ) : (
              <>
                {/* Login */}
                <li className="nav-item me-3">
                  <Link
                    className="nav-link"
                    to="/users/Login"
                    style={{
                      fontWeight: '500',
                      color: '#4b5563',
                      transition: 'color 0.2s'
                    }}
                  >
                    Login
                  </Link>
                </li>
                
                {/* Register - Highlighted Button */}
                <li className="nav-item">
                  <Link
                    className="btn btn-primary px-3 py-2"
                    to="/users/Register"
                    style={{
                      fontWeight: '500',
                      borderRadius: '8px',
                      backgroundColor: '#2563eb',
                      border: 'none',
                      boxShadow: '0 1px 3px rgba(37, 99, 235, 0.2)'
                    }}
                  >
                    Get Started Free
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