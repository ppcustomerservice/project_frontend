import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { FaUser, FaHome, FaBriefcase, FaHeart, FaLock } from 'react-icons/fa';
import axios from 'axios';
import luxuryBg from '../assets/images/luxury.png';

const floatAnimation = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
  100% { transform: translateY(0px); }
`;

const LuxuryPageContainer = styled.div`
  padding: 100px 0;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  background: radial-gradient(circle at center, #0d0d0d 0%, #000 100%); /* subtle base */

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    background-image: 
      linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.6)), /* darken for readability */
      url(${luxuryBg});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;

    opacity: 0.35; /* ✅ more visible */
    filter: blur(1px); /* ✅ subtle softening only */
    pointer-events: none;
    z-index: 0;
    animation: fadeInBg 1.5s ease-out forwards;
  }

  @keyframes fadeInBg {
    from {
      opacity: 0;
      transform: scale(1.05);
    }
    to {
      opacity: 0.35;
      transform: scale(1);
    }
  }

  > * {
    position: relative;
    z-index: 1;
  }
`;


const FormContainer = styled.div`
  background: rgba(26, 26, 26, 0.9);
  padding: 50px;
  border-radius: 12px;
  max-width: 1000px;
  margin: 0 auto;
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(212, 175, 55, 0.2);
  backdrop-filter: blur(10px);
  position: relative;
  z-index: 1;
`;

const FormHeader = styled.div`
  text-align: center;
  margin-bottom: 50px;
  position: relative;
  
  h2 {
    color: #d4af37;
    font-size: 2.5rem;
    font-weight: 300;
    letter-spacing: 2px;
    margin-bottom: 15px;
    text-transform: uppercase;
    position: relative;
    display: inline-block;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 50%;
      transform: translateX(-50%);
      width: 80px;
      height: 2px;
      background: linear-gradient(90deg, transparent, #d4af37, transparent);
    }
  }
  
  p {
    color: #aaa;
    font-size: 0.9rem;
    letter-spacing: 3px;
    text-transform: uppercase;
    margin-top: 20px;
  }
`;

const Section = styled.div`
  margin-bottom: 50px;
  padding-bottom: 40px;
  border-bottom: 1px solid rgba(212, 175, 55, 0.1);
  
  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  
  svg {
    color: #d4af37;
    margin-right: 15px;
    font-size: 1.3rem;
    min-width: 24px;
  }
  
  h3 {
    color: #d4af37;
    font-size: 1.1rem;
    font-weight: 400;
    letter-spacing: 2px;
    text-transform: uppercase;
    margin: 0;
  }
`;

const LuxuryFormGroup = styled(Form.Group)`
  margin-bottom: 30px;
  position: relative;
  
  label {
    display: block;
    color: #d4af37;
    font-size: 0.8rem;
    margin-bottom: 8px;
    letter-spacing: 1px;
    text-transform: uppercase;
    opacity: 0.8;
  }
  
  .form-control, .form-select {
    background: rgba(30, 30, 30, 0.8);
    border: 1px solid #333;
    border-bottom: 2px solid rgba(212, 175, 55, 0.3);
    color: #fff;
    padding: 15px 20px;
    border-radius: 4px;
    transition: all 0.4s ease;
    font-size: 0.95rem;
    
    &:focus {
      background: rgba(40, 40, 40, 0.8);
      border-color: #d4af37;
      box-shadow: 0 5px 15px rgba(212, 175, 55, 0.2);
      border-bottom: 2px solid #d4af37;
    }
    
    &::placeholder {
      color: #555;
      font-style: italic;
    }
  }
  
  .form-select {
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%23d4af37' viewBox='0 0 16 16'%3E%3Cpath d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 20px center;
    background-size: 12px;
  }
  
  textarea.form-control {
    min-height: 140px;
    resize: vertical;
  }
`;

const CheckGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 15px;
`;

