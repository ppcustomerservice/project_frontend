import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Typography, Row, Col, Image, Button, Tag, Space, Carousel,
  Modal, Form, Input, List, Card, message, Skeleton, Descriptions, Collapse 
} from 'antd';
import {
  CameraFilled, EnvironmentOutlined, HomeFilled, CrownFilled,
  CheckOutlined, StarFilled, MailOutlined, PhoneOutlined, UserOutlined,
  BankFilled, SafetyCertificateFilled, DollarOutlined, BankOutlined,
  CalendarOutlined, ToolOutlined, BulbOutlined, TeamOutlined,
  FileTextOutlined, CreditCardOutlined, ContactsOutlined, FlagOutlined,
  BuildOutlined, ExperimentOutlined, IdcardOutlined
} from '@ant-design/icons';
import { getProjectById } from '../api';
import axios from 'axios';
const { Title, Text, Paragraph } = Typography;
const { Panel } = Collapse;

// Color variables
const colors = {
  gold: '#d4af37',
  black: '#000000',
  darkGray: '#111111',
  lightGold: '#e6c875',
  darkGold: '#b38f2a'
};

const PropertyDetails = () => {
  const { id } = useParams();
  const [showForm, setShowForm] = useState(false);
  const [activeGalleryTab, setActiveGalleryTab] = useState('exterior');
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
    const [form] = Form.useForm();

  // Added: success message state
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);
        const data = await getProjectById(id);
        setProperty(data);
        setError(null);
      } catch (err) {
        setError(err.message || 'Failed to fetch property');
        message.error('Failed to load property details');
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();
  }, [id]);

  
  const handleFormSubmit = async (values) => {
    try {
      const response = await axios.post('https://project-backend-nr9n.onrender.com/api/email/property-detail', values);
      if (response.data.success) {
        setSuccessMessage('Request submitted successfully!');
        form.resetFields();
        // Optionally close modal after delay:
        // setTimeout(() => setShowForm(false), 2000);
        setTimeout(() => setSuccessMessage(''), 5000);
      } else {
        setSuccessMessage('Submission failed. Please try again.');
        setTimeout(() => setSuccessMessage(''), 5000);
      }
    } catch (error) {
      setSuccessMessage('Something went wrong. Please try again later.');
      setTimeout(() => setSuccessMessage(''), 5000);
    }
  };

  const formatPrice = (amount, currency) => {
    if (!amount) return 'Price on Request';
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: currency || 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  if (loading) return <Skeleton active paragraph={{ rows: 10 }} style={{ padding: 40, background: colors.black }} />;
  if (error) return <ErrorScreen error={error} />;
  if (!property) return <NotFoundScreen />;

  // Process property data
  const processedProperty = {
    ...property,
    media: {
      heroVideo: property.heroVideo,
      gallery: {
        exterior: property.exterior || [],
        interior: property.interior || [],
        views: property.views || [],
        lifestyle: property.lifestyle || [],
        floorplan: property.floorplan || []
      }
    },
    highlights: [
      { icon: <HomeFilled style={{ color: colors.gold }} />, text: `${property.builtUpArea} Sq ft Built Up` },
      { icon: <EnvironmentOutlined style={{ color: colors.gold }} />, text: property.landArea },
      ...(property.highlights?.map((h) => ({ icon: <StarFilled style={{ color: colors.gold }} />, text: h })) || [])
    ],
    configurationTags: property.configurationTags || [],
    amenities: property.amenities || [],
    uniqueFeatures: property.uniqueFeatures || []
  };

  const galleryCategories = [
    { key: 'exterior', label: 'Exterior', icon: <CameraFilled /> },
    { key: 'interior', label: 'Interior', icon: <CameraFilled /> },
    { key: 'views', label: 'Views', icon: <EnvironmentOutlined /> },
    { key: 'lifestyle', label: 'Lifestyle', icon: <CrownFilled /> },
    { key: 'floorplan', label: 'Floorplan', icon: <HomeFilled /> }
  ].filter((cat) => processedProperty.media.gallery[cat.key]?.length > 0);

  return (
    <div className="property-details" style={{ 
      maxWidth: 1920, 
      margin: '0 auto',
      background: colors.black,
      color: colors.gold
    }}>
      {/* Hero Section */}
      <section className="hero-section" style={{ 
        position: 'relative', 
        height: '80vh', 
        overflow: 'hidden',
        borderBottom: `4px solid ${colors.gold}`
      }}>
        {property.heroVideo?.endsWith('.mp4') ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              zIndex: 0
            }}
          >
            <source src={property.heroVideo} type="video/mp4" />
          </video>
        ) : (
          <Image
            src={property.heroVideo}
            preview={false}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        )}

        <div className="video-overlay" style={{
          position: 'absolute',
          bottom: '15%',
          left: '10%',
          color: colors.gold,
          textShadow: '0 2px 4px rgba(0,0,0,0.8)',
          zIndex: 1,
          maxWidth: '80%'
        }}>
          <Title level={1} style={{
            color: colors.gold,
            fontSize: '4rem',
            marginBottom: 0,
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>
            {property.title}
          </Title>

          {property.tagline && (
            <Text style={{
              display: 'block',
              fontSize: '1.5rem',
              marginTop: 10,
              color: colors.lightGold,
              fontStyle: 'italic'
            }}>
              {property.tagline}
            </Text>
          )}

          <Space size="middle" style={{ marginTop: 24, flexWrap: 'wrap' }}>
            {property.configurationTags?.map((tag, index) => (
              <Tag key={index} color={colors.gold} style={{
                fontSize: '1rem',
                padding: '8px 16px',
                border: 'none',
                color: colors.black,
                fontWeight: 'bold'
              }}>
                <CheckOutlined style={{ marginRight: 5 }} />
                {tag}
              </Tag>
            ))}
          </Space>
        </div>
      </section>

      {/* Price Section */}
      {property.price && (
        <section style={{ 
          padding: '40px 10%', 
          background: colors.black,
          borderBottom: `1px solid ${colors.gold}`,
          textAlign: 'center'
        }}>
          <Title level={2} style={{ 
            color: colors.gold,
            marginBottom: 0
          }}>
            <DollarOutlined style={{ marginRight: 12 }} />
            {property.price.displayText || formatPrice(property.price.amount, property.price.currency)}
          </Title>
          {property.price.pricePerSqFt && (
            <Text style={{ fontSize: '1.1rem', color: colors.lightGold }}>
              {formatPrice(property.price.pricePerSqFt, property.price.currency)} per sq ft
            </Text>
          )}
        </section>
      )}

      {/* Description */}
      {property.description && (
        <section style={{ 
          padding: '60px 15%', 
          background: colors.black,
          borderBottom: `1px solid ${colors.gold}`,
          textAlign: 'center'
        }}>
          <Paragraph style={{ 
            fontSize: '1.3rem',
            lineHeight: 1.8,
            fontStyle: 'italic',
            color: colors.lightGold
          }}>
            {property.description}
          </Paragraph>
        </section>
      )}

      {/* Property Details & Features */}
      <section style={{ 
        padding: '40px 10%', 
        background: colors.black,
        borderBottom: `1px solid ${colors.gold}`
      }}>
        <Collapse 
          defaultActiveKey={['1', '2']}
          expandIconPosition="right"
          style={{ background: colors.black, border: 'none' }}
        >
          {/* Property Specifications */}
          <Panel 
            header={
              <Title level={3} style={{ 
                marginBottom: 0,
                color: colors.gold,
                display: 'inline-block'
              }}>
                <HomeFilled style={{ marginRight: 12 }} />
                Property Specifications
              </Title>
            } 
            key="1"
            style={{ borderBottom: `1px solid ${colors.gold}` }}
          >
            <Row gutter={[40, 40]}>
              <Col xs={24} md={12}>
                <Descriptions 
                  bordered 
                  column={1} 
                  size="middle"
                  labelStyle={{
                    color: colors.gold,
                    fontWeight: 'bold',
                    background: colors.darkGray
                  }}
                  contentStyle={{
                    background: colors.black,
                    color: colors.gold
                  }}
                >
                  <Descriptions.Item label="Built-up Area">
                    {property.builtUpArea}
                  </Descriptions.Item>
                  <Descriptions.Item label="Land Area">
                    {property.landArea}
                  </Descriptions.Item>
                  {property.bedrooms && (
                    <Descriptions.Item label="Bedrooms">
                      {property.bedrooms}
                    </Descriptions.Item>
                  )}
                  {property.bathrooms && (
                    <Descriptions.Item label="Bathrooms">
                      {property.bathrooms}
                    </Descriptions.Item>
                  )}
                  {property.floors && (
                    <Descriptions.Item label="Floors">
                      {property.floors}
                    </Descriptions.Item>
                  )}
                  {property.yearBuilt && (
                    <Descriptions.Item label="Year Built">
                      {property.yearBuilt}
                    </Descriptions.Item>
                  )}
                </Descriptions>
              </Col>

              <Col xs={24} md={12}>
                <Title level={4} style={{ 
                  marginBottom: 24,
                  color: colors.gold,
                  borderBottom: `2px solid ${colors.gold}`,
                  paddingBottom: '10px',
                  display: 'inline-block'
                }}>
                  Highlights
                </Title>
                <List
                  grid={{ gutter: 16, column: 2 }}
                  dataSource={processedProperty.highlights}
                  renderItem={(item) => (
                    <List.Item>
                      <Card 
                        size="small" 
                        style={{ 
                          borderRadius: 4,
                          background: colors.darkGray,
                          borderColor: colors.gold
                        }}
                        bodyStyle={{ padding: '12px 16px' }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <div style={{ marginRight: 10 }}>{item.icon}</div>
                          <Text style={{ color: colors.gold }}>{item.text}</Text>
                        </div>
                      </Card>
                    </List.Item>
                  )}
                />
              </Col>
            </Row>
          </Panel>

          {/* Location Information */}
          {property.location && (
            <Panel 
              header={
                <Title level={3} style={{ 
                  marginBottom: 0,
                  color: colors.gold,
                  display: 'inline-block'
                }}>
                  <EnvironmentOutlined style={{ marginRight: 12 }} />
                  Location Details
                </Title>
              } 
              key="2"
              style={{ borderBottom: `1px solid ${colors.gold}` }}
            >
              <Row gutter={[40, 40]}>
                <Col xs={24} md={12}>
                  <Descriptions 
                    bordered 
                    column={1} 
                    size="middle"
                    labelStyle={{
                      color: colors.gold,
                      fontWeight: 'bold',
                      background: colors.darkGray
                    }}
                    contentStyle={{
                      background: colors.black,
                      color: colors.gold
                    }}
                  >
                    {property.location.address && (
                      <Descriptions.Item label="Address">
                        {property.location.address}
                      </Descriptions.Item>
                    )}
                    {property.location.city && (
                      <Descriptions.Item label="City">
                        {property.location.city}
                      </Descriptions.Item>
                    )}
                    {property.location.state && (
                      <Descriptions.Item label="State">
                        {property.location.state}
                      </Descriptions.Item>
                    )}
                    {property.location.country && (
                      <Descriptions.Item label="Country">
                        {property.location.country}
                      </Descriptions.Item>
                    )}
                    {property.location.pinCode && (
                      <Descriptions.Item label="PIN Code">
                        {property.location.pinCode}
                      </Descriptions.Item>
                    )}
                    {property.location.landmark && (
                      <Descriptions.Item label="Landmark">
                        {property.location.landmark}
                      </Descriptions.Item>
                    )}
                  </Descriptions>
                </Col>
                <Col xs={24} md={12}>
                  {property.location.neighborhoodDescription && (
                    <>
                      <Title level={4} style={{ 
                        marginBottom: 16,
                        color: colors.gold,
                        borderBottom: `2px solid ${colors.gold}`,
                        paddingBottom: '10px',
                        display: 'inline-block'
                      }}>
                        Neighborhood Description
                      </Title>
                      <Paragraph style={{ color: colors.gold }}>
                        {property.location.neighborhoodDescription}
                      </Paragraph>
                    </>
                  )}
                </Col>
              </Row>

              {/* Google Maps iframe */}
              <Row style={{ marginTop: 40 }}>
                <Col span={24}>
                  <div style={{
                    width: '100%',
                    height: '500px',
                    borderRadius: '8px',
                    border: `2px solid ${colors.gold}`,
                    overflow: 'hidden'
                  }}>
                    <iframe
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      loading="lazy"
                      allowFullScreen
                      referrerPolicy="no-referrer-when-downgrade"
                      src={`https://maps.google.com/maps?q=${encodeURIComponent(
                        `${property.location.address}${property.location.city ? `, ${property.location.city}` : ''}${property.location.country ? `, ${property.location.country}` : ''}`
                      )}&z=15&output=embed`}
                    ></iframe>
                  </div>
                </Col>
              </Row>
            </Panel>
          )}

          {/* Legal & Financial */}
          <Panel 
            header={
              <Title level={3} style={{ 
                marginBottom: 0,
                color: colors.gold,
                display: 'inline-block'
              }}>
                <FileTextOutlined style={{ marginRight: 12 }} />
                Legal & Financial
              </Title>
            } 
            key="3"
            style={{ borderBottom: `1px solid ${colors.gold}` }}
          >
            <Row gutter={[40, 40]}>
              <Col xs={24} md={12}>
                <Descriptions 
                  bordered 
                  column={1} 
                  size="middle"
                  labelStyle={{
                    color: colors.gold,
                    fontWeight: 'bold',
                    background: colors.darkGray
                  }}
                  contentStyle={{
                    background: colors.black,
                    color: colors.gold
                  }}
                >
                  {property.possessionStatus && (
                    <Descriptions.Item label="Possession Status">
                      {property.possessionStatus}
                    </Descriptions.Item>
                  )}
                  {property.ownershipType && (
                    <Descriptions.Item label="Ownership Type">
                      {property.ownershipType}
                    </Descriptions.Item>
                  )}
                  {property.reraNumber && (
                    <Descriptions.Item label="RERA Number">
                      {property.reraNumber}
                    </Descriptions.Item>
                  )}
                  {property.stampDuty && (
                    <Descriptions.Item label="Stamp Duty">
                      {property.stampDuty}
                    </Descriptions.Item>
                  )}
                  {property.maintenanceCharges && (
                    <Descriptions.Item label="Maintenance Charges">
                      {property.maintenanceCharges}
                    </Descriptions.Item>
                  )}
                </Descriptions>
              </Col>
            </Row>
          </Panel>

          {/* Provenance & Design */}
          <Panel 
            header={
              <Title level={3} style={{ 
                marginBottom: 0,
                color: colors.gold,
                display: 'inline-block'
              }}>
                <BuildOutlined style={{ marginRight: 12 }} />
                Provenance & Design
              </Title>
            } 
            key="4"
            style={{ borderBottom: `1px solid ${colors.gold}` }}
          >
            <Row gutter={[40, 40]}>
              <Col xs={24} md={12}>
                <Descriptions 
                  bordered 
                  column={1} 
                  size="middle"
                  labelStyle={{
                    color: colors.gold,
                    fontWeight: 'bold',
                    background: colors.darkGray
                  }}
                  contentStyle={{
                    background: colors.black,
                    color: colors.gold
                  }}
                >
                  {property.architect && (
                    <Descriptions.Item label="Architect">
                      {property.architect}
                    </Descriptions.Item>
                  )}
                  {property.interiorDesigner && (
                    <Descriptions.Item label="Interior Designer">
                      {property.interiorDesigner}
                    </Descriptions.Item>
                  )}
                  {property.developer && (
                    <Descriptions.Item label="Developer">
                      {property.developer}
                    </Descriptions.Item>
                  )}
                </Descriptions>
              </Col>
              <Col xs={24} md={12}>
                {property.designPhilosophy && (
                  <>
                    <Title level={4} style={{ 
                      marginBottom: 16,
                      color: colors.gold,
                      borderBottom: `2px solid ${colors.gold}`,
                      paddingBottom: '10px',
                      display: 'inline-block'
                    }}>
                      Design Philosophy
                    </Title>
                    <Paragraph style={{ color: colors.gold }}>
                      {property.designPhilosophy}
                    </Paragraph>
                  </>
                )}
              </Col>
            </Row>
          </Panel>

          {/* Unique Features */}
          {property.uniqueFeatures?.length > 0 && (
            <Panel 
              header={
                <Title level={3} style={{ 
                  marginBottom: 0,
                  color: colors.gold,
                  display: 'inline-block'
                }}>
                  <ExperimentOutlined style={{ marginRight: 12 }} />
                  Unique Features
                </Title>
              } 
              key="5"
              style={{ borderBottom: `1px solid ${colors.gold}` }}
            >
              <Row gutter={[16, 16]}>
                {property.uniqueFeatures.map((feature, index) => (
                  <Col xs={24} sm={12} md={8} lg={6} key={index}>
                    <div style={{
                      background: colors.darkGray,
                      padding: '20px 16px',
                      borderRadius: 4,
                      textAlign: 'center',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                      borderTop: `3px solid ${colors.gold}`,
                      height: '100%'
                    }}>
                      <Text strong style={{ color: colors.gold }}>{feature}</Text>
                    </div>
                  </Col>
                ))}
              </Row>
            </Panel>
          )}

          {/* Contact Information */}
          <Panel 
            header={
              <Title level={3} style={{ 
                marginBottom: 0,
                color: colors.gold,
                display: 'inline-block'
              }}>
                <IdcardOutlined style={{ marginRight: 12 }} />
                Contact Information
              </Title>
            } 
            key="6"
            style={{ borderBottom: `1px solid ${colors.gold}` }}
          >
            <Descriptions 
              bordered 
              column={1} 
              size="middle"
              labelStyle={{
                color: colors.gold,
                fontWeight: 'bold',
                background: colors.darkGray
              }}
              contentStyle={{
                background: colors.black,
                color: colors.gold
              }}
            >
              {property.contactPerson && (
                <Descriptions.Item label="Contact Person">
                  {property.contactPerson}
                </Descriptions.Item>
              )}
              {property.contactEmail && (
                <Descriptions.Item label="Contact Email">
                  {property.contactEmail}
                </Descriptions.Item>
              )}
              {property.contactPhone && (
                <Descriptions.Item label="Contact Phone">
                  {property.contactPhone}
                </Descriptions.Item>
              )}
            </Descriptions>
          </Panel>
        </Collapse>
      </section>

      {/* Gallery Section */}
      {galleryCategories.length > 0 && (
        <section style={{ 
          padding: '80px 10%',
          background: colors.black,
          borderBottom: `1px solid ${colors.gold}`
        }}>
          <Title level={2} style={{ 
            textAlign: 'center', 
            marginBottom: 40,
            color: colors.gold,
            position: 'relative',
            display: 'inline-block',
            left: '50%',
            transform: 'translateX(-50%)',
            padding: '0 20px'
          }}>
            <span style={{
              position: 'absolute',
              bottom: '-10px',
              left: '0',
              width: '100%',
              height: '3px',
              background: `linear-gradient(90deg, transparent, ${colors.gold}, transparent)`
            }}></span>
            <CameraFilled style={{ marginRight: 12 }} />
            Property Gallery
          </Title>

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: 30,
            borderBottom: `1px solid ${colors.gold}`,
            paddingBottom: 10
          }}>
            {galleryCategories.map((category) => (
              <Button
                key={category.key}
                type="text"
                icon={category.icon}
                style={{
                  color: activeGalleryTab === category.key ? colors.gold : colors.lightGold,
                  margin: '0 15px',
                  fontWeight: activeGalleryTab === category.key ? 600 : 400,
                  fontSize: '1rem',
                  borderBottom: activeGalleryTab === category.key ? `2px solid ${colors.gold}` : 'none',
                  paddingBottom: '5px'
                }}
                onClick={() => setActiveGalleryTab(category.key)}
              >
                {category.label}
              </Button>
            ))}
          </div>

          <Carousel 
            autoplay 
            effect="fade" 
            style={{ marginBottom: 40 }}
            dotStyle={{
              background: colors.darkGray,
              border: `1px solid ${colors.gold}`
            }}
            activeDotStyle={{
              background: colors.gold,
              border: `1px solid ${colors.gold}`
            }}
          >
            {processedProperty.media.gallery[activeGalleryTab].map((img, index) => (
              <div key={index}>
                <Image
                  src={img}
                  style={{
                    width: '100%',
                    height: '600px',
                    objectFit: 'cover',
                    borderRadius: 4,
                    border: `2px solid ${colors.gold}`
                  }}
                  preview={{ src: img }}
                />
              </div>
            ))}
          </Carousel>

          {property.virtualTour && (
            <div style={{ textAlign: 'center', marginTop: 30 }}>
              <Button 
                type="primary" 
                icon={<CameraFilled />}
                style={{
                  background: 'transparent',
                  color: colors.gold,
                  borderColor: colors.gold,
                  height: 50,
                  fontSize: '1.1rem',
                  padding: '0 40px'
                }}
                onClick={() => window.open(property.virtualTour, '_blank')}
              >
                Virtual Experience
              </Button>
            </div>
          )}
        </section>
      )}

      {/* Amenities Section */}
      {property.amenities?.length > 0 && (
        <section style={{ 
          padding: '80px 10%', 
          background: colors.black,
          borderBottom: `1px solid ${colors.gold}`
        }}>
          <Title level={2} style={{ 
            textAlign: 'center', 
            marginBottom: 40,
            color: colors.gold,
            position: 'relative',
            display: 'inline-block',
            left: '50%',
            transform: 'translateX(-50%)',
            padding: '0 20px'
          }}>
            <span style={{
              position: 'absolute',
              bottom: '-10px',
              left: '0',
              width: '100%',
              height: '3px',
              background: `linear-gradient(90deg, transparent, ${colors.gold}, transparent)`
            }}></span>
            <CrownFilled style={{ marginRight: 12 }} />
            Luxury Amenities
          </Title>

          <Row gutter={[16, 16]}>
            {property.amenities.map((amenity, index) => (
              <Col xs={24} sm={12} md={8} lg={6} key={index}>
                <div style={{
                  background: colors.darkGray,
                  padding: '20px 16px',
                  borderRadius: 4,
                  textAlign: 'center',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                  borderTop: `3px solid ${colors.gold}`,
                  height: '100%'
                }}>
                  <Text strong style={{ color: colors.gold }}>{amenity}</Text>
                </div>
              </Col>
            ))}
          </Row>
        </section>
      )}

      {/* Contact Section */}
      <section style={{ 
        padding: '80px 10%', 
        textAlign: 'center',
        background: colors.black
      }}>
        <Button
          type="primary"
          size="large"
          onClick={() => setShowForm(true)}
          style={{ 
            padding: '0 60px', 
            height: 60,
            fontSize: '1.2rem',
            background: colors.gold,
            borderColor: colors.gold,
            color: colors.black,
            fontWeight: 'bold'
          }}
        >
          Request Exclusive Details
        </Button>
      </section>

      {/* Information Request Modal */}
          <Modal
        visible={showForm}
        onCancel={() => setShowForm(false)}
        footer={null}
        title={<Title level={3} style={{ color: colors.gold }}>Request Access</Title>}
        bodyStyle={{ backgroundColor: colors.darkGray }}
        centered
        destroyOnClose
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFormSubmit}
        >
          <Form.Item
            label={<Text style={{ color: colors.gold }}>Name</Text>}
            name="name"
            rules={[{ required: true, message: 'Please enter your name' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Your full name" />
          </Form.Item>

          <Form.Item
            label={<Text style={{ color: colors.gold }}>Email</Text>}
            name="email"
            rules={[
              { required: true, message: 'Please enter your email' },
              { type: 'email', message: 'Please enter a valid email' }
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="example@example.com" />
          </Form.Item>

          <Form.Item
            label={<Text style={{ color: colors.gold }}>Phone Number</Text>}
            name="phone"
            rules={[
              { required: true, message: 'Please enter your phone number' },
              { pattern: /^\+?\d{10,15}$/, message: 'Please enter a valid phone number' }
            ]}
          >
            <Input prefix={<PhoneOutlined />} placeholder="+919999999999" />
          </Form.Item>

          <Form.Item
            label={<Text style={{ color: colors.gold }}>Message</Text>}
            name="message"
          >
            <Input.TextArea rows={4} placeholder="Your message (optional)" />
          </Form.Item>

          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit"
              block
              style={{
                backgroundColor: colors.gold,
                borderColor: colors.gold,
                color: colors.black,
                fontWeight: 'bold',
                fontSize: '1.1rem'
              }}
            >
              Submit
            </Button>
          </Form.Item>

          {successMessage && (
            <div style={{ marginTop: 20, color: colors.lightGold, textAlign: 'center', fontWeight: 'bold' }}>
              {successMessage}
            </div>
          )}
        </Form>
      </Modal>
    </div>
  );
};

const ErrorScreen = ({ error }) => (
  <div style={{ textAlign: 'center', padding: 100, background: '#000000', minHeight: '100vh', color: '#d4af37' }}>
    <Title level={2} style={{ color: '#d4af37' }}>Error Loading Property</Title>
    <Text type="danger" style={{ color: '#d4af37' }}>{error}</Text>
    <Button 
      type="primary" 
      onClick={() => window.history.back()} 
      style={{ 
        marginTop: 20,
        background: '#d4af37',
        borderColor: '#d4af37',
        color: '#000000',
        fontWeight: 'bold'
      }}
    >
      Back to Properties
    </Button>
  </div>
);

const NotFoundScreen = () => (
  <div style={{ textAlign: 'center', padding: 100, background: '#000000', minHeight: '100vh', color: '#d4af37' }}>
    <Title level={2} style={{ color: '#d4af37' }}>Property not found</Title>
    <Button 
      type="primary" 
      onClick={() => window.history.back()}
      style={{
        background: '#d4af37',
        borderColor: '#d4af37',
        color: '#000000',
        fontWeight: 'bold'
      }}
    >
      Back to Properties
    </Button>
  </div>
);

export default PropertyDetails;