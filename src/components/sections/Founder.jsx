import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Section = styled.section`
  background-color: ${({ theme }) => theme.colors.onyx};
  padding: 5rem 0;
`;

const FounderContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const FounderImage = styled(motion.div)`
  position: relative;
  height: 500px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border: 10px solid ${({ theme }) => theme.colors.charcoal};
  }

  &::before {
    content: '';
    position: absolute;
    top: -20px;
    left: -20px;
    width: 100%;
    height: 100%;
    border: 2px solid ${({ theme }) => theme.colors.gold};
    z-index: -1;
  }
`;

const FounderContent = styled.div`
  h2 {
    text-align: left;
    margin-bottom: 2rem;

    &::after {
      margin: 1rem 0;
    }
  }
`;

const FounderName = styled.h3`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.gold};
  margin-bottom: 0.5rem;
`;

const FounderTitle = styled.p`
  color: ${({ theme }) => theme.colors.lightGray};
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: 0.9rem;
  margin-bottom: 2rem;
`;

const FounderMessage = styled.p`
  margin-bottom: 2rem;
  line-height: 1.8;
`;

const Signature = styled.img`
  max-width: 200px;
  margin-top: 2rem;
`;

const Founder = () => {
  return (
    <Section id="founder">
      <div className="container">
        <FounderContainer>
              <FounderImage
  initial={{ opacity: 0, x: -50 }}
  whileInView={{ opacity: 1, x: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.8 }}
>
<img src="/images/photo1.jpeg" alt="Founder" />

</FounderImage>
          <FounderContent>
            <h2>Meet the Founder</h2>
            <FounderName>Abhishek Pandhare</FounderName>
            <FounderTitle>Designated Partner & Curator of Exclusivity</FounderTitle>
            <FounderMessage>
              In a world where luxury is often imitated but rarely understood, <strong>The Project</strong> was born to define what true exclusivity means. This platform isn’t just a listing portal — it’s a curated gateway to India’s most extraordinary homes, estates, penthouses, and trophy assets priced at ₹50 Cr and above.
            </FounderMessage>
            <FounderMessage>
              With years of research-driven insight, legal precision, and deep-rooted industry relationships, I’ve made it my mission to serve India’s most discerning buyers and global investors. From legacy acquisitions in Lutyens’ Delhi to oceanfront marvels in Goa, every asset featured on The Project has been handpicked, verified, and elevated to match the stature of those who seek only the best.
            </FounderMessage>
            <FounderMessage>
              At <strong>The Project</strong>, luxury isn’t a price tag — it’s a promise. A promise of privacy, pedigree, and perfection. <br />
              This is India’s most elite real estate circle. <br />
              And I invite you to own a part of it.
            </FounderMessage>
          </FounderContent>
        </FounderContainer>
      </div>
    </Section>
  );
};

export default Founder;
