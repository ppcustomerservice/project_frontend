import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

// Section and text styling remain unchanged
const Section = styled.section`
  background-color: ${({ theme }) => theme.colors.onyx};
  padding: 5rem 0;
  position: relative;
`;

const ConfidentialContainer = styled.div`
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
`;

const ConfidentialTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.gold};
`;

const ConfidentialSubtitle = styled.p`
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 3px;
  color: ${({ theme }) => theme.colors.lightGray};
  margin-bottom: 2rem;
`;

// ✅ Updated Access Button with styled background
const AccessButton = styled(motion.a)`
  display: inline-block;
  padding: 1rem 2.5rem;
  font-size: 1rem;
  font-weight: bold;
  color: white;
  background: linear-gradient(135deg, #ffcc70, #ffb347);
  border: none;
  border-radius: 50px;
  text-transform: uppercase;
  letter-spacing: 2px;
  cursor: pointer;
  text-decoration: none;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(135deg, #ffb347, #ffcc70);
    color: #1c1c1c;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
  }
`;

const Confidential = () => {
  return (
    <Section id="confidential">
      <ConfidentialContainer>
        <ConfidentialTitle>The Confidential Collection</ConfidentialTitle>
        <ConfidentialSubtitle>For Discerning Eyes Only</ConfidentialSubtitle>
        
        <AccessButton
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href="/private-access"
        >
          Request Access
        </AccessButton>
      </ConfidentialContainer>
    </Section>
  );
};

export default Confidential;
