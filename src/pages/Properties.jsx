import React from 'react';
import styled from 'styled-components';
import TopListings from '../components/sections/TopListings';
import Confidential from '../components/sections/Confidential';

const PropertiesContainer = styled.div`
  padding-top: 80px;
`;

const PropertiesPage = () => {
  return (
    <PropertiesContainer>
      <TopListings />
      <Confidential />
    </PropertiesContainer>
  );
};

export default PropertiesPage;