import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Modal } from 'react-bootstrap';
import { FaPlusCircle, FaEdit, FaTrash } from 'react-icons/fa';
import ResumeForm from '../components/resumeForm';
import { useSelector} from 'react-redux';
import {useNavigate } from 'react-router-dom';
import api from '../axios';
import ResumeIllustration from '../../src/assests/resume-apply-work-form-concept (1).jpg'
import { Image } from 'react-bootstrap';

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
    <Container fluid style={{ padding: '2rem', backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      
      <Card className="mb-4 shadow-sm" style={{ background: '#ffffff' }}>
    <Card.Body>
      <Row className="align-items-center">
        {/* Left Side - Text */}
        <Col md={6}>
          <h3 style={{ fontWeight: '600', color: '#0d6efd' }}>
            Welcome, {user?.name?.split(' ')[0] || 'User'}!
          </h3>
          <p style={{ marginBottom: '1rem', color: '#6c757d' }}>
            <strong>EaseResume</strong> makes resume building simple, smart, and hassle-free. Create professional resumes in minutes.
          </p>
          <Button variant="primary" onClick={handleShow}>
            <FaPlusCircle className="me-2" />
            Build Resume
          </Button>
        </Col>

        {/* Right Side - Image */}
        <Col md={6} className="text-center">
        <Image 
            src={ResumeIllustration}
            alt="Resume Illustration"
            fluid
            style={{ maxHeight: '300px' }}
          />

        </Col>
      </Row>
    </Card.Body>
  </Card>

      {/* Resume Previews */}
      <h5 className="mb-3" style={{ fontWeight: '500' }}>Your Resumes</h5>
      <Row>
        {resumes.length === 0 ? (
          <Col>
            <p className="text-muted">No resumes yet. Click "Build Resume" to get started!</p>
          </Col>
        ) : (
          resumes.map((resume) => (
            <Col md={6} lg={4} key={resume._id} className="mb-4">
<Card
  className="shadow-sm"
  style={{
    padding: '0.6rem',
    marginBottom: '1rem',
    borderLeft: '4px solid #0d6efd',
    fontSize: '0.7rem',
    width: '300px',
    minHeight: 'fit-content',
    backgroundColor: '#f8f9fa',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  }}
>
  <div>
    <h7 style={{ color: '#0d6efd', marginBottom: '0.2rem' }}>{resume.jobTitle}</h7>
    <h6 style={{ color: '#0d6efd', marginBottom: '0.2rem' }}>{resume.fullName}</h6>
    <p style={{ margin: '0 0 0.2rem', color: '#555' }}>{resume.email} | {resume.phone}</p>

    <strong>Summary:</strong>
    <p>{resume.summary}</p>

    <strong>Skills:</strong>
    <p>{resume.skills?.[0]}</p>

    <strong>Experience:</strong>
    {resume.experience?.map((exp, idx) => (
      <div key={idx}>
        <p><strong>{exp.role}</strong> at <strong>{exp.company}</strong></p>
        <p>Duration: {exp.duration} years</p>
        <p>{exp.description}</p>
      </div>
    ))}

    <strong>Education:</strong>
    {resume.education?.map((edu, idx) => (
      <p key={idx}>
        {edu.degree} - {edu.institution} ({edu.year})
      </p>
    ))}

    {resume.achievements?.length > 0 && (
      <>
        <strong>Achievements:</strong>
        <ul style={{ paddingLeft: '1.2rem' }}>
          {resume.achievements.map((a, i) => (
            <li key={i}>{a}</li>
          ))}
        </ul>
      </>
    )}

    {resume.certifications?.length > 0 && (
      <>
        <strong>Certifications:</strong>
        <ul style={{ paddingLeft: '1.2rem' }}>
          {resume.certifications.map((c, i) => (
            <li key={i}>{c}</li>
          ))}
        </ul>
      </>
    )}

    {resume.links?.linkedin || resume.links?.portfolio ? (
      <>
        <strong>Links:</strong>
        <ul style={{ paddingLeft: '1.2rem' }}>
          {resume.links?.linkedin && <li>LinkedIn: {resume.links.linkedin}</li>}
          {resume.links?.portfolio && <li>Portfolio: {resume.links.portfolio}</li>}
        </ul>
      </>
    ) : null}
  </div>

  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
    <Button
      variant="outline-primary"
      size="sm"
      className="me-2"
      onClick={() => handleEdit(resume)}
    >
      <FaEdit /> Edit
    </Button>
    <Button
      variant="outline-danger"
      size="sm"
      onClick={() => handleDelete(resume._id)}
    >
      <FaTrash /> Delete
    </Button>

<Button
  variant="outline-success"
  size="sm"
  onClick={() =>
    navigate(`/users/ResumePreview/${resume._id}`, { state: { formData: resume } })
  }
>
  Preview & Download
</Button>


  </div>
</Card>


            </Col>
          ))
        )}
      </Row>

      {/* Resume Form Modal */}
      <Modal show={showForm} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{selectedResume ? 'Edit Resume' : 'Build Resume'}</Modal.Title>
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

