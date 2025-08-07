import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropertyCard from '../common/PropertyCard';
import { getProjectsByCity } from '../../api';
import { Skeleton, Empty } from 'antd';

const Container = styled.div`
  background: #1a1a1a;
  padding: 3rem 1rem;
  text-align: center;
`;

const Title = styled.h2`
  color: white;
  margin-bottom: 0.5rem;
  font-size: 2rem;
`;

const CityFilters = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

const CityButton = styled.button`
  background: ${({ $active }) => ($active ? '#D4AF37' : 'transparent')};
  color: ${({ $active }) => ($active ? '#1A1A1A' : 'white')};
  border: 1px solid #D4AF37;
  padding: 0.5rem 1.5rem;
  border-radius: 20px;
  cursor: pointer;
`;

const PropertiesContainer = styled.div`
  display: flex;
  gap: 1.5rem;
  padding: 1rem;
  overflow-x: auto;
`;

const PropertyCardWrapper = styled.div`
  flex: 0 0 300px;
`;

const TopListings = () => {
  const [activeCity, setActiveCity] = useState('all');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const cities = [
    { id: 'all', name: 'All Cities' },
    { id: 'mumbai', name: 'Mumbai' },
    { id: 'delhi', name: 'Delhi' },
    { id: 'bangalore', name: 'Bangalore' },
    { id: 'hyderabad', name: 'Hyderabad' }
  ];

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        
        // Get the raw data without any filtering first
        const allProjects = await getProjectsByCity();
        
        console.log('All projects:', allProjects);
        console.log('Mumbai projects:', 
          allProjects.filter(p => 
            p.location?.city?.toLowerCase() === 'mumbai'
          )
        );

        // Now filter based on selected city
        let filtered = allProjects;
        if (activeCity !== 'all') {
          filtered = allProjects.filter(project => 
            project.location?.city?.toLowerCase() === activeCity.toLowerCase()
          );
        }

        setProjects(filtered);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [activeCity]);

  return (
    <Container id="listings">
      <Title>Top 1% Listings</Title>
      
      <CityFilters>
        {cities.map(city => (
          <CityButton
            key={city.id}
            $active={activeCity === city.id}
            onClick={() => setActiveCity(city.id)}
          >
            {city.name}
          </CityButton>
        ))}
      </CityFilters>

      {loading ? (
        <div>Loading...</div>
      ) : projects.length > 0 ? (
        <PropertiesContainer>
          {projects.map(project => (
            <PropertyCardWrapper key={project._id}>
              <PropertyCard property={project} />
            </PropertyCardWrapper>
          ))}
        </PropertiesContainer>
      ) : (
        <Empty description={`No properties found in ${cities.find(c => c.id === activeCity)?.name}`} />
      )}
    </Container>
  );
};

export default TopListings;