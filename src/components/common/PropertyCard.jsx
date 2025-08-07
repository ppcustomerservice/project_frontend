import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Modal, Button as BootstrapButton } from 'react-bootstrap';
import {
  FaBed,
  FaRulerCombined,
  FaMapMarkedAlt,
  FaSwimmingPool,
  FaCar,
  FaShieldAlt
} from 'react-icons/fa';
import { GiHouse, GiGrandPiano } from 'react-icons/gi';
import { BsHouseDoorFill } from 'react-icons/bs';
import { Row, Col, Divider, Typography, Image } from 'antd';

const { Text } = Typography;

const Card = styled(motion.div)`
  background: #1a1a1a;
  border: 1px solid #333;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
  height: 100%;
  position: relative;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(212, 175, 55, 0.3);
    border-color: #D4AF37;
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  height: 200px;
  overflow: hidden;
`;

const PropertyImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;

  ${Card}:hover & {
    transform: scale(1.05);
  }
`;

const LuxuryBadge = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: rgba(212, 175, 55, 0.9);
  color: #1a1a1a;
  padding: 0.3rem 0.8rem;
  font-size: 0.7rem;
  font-weight: bold;
  border-radius: 4px;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const ReraBadge = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: #D4AF37;
  color: #1a1a1a;
  padding: 0.3rem 0.6rem;
  font-size: 0.7rem;
  font-weight: bold;
  border-radius: 4px;
  text-transform: uppercase;
`;

const CardBody = styled.div`
  padding: 1.5rem;
`;

const Title = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: white;
  font-weight: 600;
`;

const Location = styled.p`
  color: #D4AF37;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Details = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;
`;

const DetailItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
`;

const DetailIcon = styled.div`
  color: #D4AF37;
  font-size: 1.2rem;
  margin-bottom: 0.3rem;
`;

const DetailLabel = styled.span`
  font-size: 0.8rem;
  color: #aaa;
`;

const DetailValue = styled.span`
  font-size: 0.9rem;
  font-weight: 600;
  color: white;
`;

const Price = styled.div`
  font-size: 1.3rem;
  font-weight: bold;
  color: #D4AF37;
  text-align: right;
  margin-bottom: 1rem;
  letter-spacing: 0.5px;
`;

const QuickViewButton = styled.button`
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.7);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  opacity: 0;
  ${Card}:hover & {
    opacity: 1;
  }
`;

