import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import heroVideo from '../../assets/videos/hero-video.mp4';

const HeroSection = styled.section`
  height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const VideoBackground = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 0;
`;

const HeroContent = styled.div`
  text-align: center;
  z-index: 1;
  padding: 0 1rem;
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled(motion.h1)`
  font-size: 4rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.white};
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.gold};
  margin-bottom: 2rem;
  text-transform: uppercase;
  letter-spacing: 3px;
  font-weight: 300;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 1rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    align-items: center;
  }
`;

const PrimaryButton = styled(motion.button)`
  background: ${({ theme }) => theme.colors.gold};
  color: ${({ theme }) => theme.colors.charcoal};
  border: none;
  padding: 1rem 2rem;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.white};
  }
`;

const SecondaryButton = styled(motion.button)`
  background: transparent;
  color: ${({ theme }) => theme.colors.gold};
  border: 2px solid ${({ theme }) => theme.colors.gold};
  padding: 1rem 2rem;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.gold};
    color: ${({ theme }) => theme.colors.charcoal};
  }
`;

const Hero = () => {
  return (
    <HeroSection>
      <VideoBackground autoPlay loop muted playsInline>
        <source src={heroVideo} type="video/mp4" />
      </VideoBackground>
      <Overlay />
      <HeroContent>
        <Title
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Welcome to Opulence
        </Title>
        <Subtitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Top Notch Real Estate
        </Subtitle>
        <ButtonGroup>
          <PrimaryButton
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Request Private Access
          </PrimaryButton>
          <SecondaryButton
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            View Featured Estates
          </SecondaryButton>
        </ButtonGroup>
      </HeroContent>
    </HeroSection>
  );
};

export default Hero;