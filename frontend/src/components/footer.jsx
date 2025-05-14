import React from 'react';
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-grid">
                    {/* Contact Us Section */}
                    <div className="footer-section">
                        <h5>Get in Touch</h5>
                        <p>
                            <a href="mailto:hello@easeresume.com">hello@easeresume.com</a>
                        </p>
                        <p>Support: support.easeresume.com</p>
                    </div>

                    {/* Social Media Links */}
                    <div className="footer-section">
                        <h5>Connect with Us</h5>
                        <div className="social-links">
                            <a
                                href="https://www.facebook.com/easeresume"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Facebook"
                            >
                                <FaFacebook />
                            </a>
                            <a
                                href="https://www.instagram.com/easeresume"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Instagram"
                            >
                                <FaInstagram />
                            </a>
                            <a
                                href="https://www.linkedin.com/company/easeresume"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="LinkedIn"
                            >
                                <FaLinkedin />
                            </a>
                        </div>
                    </div>

                    {/* About Section */}
                    <div className="footer-section">
                        <h5>EaseResume</h5>
                        <p>
                            Empowering careers with AI-driven resume tools and sleek, customizable templates.
                        </p>
                    </div>
                </div>
                <p className="footer-copyright">
                    © 2025 EaseResume. Built for the future.
                </p>
            </div>
        </footer>
    );
};

export default Footer;