const PropertyCard = ({ property }) => {
  const [showModal, setShowModal] = useState(false);

  const getLocationString = () => {
    if (!property.location) return 'Location not specified';
    if (typeof property.location === 'string') return property.location;

    const loc = property.location;
    return `${loc.address ? loc.address + ', ' : ''}${loc.city || ''}${loc.state ? ', ' + loc.state : ''}`;
  };

  const formatPrice = (price) => {
    if (!price) return 'Price on Request';
    if (price.displayText) return price.displayText;
    if (price.amount) {
      if (price.amount >= 10000000) {
        return `₹${(price.amount / 10000000).toFixed(2)} Crore`;
      }
      return `₹${(price.amount / 100000).toFixed(2)} Lakh`;
    }
    return 'Price on Request';
  };

  const highlights = property.highlights || [
    { icon: <FaSwimmingPool />, text: 'Infinity Pool' },
    { icon: <GiGrandPiano />, text: 'Grand Piano Lounge' },
    { icon: <FaCar />, text: 'Private Garage' },
    { icon: <FaShieldAlt />, text: '24/7 Security' },
    { icon: <BsHouseDoorFill />, text: 'Smart Home' }
  ].slice(0, 3);

  return (
    <>
      <Card
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Link to={`/properties/${property._id || property.id}`} style={{ textDecoration: 'none' }}>
          <ImageWrapper>
            <PropertyImage 
              src={property.exterior?.[0] || '/placeholder-property.jpg'} 
              alt={property.title} 
              onError={(e) => {
                e.target.src = '/placeholder-property.jpg';
              }}
            />
            <LuxuryBadge>Luxury</LuxuryBadge>
            {property.reraVerified && <ReraBadge>RERA Verified</ReraBadge>}
          </ImageWrapper>
          <CardBody>
            <Title>{property.title}</Title>
            <Location>
              <FaMapMarkedAlt /> {getLocationString()}
            </Location>
            <Details>
              <DetailItem>
                <DetailIcon><FaBed /></DetailIcon>
                <DetailLabel>Bedrooms</DetailLabel>
                <DetailValue>{property.bedrooms || '-'}</DetailValue>
              </DetailItem>
              <DetailItem>
                <DetailIcon><FaRulerCombined /></DetailIcon>
                <DetailLabel>Built-up</DetailLabel>
                <DetailValue>{property.builtUpArea || '-'}</DetailValue>
              </DetailItem>
              <DetailItem>
                <DetailIcon><GiHouse /></DetailIcon>
                <DetailLabel>Land Area</DetailLabel>
                <DetailValue>{property.landArea || '-'}</DetailValue>
              </DetailItem>
            </Details>
            <Price>{formatPrice(property.price)}</Price>
          </CardBody>
        </Link>
        <QuickViewButton
          onClick={(e) => {
            e.preventDefault();
            setShowModal(true);
          }}
        >
          Quick View
        </QuickViewButton>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="xl" centered>
        <Modal.Header closeButton style={{ borderBottom: '1px solid #D4AF37', background: '#1a1a1a' }}>
          <Modal.Title style={{ color: '#D4AF37', fontWeight: 600 }}>
            {property.title}
          </Modal.Title>
          {property.reraVerified && <ReraBadge>RERA Verified</ReraBadge>}
        </Modal.Header>
        <Modal.Body style={{ padding: '2rem', background: '#1a1a1a' }}>
          <Row gutter={[24, 24]}>
            <Col md={8}>
              <Image
                src={property.exterior?.[0] || '/placeholder-property.jpg'}
                style={{ width: '100%', borderRadius: 8 }}
                preview={false}
                onError={(e) => {
                  e.target.src = '/placeholder-property.jpg';
                }}
              />
            </Col>
            <Col md={16}>
              <div style={{ marginBottom: '1.5rem' }}>
                <Title style={{ color: '#D4AF37', marginBottom: '0.5rem' }}>
                  {property.title}
                </Title>
                <Location style={{ marginBottom: '1rem' }}>
                  <FaMapMarkedAlt /> {getLocationString()}
                </Location>
                <Text style={{ color: '#eee' }}>
                  {property.description || property.tagline || 
                    `A magnificent ${property.bedrooms || ''}-bedroom property offering unparalleled luxury.`}
                </Text>
              </div>

              <Divider style={{ borderColor: '#D4AF37' }} />

              <Row gutter={[16, 16]} style={{ marginBottom: '1.5rem' }}>
                {highlights.map((highlight, index) => (
                  <Col span={8} key={index}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div style={{ color: '#D4AF37', fontSize: '1.2rem' }}>
                        {highlight.icon}
                      </div>
                      <Text style={{ color: '#eee' }}>{highlight.text}</Text>
                    </div>
                  </Col>
                ))}
              </Row>

              <Divider style={{ borderColor: '#D4AF37' }} />

              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div style={{ fontWeight: 600, fontSize: '1.1rem', color: '#D4AF37' }}>
                  {formatPrice(property.price)}
                </div>
                <BootstrapButton
                  variant="primary"
                  href={`/properties/${property._id || property.id}`}
                  style={{ 
                    background: '#D4AF37', 
                    borderColor: '#D4AF37',
                    color: '#1a1a1a',
                    fontWeight: 'bold'
                  }}
                >
                  View Full Details
                </BootstrapButton>
              </div>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PropertyCard;