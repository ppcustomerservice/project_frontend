import React from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import clients from '../../data/clients';

const Section = styled.section`
  background-color: ${({ theme }) => theme.colors.charcoal};
  padding: 5rem 0;
`;

const ClientSlider = styled.div`
  .slick-slide {
    padding: 0 2rem;
  }

  .slick-track {
    display: flex;
    align-items: center;
  }
`;

const ClientItem = styled.div`
  text-align: center;
  padding: 1rem;
`;

const ClientLogo = styled.img`
  max-width: 150px;
  max-height: 80px;
  margin: 0 auto;
  filter: grayscale(100%);
  opacity: 0.7;
  transition: all 0.3s ease;

  &:hover {
    filter: grayscale(0%);
    opacity: 1;
  }
`;

const ClientName = styled.p`
  color: ${({ theme }) => theme.colors.lightGray};
  margin-top: 1rem;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const Clientele = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 4,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 2,
        }
      }
    ]
  };

  return (
    <Section id="clientele">
      <div className="container">
        <h2 className="section-title">Our Clientele</h2>
        <p className="section-subtitle">Trusted by Billionaires, Celebrities & Royals</p>
        
        <ClientSlider>
          <Slider {...settings}>
            {clients.map((client, index) => (
              <ClientItem key={index}>
                <ClientLogo src={client.logo} alt={client.name} />
                <ClientName>{client.name}</ClientName>
              </ClientItem>
            ))}
          </Slider>
        </ClientSlider>
      </div>
    </Section>
  );
};

export default Clientele;