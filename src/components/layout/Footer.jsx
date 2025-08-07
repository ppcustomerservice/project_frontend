import React from 'react';
import styled from 'styled-components';
import { FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';

const FooterWrapper = styled.footer`
  background-color: ${({ theme }) => theme.colors.charcoal};
  padding: 3rem 0;
  color: ${({ theme }) => theme.colors.lightGray};
`;

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const FooterColumn = styled.div`
  h3 {
    color: ${({ theme }) => theme.colors.gold};
    margin-bottom: 1.5rem;
    font-size: 1.1rem;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  ul {
    list-style: none;
    padding: 0;

    li {
      margin-bottom: 0.8rem;

      a {
        color: ${({ theme }) => theme.colors.lightGray};
        transition: color 0.3s ease;

        &:hover {
          color: ${({ theme }) => theme.colors.gold};
        }
      }
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;

  a {
    color: ${({ theme }) => theme.colors.lightGray};
    font-size: 1.2rem;
    transition: color 0.3s ease;

    &:hover {
      color: ${({ theme }) => theme.colors.gold};
    }
  }
`;

const Copyright = styled.div`
  text-align: center;
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid ${({ theme }) => theme.colors.darkGray};
  font-size: 0.8rem;
`;

const Footer = () => {
  return (
    <FooterWrapper>
      <div className="container">
        <FooterContent>
          <FooterColumn>
            <h3>The Project</h3>
            <p>
              India's premier luxury real estate consultancy specializing in 
              ultra-high-net-worth properties and confidential transactions.
            </p>
            <SocialLinks>
              <a href="#"><FaInstagram /></a>
              <a href="#"><FaLinkedin /></a>
              <a href="#"><FaTwitter /></a>
            </SocialLinks>
          </FooterColumn>
          <FooterColumn>
            <h3>Quick Links</h3>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/properties">Properties</a></li>
              <li><a href="/private-access">Private Access</a></li>
          
              <li><a href="/contact">Contact</a></li>
            </ul>
          </FooterColumn>
          <FooterColumn>
            <h3>Services</h3>
            <ul>
              <li><a href="https://www.propertyplateau.com/">
Real Estate Consultancy
</a></li>
              <li><a href="https://www.propertyplateautimes.com/">Real Estate News</a></li>
              <li><a href="https://holidayhomes.propertyplateau.com/">Property Management Services</a></li>
           
            </ul>
          </FooterColumn>
          <FooterColumn>
            <h3>Contact</h3>
            <ul>
              <li>The project Real Estate</li>
             
                 <li>Andheri East , Mumbai - 400069</li>
              <li>+91 91560 91640</li>
              <li>abhishek.pandhare@propertyplateau.com</li>
            </ul>
          </FooterColumn>
        </FooterContent>
        <Copyright>
          &copy; {new Date().getFullYear()} The PROJECT Real Estate. All Rights Reserved.
        </Copyright>
      </div>
    </FooterWrapper>
  );
};

export default Footer;