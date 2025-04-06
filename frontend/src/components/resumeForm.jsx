import React, { useState,useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import api from '../axios';
import { toast } from "react-toastify";
import { useSelector } from "react-redux";


const ResumeForm = ({ onClose, existingResume }) => {
  const user = useSelector((state) => state.auth.user);
  console.log(user,'frm resumeeeeeee');
  
  const [formData, setFormData] = useState({
    jobTitle:'',
    fullName: '',
    email: '',
    phone: '',
    summary: '',
    skills: '',
    experience: [
      { role: '', company: '', duration: '', description: '' },
    ],
    education: [
      { degree: '', institution: '', year: '' },
    ],
    achievements: [''],
    certifications: [''],
    links: {
      linkedin: '',
      portfolio: ''
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNestedChange = (e, index, key, section) => {
    const updated = [...formData[section]];
    updated[index][key] = e.target.value;
    setFormData({ ...formData, [section]: updated });
  };

  const handleLinkChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      links: { ...prev.links, [name]: value }
    }));
  };

  const handleArrayChange = (e, index, section) => {
    const updated = [...formData[section]];
    updated[index] = e.target.value;
    setFormData({ ...formData, [section]: updated });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const resumeData = {
        ...formData,
        user: user.id
      };
  
      if (existingResume && existingResume._id) {
       
        await api.put(`/users/edit-resumes/${existingResume._id}`, resumeData);
        toast.success('Resume updated successfully!');
      } else {
   
        await api.post('/users/create-resumes', resumeData);
        toast.success('Resume created successfully!');
      }
  
      onClose();
  
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to submit resume.';
      toast.error(errorMessage);
      console.error('Error submitting resume:', errorMessage);
    }
  };

  useEffect(() => {
    if (existingResume) {
      setFormData(existingResume); 
    }
  }, [existingResume]);
  
  return (
    <Form onSubmit={handleSubmit}>
      <Row>
      <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>JobTitle</Form.Label>
            <Form.Control name="jobTitle" value={formData.jobTitle} onChange={handleChange} required />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Full Name</Form.Label>
            <Form.Control name="fullName" value={formData.fullName} onChange={handleChange} required />
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control name="email" value={formData.email} onChange={handleChange} required />
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group className="mb-3">
            <Form.Label>Phone</Form.Label>
            <Form.Control name="phone" value={formData.phone} onChange={handleChange} required />
          </Form.Group>
        </Col>
      </Row>

      <Form.Group className="mb-3">
        <Form.Label>Summary</Form.Label>
        <Form.Control as="textarea" rows={3} name="summary" value={formData.summary} onChange={handleChange} />
      </Form.Group>

      {/* Skills Section */}
      <h5 className="mt-4">Skills</h5>
      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter skills separated by commas (e.g., React, Node.js, MongoDB)"
          name="skills"
          value={formData.skills}
          onChange={handleChange}
        />
      </Form.Group>

      {/* Experience Section */}
      <h5 className="mt-4">Experience</h5>
      {formData.experience.map((exp, i) => (
        <Row key={i} className="mb-3">
          <Col md={4}>
            <Form.Control
              placeholder="Role"
              value={exp.role}
              onChange={(e) => handleNestedChange(e, i, 'role', 'experience')}
            />
          </Col>
          <Col md={3}>
            <Form.Control
              placeholder="Company"
              value={exp.company}
              onChange={(e) => handleNestedChange(e, i, 'company', 'experience')}
            />
          </Col>
          <Col md={2}>
            <Form.Control
              placeholder="Duration"
              value={exp.duration}
              onChange={(e) => handleNestedChange(e, i, 'duration', 'experience')}
            />
          </Col>
          <Col md={3}>
            <Form.Control
              placeholder="Description"
              value={exp.description}
              onChange={(e) => handleNestedChange(e, i, 'description', 'experience')}
            />
          </Col>
        </Row>
      ))}

      {/* Education Section */}
      <h5 className="mt-4">Education</h5>
      {formData.education.map((edu, i) => (
        <Row key={i} className="mb-3">
          <Col md={4}>
            <Form.Control
              placeholder="Degree"
              value={edu.degree}
              onChange={(e) => handleNestedChange(e, i, 'degree', 'education')}
            />
          </Col>
          <Col md={5}>
            <Form.Control
              placeholder="Institution"
              value={edu.institution}
              onChange={(e) => handleNestedChange(e, i, 'institution', 'education')}
            />
          </Col>
          <Col md={3}>
            <Form.Control
              placeholder="Year"
              value={edu.year}
              onChange={(e) => handleNestedChange(e, i, 'year', 'education')}
            />
          </Col>
        </Row>
      ))}

      {/* Achievements Section */}
      <h5 className="mt-4">Achievements</h5>
      {formData.achievements.map((ach, i) => (
        <Form.Group className="mb-2" key={i}>
          <Form.Control
            placeholder="Achievement"
            value={ach}
            onChange={(e) => handleArrayChange(e, i, 'achievements')}
          />
        </Form.Group>
      ))}

      {/* Certifications Section */}
      <h5 className="mt-4">Certifications</h5>
      {formData.certifications.map((cert, i) => (
        <Form.Group className="mb-2" key={i}>
          <Form.Control
            placeholder="Certification"
            value={cert}
            onChange={(e) => handleArrayChange(e, i, 'certifications')}
          />
        </Form.Group>
      ))}

      {/* Links */}
      <h5 className="mt-4">Links</h5>
      <Row className="mb-3">
        <Col md={6}>
          <Form.Control
            placeholder="LinkedIn"
            name="linkedin"
            value={formData.links.linkedin}
            onChange={handleLinkChange}
          />
        </Col>
        <Col md={6}>
          <Form.Control
            placeholder="Portfolio"
            name="portfolio"
            value={formData.links.portfolio}
            onChange={handleLinkChange}
          />
        </Col>
      </Row>

      <div className="d-flex justify-content-end">
        <Button variant="success" type="submit">Save Resume</Button>
      </div>
    </Form>
  );
};

export default ResumeForm;
