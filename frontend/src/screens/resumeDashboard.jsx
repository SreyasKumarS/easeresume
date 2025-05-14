import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Modal } from 'react-bootstrap';
import { FaPlusCircle, FaEdit, FaTrash, FaEye, FaFilePdf } from 'react-icons/fa';
import ResumeForm from '../components/resumeForm';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import api from '../axios';
import ResumeIllustration from "../../src/assests/resume-apply-work-form-concept (1).jpg";
import { Image } from 'react-bootstrap';
import './Dashboard.css'; // Create this CSS file for custom styles

const Dashboard = () => {
  const [showForm, setShowForm] = useState(false);
  const [resumes, setResumes] = useState([]);
  const [selectedResume, setSelectedResume] = useState(null);
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const handleShow = () => {
    setSelectedResume(null);
    setShowForm(true);
  };

  const handleEdit = (resume) => {
    setSelectedResume(resume);
    setShowForm(true);
  };

  const handleDelete = async (resumeId) => {
    if (window.confirm("Are you sure you want to delete this resume?")) {
      try {
        await api.delete(`/users/delete-resumes/${resumeId}`);
        fetchResumes();
      } catch (error) {
        console.error("Error deleting resume", error.response?.data || error.message);
      }
    }
  };

  const handleClose = () => {
    setShowForm(false);
    setSelectedResume(null);
  };

  const fetchResumes = async () => {
    try {
      const response = await api.get(`/users/get-resumes?userId=${user.id}`);
      setResumes(response.data.resumes);
    } catch (error) {
      console.error('Failed to fetch resumes', error.response?.data || error.message);
    }
  };

  useEffect(() => {
    if (user && user.id) {
      fetchResumes();
    }
  }, [user]);

  return (
    <Container fluid className="dashboard-container">
      {/* Hero Section */}
      <section className="dashboard-hero">
        <Row className="align-items-center">
          <Col md={6} className="hero-content">
            <h1>Welcome back, {user?.name?.split(' ')[0] || 'User'}!</h1>
            <p className="subtitle">
              Craft your perfect resume with <strong>EaseResume</strong> - the smart way to showcase your professional journey.
            </p>
            <div className="cta-buttons">
              <Button variant="primary" onClick={handleShow} className="main-cta">
                <FaPlusCircle className="me-2" />
                Create New Resume
              </Button>
              <Button variant="outline-primary" onClick={() => navigate('/templates')}>
                Browse Templates
              </Button>
            </div>
          </Col>
          <Col md={6} className="hero-image">
            <Image 
              src={ResumeIllustration}
              alt="Resume creation illustration"
              fluid
              className="illustration-img"
            />
          </Col>
        </Row>
      </section>

      {/* Stats Section */}
      <section className="dashboard-stats">
        <Row>
          <Col md={4}>
            <Card className="stat-card">
              <Card.Body>
                <h3>{resumes.length}</h3>
                <p>Resumes Created</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="stat-card">
              <Card.Body>
                <h3>{resumes.filter(r => r.isDefault).length}</h3>
                <p>Primary Resumes</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="stat-card">
              <Card.Body>
                <h3>0</h3>
                <p>Downloads This Month</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </section>

      <section className="resumes-section">
        {resumes.length === 0 ? (
          <Card className="empty-state">
            <Card.Body>
              <Image src="/empty-resumes.svg" className="empty-icon" />
              <h4>No resumes yet</h4>
              <p>Get started by creating your first professional resume</p>
              <Button variant="primary" onClick={handleShow}>
                <FaPlusCircle className="me-2" />
                Build Resume
              </Button>
            </Card.Body>
          </Card>
        ) : (
          <Row className="resume-grid">
            {resumes.map((resume) => (
              <Col xl={3} lg={4} md={6} key={resume._id}>
                <Card className="resume-card">
                  <div className="resume-thumbnail">
                    {/* Placeholder for resume thumbnail image */}
                    <div className="thumbnail-placeholder">
                      {resume.jobTitle?.charAt(0) || 'R'}
                    </div>
                  </div>
                  <Card.Body>
                    <h5 className="resume-title">{resume.jobTitle || 'Untitled Resume'}</h5>
                    <p className="resume-meta">
                      Last updated: {new Date(resume.updatedAt).toLocaleDateString()}
                    </p>
                    <div className="resume-actions">
                      <Button
                        onClick={() => navigate(`/users/ResumePreview/${resume._id}`, { state: { formData: resume } })}
                        style={{
                          background: 'linear-gradient(90deg, #14b8a6, #a5b4fc)', // Match dashboard gradient
                          border: 'none',
                          color: '#FFF',
                          fontSize: '0.85rem',
                          padding: '6px 12px',
                          borderRadius: '6px',
                          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                          display: 'flex',
                          alignItems: 'center',
                          marginRight: '8px',
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.transform = 'translateY(-2px)';
                          e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.transform = 'translateY(0)';
                          e.target.style.boxShadow = 'none';
                        }}
                      >
                        <FaEye style={{ marginRight: '4px' }} /> Preview
                      </Button>
                      <Button
                        onClick={() => handleEdit(resume)}
                        style={{
                          backgroundColor: '#E2E8F0', // Subtle gray background
                          border: 'none',
                          color: '#64748b', // Match dashboard secondary text
                          fontSize: '0.85rem',
                          padding: '6px 12px',
                          borderRadius: '6px',
                          transition: 'background-color 0.2s ease, transform 0.2s ease',
                          display: 'flex',
                          alignItems: 'center',
                          marginRight: '8px',
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = '#CBD5E1';
                          e.target.style.transform = 'translateY(-2px)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = '#E2E8F0';
                          e.target.style.transform = 'translateY(0)';
                        }}
                      >
                        <FaEdit style={{ marginRight: '4px', color: '#64748b' }} /> Edit
                      </Button>
                      <Button
                        onClick={() => handleDelete(resume._id)}
                        style={{
                          backgroundColor: '#FEE2E2', // Soft red background
                          border: 'none',
                          color: '#EF4444', // Match dashboard danger color
                          fontSize: '0.85rem',
                          padding: '6px 12px',
                          borderRadius: '6px',
                          transition: 'background-color 0.2s ease, transform 0.2s ease',
                          display: 'flex',
                          alignItems: 'center',
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = '#FECACA';
                          e.target.style.transform = 'translateY(-2px)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = '#FEE2E2';
                          e.target.style.transform = 'translateY(0)';
                        }}
                      >
                        <FaTrash style={{ marginRight: '4px', color: '#EF4444' }} /> Delete
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </section>

      {/* Resume Form Modal */}
      <Modal show={showForm} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>{selectedResume ? 'Edit Resume' : 'Create New Resume'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ResumeForm
            onClose={() => {
              handleClose();
              fetchResumes();
            }}
            existingResume={selectedResume}
          />
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Dashboard;







