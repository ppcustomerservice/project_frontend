import React, { useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const FormContainer = styled.div`
  background: ${({ theme }) => theme.colors.onyx};
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);

  h2 {
    color: ${({ theme }) => theme.colors.gold};
    margin-bottom: 1.5rem;
    font-size: 1.8rem;
  }
`;

const SuccessBanner = styled.div`
  background-color: #28a745;
  color: #fff;
  padding: 1rem;
  margin-bottom: 1.5rem;
  border-radius: 5px;
  text-align: center;
  font-weight: 500;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;

  label {
    display: block;
    margin-bottom: 0.5rem;
    color: ${({ theme }) => theme.colors.lightGray};
    font-size: 0.9rem;
  }

  input,
  textarea,
  select {
    width: 100%;
    padding: 0.8rem;
    background: ${({ theme }) => theme.colors.charcoal};
    border: 1px solid ${({ theme }) => theme.colors.darkGray};
    color: ${({ theme }) => theme.colors.white};
    border-radius: 4px;
    font-size: 1rem;

    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.colors.gold};
    }
  }

  textarea {
    min-height: 150px;
    resize: vertical;
  }
`;

const ErrorMessage = styled.span`
  color: #ff6b6b;
  font-size: 0.8rem;
  margin-top: 0.3rem;
  display: block;
`;

const SubmitButton = styled.button`
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
  width: 100%;
  margin-top: 1rem;

  &:hover {
    background: ${({ theme }) => theme.colors.white};
  }
`;

const ContactForm = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [successMessage, setSuccessMessage] = useState('');

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('https://project-backend-nr9n.onrender.com/api/email/contact', data);
      if (response.data.success) {
        setSuccessMessage('Thank you for your message, we will contact you soon!');
        reset();
        setTimeout(() => setSuccessMessage(''), 5000); // Hide after 5 sec
      }
    } catch (error) {
      setSuccessMessage('Something went wrong. Please try again later.');
      setTimeout(() => setSuccessMessage(''), 5000);
    }
  };

  return (
    <FormContainer>
      <h2>Send Us a Message</h2>
      {successMessage && <SuccessBanner>{successMessage}</SuccessBanner>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <label htmlFor="name">Full Name*</label>
          <input
            id="name"
            type="text"
            {...register('name', { required: 'Name is required' })}
          />
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <label htmlFor="email">Email Address*</label>
          <input
            id="email"
            type="email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address'
              }
            })}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <label htmlFor="phone">Phone Number</label>
          <input
            id="phone"
            type="tel"
            {...register('phone')}
          />
        </FormGroup>

        <FormGroup>
          <label htmlFor="subject">Subject*</label>
          <select
            id="subject"
            {...register('subject', { required: 'Subject is required' })}
          >
            <option value="">Select a subject</option>
            <option value="property-inquiry">Property Inquiry</option>
            <option value="private-access">Private Access Request</option>
            <option value="valuation">Property Valuation</option>
            <option value="general">General Inquiry</option>
          </select>
          {errors.subject && <ErrorMessage>{errors.subject.message}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <label htmlFor="message">Message*</label>
          <textarea
            id="message"
            {...register('message', {
              required: 'Message is required',
              minLength: {
                value: 20,
                message: 'Message must be at least 20 characters'
              }
            })}
          />
          {errors.message && <ErrorMessage>{errors.message.message}</ErrorMessage>}
        </FormGroup>

        <SubmitButton type="submit">Send Message</SubmitButton>
      </form>
    </FormContainer>
  );
};

export default ContactForm;
