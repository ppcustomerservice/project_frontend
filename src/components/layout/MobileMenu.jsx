import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const MobileMenuWrapper = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: ${({ theme }) => theme.colors.charcoal};
  z-index: 2000;
  padding: 2rem;
  display: flex;
  flex-direction: column;
`;

const CloseButton = styled.button`
  align-self: flex-end;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.gold};
  font-size: 1.5rem;
  cursor: pointer;
`;

const NavLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-top: 3rem;
`;

const NavLink = styled(Link)`
  color: ${({ theme }) => theme.colors.white};
  text-transform: uppercase;
  font-size: 1.2rem;
  text-decoration: none;
  text-align: center;
  padding: 1rem 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.darkGray};
`;

const MobileMenu = ({ isOpen, onClose }) => {
  return (
    <MobileMenuWrapper
      initial={{ x: '100%' }}
      animate={{ x: isOpen ? 0 : '100%' }}
      transition={{ type: 'tween' }}
    >
      <CloseButton onClick={onClose}>×</CloseButton>
      <NavLinks>
        <NavLink to="/" onClick={onClose}>Home</NavLink>
        <NavLink to="/properties" onClick={onClose}>Properties</NavLink>
        <NavLink to="/private-access" onClick={onClose}>Private Access</NavLink>
        <NavLink to="/contact" onClick={onClose}>Contact</NavLink>
      </NavLinks>
    </MobileMenuWrapper>
  );
};

export default MobileMenu;