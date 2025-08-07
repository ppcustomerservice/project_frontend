import React from 'react';
import styled from 'styled-components';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';
import ContactForm from '../components/contact/ContactForm';

const ContactContainer = styled.div`
  padding-top: 100px;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.charcoal};
`;

const ContactHeader = styled.div`
  text-align: center;
  padding: 3rem 0;
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), 
              url('/assets/images/contact-bg.jpg');
  background-size: cover;
  background-position: center;
  margin-bottom: 3rem;

  h1 {
    color: ${({ theme }) => theme.colors.gold};
    font-size: 3rem;
    margin-bottom: 1rem;
  }

  p {
    color: ${({ theme }) => theme.colors.lightGray};
    max-width: 700px;
    margin: 0 auto;
  }
`;

const ContactContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  padding: 0 2rem;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const ContactInfo = styled.div`
  h2 {
    color: ${({ theme }) => theme.colors.gold};
    margin-bottom: 2rem;
    font-size: 2rem;
  }
`;

const InfoItem = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 2rem;

  svg {
    color: ${({ theme }) => theme.colors.gold};
    font-size: 1.5rem;
    margin-right: 1rem;
    margin-top: 0.3rem;
  }

  div {
    h3 {
      color: ${({ theme }) => theme.colors.white};
      margin-bottom: 0.5rem;
      font-size: 1.2rem;
    }

    p, a {
      color: ${({ theme }) => theme.colors.lightGray};
      text-decoration: none;
      transition: color 0.3s ease;

      &:hover {
        color: ${({ theme }) => theme.colors.gold};
      }
    }
  }
`;

const ContactPage = () => {
  return (
    <ContactContainer>
      <ContactHeader>
        <div className="container">
          <h1>Contact THE PROJECT</h1>
          <p>
            For inquiries about our exclusive properties or to schedule a private viewing, 
            please reach out to our dedicated relationship managers.
          </p>
        </div>
      </ContactHeader>

      <div className="container">
        <ContactContent>
          <ContactInfo>
            <h2>Our Office</h2>
            
            <InfoItem>
              <FaMapMarkerAlt />
              <div>
                
                <p>Andheri East , Mumbai - 400069</p>
              </div>
            </InfoItem>

            <InfoItem>
              <FaPhone />
              <div>
                <h3>Phone</h3>
                <p>+91 91560 91640</p>
                <p>+447700195656(24/7)</p>
              </div>
            </InfoItem>

            <InfoItem>
              <FaEnvelope />
              <div>
                <h3>Email</h3>
            
                <a href="mailto:abhishek.pandhare@propertyplateau.com">abhishek.pandhare@propertyplateau.com</a>
              </div>
            </InfoItem>

           
          </ContactInfo>

          <ContactForm />
        </ContactContent>
      </div>
    </ContactContainer>
  );
};

export default ContactPage;