import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import api from '../axios';
import { setCredentials } from "../slices/userAuthSlice";
import { useDispatch, useSelector } from "react-redux";
import teamCollaborationImage from '../assests/pexels-jopwell-2422293.jpg'; // Adjust the path based on your project structure

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (user) {
      navigate('/users/Dashboard');
    }
  }, [user, navigate]);

  const handleSubmit = async () => {
    try {
      const response = await api.post('/users/Login', { email, password });
      const result = response.data;

      dispatch(setCredentials(result));
      navigate('/users/Dashboard');
      toast.success("Login successful!");
      console.log('Login success result:', result);
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        backgroundColor: '#f8fafc', // Match dashboard background
        fontFamily: "'Inter', sans-serif", // Match dashboard font
      }}
    >
      {/* Left Side: Form */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '50px',
          background: 'linear-gradient(135deg, rgba(20, 184, 166, 0.1) 0%, rgba(165, 180, 252, 0.1) 100%)', // Match dashboard hero gradient
        }}
      >
        <h2
          style={{
            fontSize: '24px',
            fontWeight: '800', // Match dashboard h1 weight
            color: '#1e293b', // Match dashboard heading color
            marginBottom: '30px',
          }}
        >
          Log In to Resume Builder
        </h2>

        <Form style={{ maxWidth: '400px' }}>
          <Form.Group controlId="email" style={{ marginBottom: '20px' }}>
            <Form.Label style={{ color: '#1e293b', fontSize: '14px' }}>
              Email
            </Form.Label>
            <Form.Control
              type="email"
              placeholder="yourname@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                padding: '12px',
                borderRadius: '25px',
                border: '1px solid #e2e8f0', // Match dashboard border color
                backgroundColor: '#FFF',
                fontSize: '14px',
                color: '#1e293b',
                boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
              }}
            />
          </Form.Group>

          <Form.Group controlId="password" style={{ marginBottom: '30px' }}>
            <Form.Label style={{ color: '#1e293b', fontSize: '14px' }}>
              Password
            </Form.Label>
            <Form.Control
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                padding: '12px',
                borderRadius: '25px',
                border: '1px solid #e2e8f0', // Match dashboard border color
                backgroundColor: '#FFF',
                fontSize: '14px',
                color: '#1e293b',
                boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
              }}
            />
          </Form.Group>

          <Button
            onClick={handleSubmit}
            style={{
              width: '100%',
              background: 'linear-gradient(90deg, #14b8a6, #a5b4fc)', // Match dashboard main-cta gradient
              border: 'none',
              color: '#FFF', // White text for contrast
              fontWeight: '600', // Match dashboard font weight
              padding: '12px',
              borderRadius: '8px', // Match dashboard border-radius
              marginBottom: '20px',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease', // Match dashboard hover effects
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-3px)';
              e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'none';
            }}
          >
            Log In
          </Button>

          {/* Social Login Buttons */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '20px',
            }}
          >
          </div>

          {/* Terms Link */}
          <p
            style={{
              textAlign: 'center',
              fontSize: '12px',
              color: '#475569', // Match dashboard subtitle color
            }}
          >
            By signing up, you agree to our{' '}
            <Link
              to="/terms"
              style={{
                color: '#14b8a6', // Match dashboard accent color
                textDecoration: 'underline',
              }}
            >
              Terms & Conditions
            </Link>
          </p>
        </Form>
      </div>

      {/* Right Side: Image with Overlays */}
      <div
        style={{
          flex: 1,
          backgroundColor: '#f8fafc', // Match dashboard background
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img
          src={teamCollaborationImage}
          alt="Team collaborating at a desk"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            position: 'relative',
          }}
        />
      </div>
    </div>
  );
};

export default LoginPage;