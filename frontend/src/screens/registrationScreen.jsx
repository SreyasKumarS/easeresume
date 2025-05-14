import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from "react-bootstrap";
import { toast } from 'react-toastify';
import api from '../axios';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [timer, setTimer] = useState(40);
  const [resendDisabled, setResendDisabled] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    let interval = null;
    if (isOtpSent && resendDisabled) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }

    if (timer === 0) {
      setResendDisabled(false);
      clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timer, isOtpSent, resendDisabled]);

  const validateName = (name) => /^[A-Za-z\s]{3,}$/.test(name);
  const validateEmail = (email) => email.includes("@");
  const validatePassword = (password) => password.length >= 4;

  const submitHandler = async (e) => {
    e.preventDefault();
  
    if (!isOtpSent) {
      if (!validateName(name)) {
        toast.error('Name must be at least 3 characters and contain only letters.');
      } else if (!validateEmail(email)) {
        toast.error('Invalid email format.');
      } else if (!validatePassword(password)) {
        toast.error('Password must be at least 4 characters.');
      } else if (password !== confirmPassword) {
        toast.error('Passwords do not match.');
      } else {
        try {
          const formData = { name, email, password };
          await api.post('/users/register', formData);
          setIsOtpSent(true);  
          setTimer(40);
          setResendDisabled(true); 
        } catch (error) {
          toast.error('Registration failed. Please try again.');
        }
      }
    } else if (isOtpSent && otp.trim() !== '') {
      try {
        await api.post('/users/verify-otp', { email, otp });
        toast.success('Registration completed successfully!');
        navigate('/users/Login');
      } catch (error) {
        toast.error('Invalid OTP!');
      }
    } else {
      toast.error('Please enter the OTP.');
    }
  };

  const resendOtpHandler = async () => {
    try {
      await api.post('/users/resend-otp', { email });
      setTimer(40);
      setResendDisabled(true);
    } catch (error) {
      toast.error('Failed to resend OTP');
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F9FAFB', // Match dashboard background
        fontFamily: "'Inter', sans-serif", // Match dashboard font
        padding: '20px',
      }}
    >
      <div
        style={{
          maxWidth: '500px',
          width: '100%',
          padding: '40px',
          background: 'linear-gradient(135deg, rgba(20, 184, 166, 0.1) 0%, rgba(165, 180, 252, 0.1) 100%)', // Match login page gradient
          borderRadius: '12px',
        }}
      >
        <h1
          style={{
            fontSize: '24px',
            fontWeight: '800', // Match dashboard h1 weight
            color: '#1e293b', // Match dashboard heading color
            marginBottom: '30px',
            textAlign: 'center',
          }}
        >
          {!isOtpSent ? 'Sign Up' : 'Enter OTP'}
        </h1>

        <Form>
          {!isOtpSent ? (
            <>
              <Form.Group controlId="name" style={{ marginBottom: '20px' }}>
                <Form.Label style={{ color: '#1e293b', fontSize: '14px' }}>
                  Name
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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

              <Form.Group controlId="email" style={{ marginBottom: '20px' }}>
                <Form.Label style={{ color: '#1e293b', fontSize: '14px' }}>
                  Email Address
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

              <Form.Group controlId="password" style={{ marginBottom: '20px' }}>
                <Form.Label style={{ color: '#1e293b', fontSize: '14px' }}>
                  Password
                </Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter Password"
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

              <Form.Group controlId="confirmPassword" style={{ marginBottom: '30px' }}>
                <Form.Label style={{ color: '#1e293b', fontSize: '14px' }}>
                  Confirm Password
                </Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
                onClick={submitHandler}
                style={{
                  width: '100%',
                  background: 'linear-gradient(90deg, #14b8a6, #a5b4fc)', // Match login page main button
                  border: 'none',
                  color: '#FFF',
                  fontWeight: '600',
                  padding: '12px',
                  borderRadius: '8px',
                  marginBottom: '20px',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
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
                Send OTP
              </Button>
            </>
          ) : (
            <>
              <Form.Group controlId="otp" style={{ marginBottom: '20px' }}>
                <Form.Label style={{ color: '#1e293b', fontSize: '14px' }}>
                  OTP
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
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

              <Row className="py-3">
                <Col>
                  <Button
                    onClick={resendOtpHandler}
                    disabled={resendDisabled}
                    style={{
                      color: resendDisabled ? '#475569' : '#14b8a6', // Match dashboard colors
                      textDecoration: 'none',
                      fontSize: '14px',
                      background: 'none',
                      border: 'none',
                      padding: 0,
                    }}
                  >
                    Resend OTP {resendDisabled ? `(${timer})` : ''}
                  </Button>
                </Col>
              </Row>

              <Button
                onClick={submitHandler}
                style={{
                  width: '100%',
                  background: 'linear-gradient(90deg, #14b8a6, #a5b4fc)', // Match login page main button
                  border: 'none',
                  color: '#FFF',
                  fontWeight: '600',
                  padding: '12px',
                  borderRadius: '8px',
                  marginBottom: '20px',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
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
                Verify OTP
              </Button>
            </>
          )}

          {/* Social Login Buttons */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '20px',
            }}
          >
          </div>

          {/* Login Link */}
          <Row>
            <Col
              style={{
                textAlign: 'center',
                fontSize: '12px',
                color: '#475569', // Match login page secondary text
              }}
            >
              Already have an account?{' '}
              <Link
                to="/users/Login"
                style={{
                  color: '#14b8a6', // Match login page link color
                  textDecoration: 'underline',
                }}
              >
                Login
              </Link>
            </Col>
          </Row>

          <hr style={{ borderColor: '#e2e8f0', margin: '20px 0' }} />
        </Form>
      </div>
    </div>
  );
};

export default RegisterScreen;