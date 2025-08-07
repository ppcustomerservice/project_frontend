import React from 'react';
import HeroSection from '../components/sections/Hero';
import TopListings from '../components/sections/TopListings';
import Confidential from '../components/sections/Confidential';
import Clientele from '../components/sections/Clientele';
import Founder from '../components/sections/Founder';
import styled from 'styled-components';

const HomeContainer = styled.div`
  padding-top: 80px; // To account for fixed header
`;

const HomePage = () => {
  return (
    <HomeContainer>
      <HeroSection />
      <TopListings />
      <Confidential />
     
      <Founder />
    </HomeContainer>
  );
};

export default HomePage;