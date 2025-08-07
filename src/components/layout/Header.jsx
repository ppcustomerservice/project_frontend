import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import MobileMenu from "./MobileMenu";

const HeaderWrapper = styled.header`
  background-color: black;
  position: fixed;
  width: 100%;
  z-index: 1000;
  backdrop-filter: blur(10px);
  padding: 1rem 0;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  /* Push nav links to right by letting NavLinksContainer grow */
  flex-grow: 2;
  justify-content: flex-end;
  padding-right:4rem;
`;

const NavLinksContainer = styled.div`
  display: flex;
  gap: 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  color: ${({ theme }) => theme.colors.white};
  text-transform: uppercase;
  font-size: 0.9rem;
  letter-spacing: 1px;
  position: relative;
  padding: 0.5rem 0;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 3px;
    background: ${({ theme }) => theme.colors.gold};
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }
`;

// Logo wrapper with fixed width and proper positioning
const LogoWrapper = styled.div`
  position: fixed;
  left: 0;
  top: 10;
  height: 20%;
  width:auto;   /* Increased width for better logo space */
  display: flex;
  align-items: center;
  padding-left: 4rem; /* space inside logo container */
  z-index: 1100; /* above everything */
  padding-top:1rem;
  background: black;
`;

const LogoImage = styled.img`
  height: 50px;
  width: auto;
  object-fit: contain;
`;

const MobileMenuButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.white};
  font-size: 1.5rem;
  cursor: pointer;
  display: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: block;
  }
`;

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <HeaderWrapper>
      {/* Logo stuck left */}
      <LogoWrapper>
        <Link to="/">
          <LogoImage src="/THE PROJECT LOGO.png" alt="The Project Logo" />
        </Link>
      </LogoWrapper>

      {/* Nav links pushed right */}
      <Nav>
        <NavLinksContainer>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/properties">Properties</NavLink>
          <NavLink to="/private-access">Private Access</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </NavLinksContainer>

        <MobileMenuButton onClick={() => setMobileMenuOpen(true)}>☰</MobileMenuButton>
      </Nav>

      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </HeaderWrapper>
  );
};

export default Header;
