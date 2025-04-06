import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebook, FaInstagram, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer
            style={{
                background: '#0A2647',
                color: 'white',
                padding: '20px 0',
                marginTop: '40px',
                fontFamily: "'Poppins', sans-serif",
            }}
        >
            <Container>
                <Row>
                    {/* Contact Us Section */}
                    <Col md={4} className="text-center mb-4">
                        <h5 style={{ fontWeight: 'bold' }}>Contact Us</h5>
                        <p>
                            Email: <a href="mailto:support@easeresume.com" style={{ color: 'white' }}>support@easeresume.com</a>
                        </p>
                        <p>Phone: +91-987-654-3210</p>
                    </Col>

                    {/* Social Media Links */}
                    <Col md={4} className="text-center mb-4">
                        <h5 style={{ fontWeight: 'bold' }}>Follow Us</h5>
                        <a
                            href="https://www.facebook.com/easeresume"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                color: 'white',
                                margin: '0 15px',
                                fontSize: '24px',
                                transition: 'color 0.3s ease',
                            }}
                            onMouseEnter={(e) => e.target.style.color = '#2D9CDB'}
                            onMouseLeave={(e) => e.target.style.color = 'white'}
                        >
                            <FaFacebook />
                        </a>
                        <a
                            href="https://www.instagram.com/easeresume"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                color: 'white',
                                margin: '0 15px',
                                fontSize: '24px',
                                transition: 'color 0.3s ease',
                            }}
                            onMouseEnter={(e) => e.target.style.color = '#2D9CDB'}
                            onMouseLeave={(e) => e.target.style.color = 'white'}
                        >
                            <FaInstagram />
                        </a>
                    </Col>

                    {/* About Section */}
                    <Col md={4} className="text-center mb-4">
                        <h5 style={{ fontWeight: 'bold' }}>About EaseResume</h5>
                        <p>
                            Build stunning resumes with ease. Choose templates, customize sections, and download your professional CV in seconds.
                        </p>
                    </Col>
                </Row>
                <hr style={{ background: 'white', margin: '20px 0' }} />
                <p className="text-center mb-0" style={{ fontSize: '14px' }}>
                    © 2025 EaseResume. All Rights Reserved.
                </p>
            </Container>
        </footer>
    );
};

export default Footer;
