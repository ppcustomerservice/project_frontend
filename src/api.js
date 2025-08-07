import axios from 'axios';

const API_BASE_URL = 'https://project-backend-nr9n.onrender.com/api';

// Get all projects
export const getProjects = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/projects`);
    return response.data;
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
};

// Get single project by ID
export const getProjectById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/projects/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching project:', error);
    throw error;
  }
};
// In api.js
export const getProjectsByCity = async (city) => {
  try {
    const url = city === 'all' || !city
      ? `${API_BASE_URL}/projects`
      : `${API_BASE_URL}/projects?city=${city.toLowerCase()}`;
    
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching projects by city:', error);
    throw error;
  }
};