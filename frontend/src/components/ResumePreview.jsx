import React, { useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import './ResumePreview.css';

const ResumePreview = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const formData = location.state?.formData;
  const resumeRef = useRef();

  const downloadPDF = async () => {
    const canvas = await html2canvas(resumeRef.current);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${formData?.fullName || 'Resume'}.pdf`);
  };

  if (!formData) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h2>No Resume Selected</h2>
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    );
  }

  return (
    <div>
      <div className="resume-container" ref={resumeRef}>
       <h1 className="name">{formData.jobTitle}</h1>
        <h1 className="name">{formData.fullName}</h1>
        <p className="info">{formData.email} | {formData.phone}</p>
        <p className="info">{formData.address}</p>

        {formData.summary && (
          <section>
            <h2 className="section-title">Professional Summary</h2>
            <p>{formData.summary}</p>
          </section>
        )}

        {formData.skills?.length > 0 && (
          <section>
            <h2 className="section-title">Skills</h2>
            <ul>
              {formData.skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </section>
        )}

        {formData.experience?.length > 0 && (
          <section>
            <h2 className="section-title">Work Experience</h2>
            {formData.experience.map((exp, index) => (
              <div key={index} className="experience-item">
                <strong>{exp.role}</strong> – {exp.company} ({exp.start} - {exp.end})
                <p>{exp.description}</p>
              </div>
            ))}
          </section>
        )}

        {formData.education?.length > 0 && (
          <section>
            <h2 className="section-title">Education</h2>
            {formData.education.map((edu, index) => (
              <div key={index} className="education-item">
                <strong>{edu.degree}</strong> – {edu.institution} ({edu.year})
              </div>
            ))}
          </section>
        )}

        {formData.achievements?.length > 0 && (
          <section>
            <h2 className="section-title">Achievements</h2>
            <ul>
              {formData.achievements.map((ach, index) => (
                <li key={index}>{ach}</li>
              ))}
            </ul>
          </section>
        )}

        {formData.certifications?.length > 0 && (
          <section>
            <h2 className="section-title">Certifications</h2>
            <ul>
              {formData.certifications.map((cert, index) => (
                <li key={index}>{cert}</li>
              ))}
            </ul>
          </section>
        )}

        {formData.links && (formData.links.linkedin || formData.links.portfolio) && (
          <section>
            <h2 className="section-title">Links</h2>
            <ul>
              {formData.links.linkedin && (
                <li><strong>LinkedIn:</strong> {formData.links.linkedin}</li>
              )}
              {formData.links.portfolio && (
                <li><strong>Portfolio:</strong> {formData.links.portfolio}</li>
              )}
            </ul>
          </section>
        )}
      </div>

      <div style={{ textAlign: 'center' }}>
        <button onClick={downloadPDF} className="download-btn">
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default ResumePreview;