const LuxuryCheckItem = styled.div`
  position: relative;
  min-width: 120px;
  display: flex;
  align-items: center;
  margin-bottom: 8px;

  input[type="checkbox"] {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  .custom-checkbox {
    position: relative;
    height: 20px;
    width: 20px;
    background-color: #252525;
    border: 1px solid #444;
    border-radius: 4px;
    margin-right: 10px;
    transition: all 0.3s ease;

    &:after {
      content: "";
      position: absolute;
      display: none;
      left: 6px;
      top: 2px;
      width: 6px;
      height: 12px;
      border: solid #1a1a1a;
      border-width: 0 2px 2px 0;
      transform: rotate(45deg);
    }
  }

  &:hover .custom-checkbox {
    background-color: #303030;
  }

  input:checked ~ .custom-checkbox {
    background-color: #d4af37;
    border-color: #d4af37;

    &:after {
      display: block;
    }
  }

  label {
    color: #ccc;
    font-size: 0.9rem;
    cursor: pointer;
    transition: color 0.3s ease;
    margin-left: 8px;

    &:hover {
      color: #fff;
    }
  }
`;

const LuxuryRadioItem = styled.div`
  position: relative;
  min-width: 80px;
  display: flex;
  align-items: center;
  margin-bottom: 8px;

  input[type="radio"] {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  .custom-radio {
    position: relative;
    height: 20px;
    width: 20px;
    background-color: #252525;
    border: 1px solid #444;
    border-radius: 50%;
    margin-right: 10px;
    transition: all 0.3s ease;

    &:after {
      content: "";
      position: absolute;
      display: none;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #1a1a1a;
    }
  }

  &:hover .custom-radio {
    background-color: #303030;
  }

  input:checked ~ .custom-radio {
    background-color: #d4af37;
    border-color: #d4af37;

    &:after {
      display: block;
    }
  }

  label {
    color: #ccc;
    font-size: 0.9rem;
    cursor: pointer;
    transition: color 0.3s ease;
    margin-left: 8px;

    &:hover {
      color: #fff;
    }
  }
`;

const SubmitButton = styled(Button)`
  background: linear-gradient(135deg, #d4af37, #c9a227);
  border: none;
  color: #1a1a1a;
  padding: 18px 30px;
  font-size: 0.9rem;
  font-weight: 500;
  letter-spacing: 2px;
  text-transform: uppercase;
  border-radius: 4px;
  width: 100%;
  margin-top: 20px;
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: all 0.6s ease;
  }
  
  &:hover {
    background: linear-gradient(135deg, #e5c050, #d4af37);
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(212, 175, 55, 0.3);
    
    &::before {
      left: 100%;
    }
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const SecondaryButton = styled(Button)`
  background: transparent;
  border: 1px solid #d4af37;
  color: #d4af37;
  padding: 18px 30px;
  font-size: 0.9rem;
  font-weight: 500;
  letter-spacing: 2px;
  text-transform: uppercase;
  border-radius: 4px;
  width: 100%;
  margin-top: 15px;
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.1), transparent);
    transition: all 0.6s ease;
  }
  
  &:hover {
    background: rgba(212, 175, 55, 0.1);
    border-color: #e5c050;
    color: #e5c050;
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(212, 175, 55, 0.2);
    
    &::before {
      left: 100%;
    }
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const FloatingDecoration = styled.div`
  position: absolute;
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(212, 175, 55, 0.1) 0%, transparent 70%);
  border-radius: 50%;
  z-index: 0;
  animation: ${floatAnimation} 8s ease-in-out infinite;
  
  &:nth-child(1) {
    top: 10%;
    left: 5%;
    animation-delay: 0s;
  }
  
  &:nth-child(2) {
    bottom: 15%;
    right: 8%;
    animation-delay: 2s;
    width: 200px;
    height: 200px;
  }
`;

const Disclaimer = styled.div`
  color: #666;
  font-size: 0.75rem;
  text-align: center;
  margin-top: 40px;
  padding-top: 30px;
  border-top: 1px solid rgba(212, 175, 55, 0.1);
  line-height: 1.8;
  letter-spacing: 0.5px;
`;


const PrivateAccessPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    title: 'Mr.',
    email: '',
    phone: '',
    country: '',
    communication: 'Call',
    assetType: 'Primary Residence',
    location: '',
    budget: 'INR 50-100 Cr',
    timeline: '30 days',
    profession: '',
    company: '',
    role: '',
    entity: 'No',
    entityName: '',
    features: [],
    offMarket: 'Yes',
    manager: 'Yes',
    nda: '',
    notes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (feature) => {
    setFormData(prev => {
      const features = [...prev.features];
      const index = features.indexOf(feature);
      
      if (index === -1) {
        features.push(feature);
      } else {
        features.splice(index, 1);
      }
      
      return { ...prev, features };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await axios.post('https://project-backend-nr9n.onrender.com/api/email/private-access', formData);
      
      if (response.data.success) {
        setSubmitStatus({ success: true, message: 'Your private access request has been submitted successfully!' });
        // Reset form if needed
        setFormData({
          name: '',
          title: 'Mr.',
          email: '',
          phone: '',
          country: '',
          communication: 'Call',
          assetType: 'Primary Residence',
          location: '',
          budget: 'INR 50-100 Cr',
          timeline: '30 days',
          profession: '',
          company: '',
          role: '',
          entity: 'No',
          entityName: '',
          features: [],
          offMarket: 'Yes',
          manager: 'Yes',
          nda: '',
          notes: ''
        });
      } else {
        setSubmitStatus({ success: false, message: 'Submission failed. Please try again.' });
      }
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus({ 
        success: false, 
        message: error.response?.data?.error || 'There was an error submitting your request. Please try again.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <LuxuryPageContainer>
      <FloatingDecoration />
      <FloatingDecoration />
      
      <FormContainer>
        <FormHeader>
          <h2>Private Access</h2>
          <p>For Discerning Clients Only</p>
        </FormHeader>

        {submitStatus && (
          <div style={{
            marginBottom: '30px',
            padding: '15px',
            backgroundColor: submitStatus.success ? 'rgba(40, 167, 69, 0.2)' : 'rgba(220, 53, 69, 0.2)',
            borderLeft: `4px solid ${submitStatus.success ? '#28a745' : '#dc3545'}`,
            color: '#fff'
          }}>
            {submitStatus.message}
          </div>
        )}
        
        <Form onSubmit={handleSubmit}>
          {/* SECTION 1: PERSONAL DETAILS */}
          <Section>
            <SectionHeader>
              <FaUser />
              <h3>Personal Details</h3>
            </SectionHeader>
            
            <Row>
              <Col md={6}>
                <LuxuryFormGroup controlId="formName">
                  <label>Full Name</label>
                  <Form.Control 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full legal name"
                    required 
                  />
                </LuxuryFormGroup>
              </Col>
              <Col md={6}>
                <LuxuryFormGroup controlId="formTitle">
                  <label>Preferred Title</label>
                  <Form.Select
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  >
                    <option>Mr.</option>
                    <option>Ms.</option>
                    <option>Mrs.</option>
                    <option>Dr.</option>
                    <option>Other</option>
                  </Form.Select>
                </LuxuryFormGroup>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <LuxuryFormGroup controlId="formEmail">
                  <label>Email Address</label>
                  <Form.Control 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your professional email"
                    required 
                  />
                </LuxuryFormGroup>
              </Col>
              <Col md={6}>
                <LuxuryFormGroup controlId="formPhone">
                  <label>Mobile</label>
                  <Form.Control 
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="With country code"
                    required 
                  />
                </LuxuryFormGroup>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <LuxuryFormGroup controlId="formCountry">
                  <label>Country of Residence</label>
                  <Form.Control 
                    type="text" 
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    placeholder="Current primary residence"
                    required 
                  />
                </LuxuryFormGroup>
              </Col>
              <Col md={6}>
                <LuxuryFormGroup controlId="formCommunication">
                  <label>Preferred Communication</label>
                  <Form.Select
                    name="communication"
                    value={formData.communication}
                    onChange={handleChange}
                    required
                  >
                    <option>Call</option>
                    <option>WhatsApp</option>
                    <option>Email</option>
                    <option>In Person Meeting</option>
                  </Form.Select>
                </LuxuryFormGroup>
              </Col>
            </Row>
          </Section>

          {/* SECTION 2: PROPERTY INTENT */}
          <Section>
            <SectionHeader>
              <FaHome />
              <h3>Property Intent</h3>
            </SectionHeader>
            
            <LuxuryFormGroup controlId="formAssetType">
              <label>Asset Type</label>
              <Form.Select
                name="assetType"
                value={formData.assetType}
                onChange={handleChange}
                required
              >
                <option>Primary Residence</option>
                <option>Vacation/Second Home</option>
                <option>Trophy Asset</option>
                <option>Legacy Investment</option>
                <option>Strategic Diversification</option>
              </Form.Select>
            </LuxuryFormGroup>

            <Row>
              <Col md={8}>
                <LuxuryFormGroup controlId="formLocation">
                  <label>Preferred Location</label>
                  <Form.Control 
                    type="text" 
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="City, Region, Country"
                  />
                </LuxuryFormGroup>
              </Col>
              <Col md={4}>
                <LuxuryFormGroup controlId="formBudget">
                  <label>Budget Range</label>
                  <Form.Select
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    required
                  >
                    <option>INR 50-100 Cr</option>
                    <option>INR 100-250 Cr</option>
                    <option>INR 250-500 Cr</option>
                    <option>INR 500+ Cr</option>
                    <option>USD 10-25M</option>
                    <option>USD 25-50M</option>
                    <option>USD 50M+</option>
                  </Form.Select>
                </LuxuryFormGroup>
              </Col>
            </Row>

            <LuxuryFormGroup controlId="formTimeline">
              <label>Investment Timeline</label>
              <CheckGroup>
                {['30 days', '3 Months', '6 Months', 'Open to opportunities'].map((option) => (
                  <LuxuryRadioItem key={option}>
                    <input
                      type="radio"
                      name="timeline"
                      id={`timeline-${option.replace(/\s+/g, '-')}`}
                      checked={formData.timeline === option}
                      onChange={() => handleRadioChange('timeline', option)}
                      required
                    />
                    <span className="custom-radio"></span>
                    <label htmlFor={`timeline-${option.replace(/\s+/g, '-')}`}>{option}</label>
                  </LuxuryRadioItem>
                ))}
              </CheckGroup>
            </LuxuryFormGroup>
          </Section>

          {/* SECTION 3: PROFESSIONAL PROFILE */}
          <Section>
            <SectionHeader>
              <FaBriefcase />
              <h3>Professional Profile</h3>
            </SectionHeader>
            
            <Row>
              <Col md={6}>
                <LuxuryFormGroup controlId="formProfession">
                  <label>Profession/Industry</label>
                  <Form.Control 
                    type="text" 
                    name="profession"
                    value={formData.profession}
                    onChange={handleChange}
                    placeholder="Your primary profession"
                  />
                </LuxuryFormGroup>
              </Col>
              <Col md={6}>
                <LuxuryFormGroup controlId="formCompany">
                  <label>Company/Organization</label>
                  <Form.Control 
                    type="text" 
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Current organization"
                  />
                </LuxuryFormGroup>
              </Col>
            </Row>

            <LuxuryFormGroup controlId="formRole">
              <label>Role/Position</label>
              <Form.Control 
                type="text" 
                name="role"
                value={formData.role}
                onChange={handleChange}
                placeholder="Your current position"
              />
            </LuxuryFormGroup>

            <LuxuryFormGroup controlId="formEntity">
              <label>Representing an organization?</label>
              <CheckGroup>
                <LuxuryRadioItem>
                  <input
                    type="radio"
                    name="entity"
                    id="entity-yes"
                    checked={formData.entity === 'Yes'}
                    onChange={() => handleRadioChange('entity', 'Yes')}
                  />
                  <span className="custom-radio"></span>
                  <label htmlFor="entity-yes">Yes</label>
                </LuxuryRadioItem>
                <LuxuryRadioItem>
                  <input
                    type="radio"
                    name="entity"
                    id="entity-no"
                    checked={formData.entity === 'No'}
                    onChange={() => handleRadioChange('entity', 'No')}
                  />
                  <span className="custom-radio"></span>
                  <label htmlFor="entity-no">No</label>
                </LuxuryRadioItem>
              </CheckGroup>
              {formData.entity === 'Yes' && (
                <>
                  <label style={{ marginTop: '15px', display: 'block' }}>Organization Details</label>
                  <Form.Control 
                    type="text" 
                    name="entityName"
                    value={formData.entityName}
                    onChange={handleChange}
                    placeholder="Name and nature of entity"
                  />
                </>
              )}
            </LuxuryFormGroup>
          </Section>

          {/* SECTION 4: LIFESTYLE PREFERENCES */}
          <Section>
            <SectionHeader>
              <FaHeart />
              <h3>Lifestyle Preferences</h3>
            </SectionHeader>
            
            <LuxuryFormGroup controlId="formFeatures">
              <label>Desired Property Features</label>
              <CheckGroup>
                {[
                  'Waterfront/Sea View', 
                  'Gated Privacy',
                  'Branded Residency',
                  'Helipad/Private Jet Access',
                  'Art & Architecture Value',
                  'Smart Home & Security Tech',
                  'Golf/Wellness/Spa Amenities'
                ].map((feature) => (
                  <LuxuryCheckItem key={feature}>
                    <input
                      type="checkbox"
                      id={`feature-${feature.replace(/\s+/g, '-')}`}
                      checked={formData.features.includes(feature)}
                      onChange={() => handleCheckboxChange(feature)}
                    />
                    <span className="custom-checkbox"></span>
                    <label htmlFor={`feature-${feature.replace(/\s+/g, '-')}`}>{feature}</label>
                  </LuxuryCheckItem>
                ))}
              </CheckGroup>
            </LuxuryFormGroup>

            <LuxuryFormGroup controlId="formOffMarket">
              <label>Interest in Off-Market Listings?</label>
              <CheckGroup>
                <LuxuryRadioItem>
                  <input
                    type="radio"
                    name="offMarket"
                    id="offMarket-yes"
                    checked={formData.offMarket === 'Yes'}
                    onChange={() => handleRadioChange('offMarket', 'Yes')}
                  />
                  <span className="custom-radio"></span>
                  <label htmlFor="offMarket-yes">Yes</label>
                </LuxuryRadioItem>
                <LuxuryRadioItem>
                  <input
                    type="radio"
                    name="offMarket"
                    id="offMarket-no"
                    checked={formData.offMarket === 'No'}
                    onChange={() => handleRadioChange('offMarket', 'No')}
                  />
                  <span className="custom-radio"></span>
                  <label htmlFor="offMarket-no">No</label>
                </LuxuryRadioItem>
              </CheckGroup>
            </LuxuryFormGroup>
          </Section>

          {/* SECTION 5: CONFIDENTIALITY */}
          <Section>
            <SectionHeader>
              <FaLock />
              <h3>Confidentiality</h3>
            </SectionHeader>
            
            <LuxuryFormGroup controlId="formManager">
              <label>Dedicated Relationship Manager?</label>
              <CheckGroup>
                <LuxuryRadioItem>
                  <input
                    type="radio"
                    name="manager"
                    id="manager-yes"
                    checked={formData.manager === 'Yes'}
                    onChange={() => handleRadioChange('manager', 'Yes')}
                  />
                  <span className="custom-radio"></span>
                  <label htmlFor="manager-yes">Yes</label>
                </LuxuryRadioItem>
                <LuxuryRadioItem>
                  <input
                    type="radio"
                    name="manager"
                    id="manager-no"
                    checked={formData.manager === 'No'}
                    onChange={() => handleRadioChange('manager', 'No')}
                  />
                  <span className="custom-radio"></span>
                  <label htmlFor="manager-no">No</label>
                </LuxuryRadioItem>
              </CheckGroup>
            </LuxuryFormGroup>

            <LuxuryFormGroup controlId="formNDA">
              <label>Confidentiality Requirements</label>
              <Form.Control 
                as="textarea" 
                name="nda"
                value={formData.nda}
                onChange={handleChange}
                placeholder="Specify any NDA or special confidentiality needs"
              />
            </LuxuryFormGroup>

            <LuxuryFormGroup controlId="formNotes">
              <label>Additional Notes</label>
              <Form.Control 
                as="textarea" 
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Anything else we should know about your requirements"
              />
            </LuxuryFormGroup>
          </Section>

          <SubmitButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit Private Access Request'}
          </SubmitButton>
          
          {/* <SecondaryButton type="button">
            Schedule Video Consultation
          </SecondaryButton> */}

          <Disclaimer>
            All information shared is kept strictly confidential under our global privacy standards.
            Your details will only be used to personalize your real estate experience with Opulence.
          </Disclaimer>
        </Form>
      </FormContainer>
    </LuxuryPageContainer>
  );
};

export default PrivateAccessPage;