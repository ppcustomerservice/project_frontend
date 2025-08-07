import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Button, IconButton, Typography, Box, CircularProgress
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await axios.get('https://project-backend-nr9n.onrender.com/api/projects');
        setProperties(res.data);
      } catch (err) {
        console.error('Failed to fetch properties:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

const handleDelete = async (id) => {
  if (!window.confirm('Are you sure you want to delete this property?')) return;

  try {
    const response = await axios.delete(`https://project-backend-nr9n.onrender.com/api/projects/${id}`);
    
    if (response.status === 200) {
      setProperties(properties.filter(property => property._id !== id));
      // Optional: Add a success notification
      alert('Property deleted successfully');
    }
  } catch (err) {
    console.error('Delete failed:', {
      error: err.message,
      response: err.response?.data
    });
    alert(err.response?.data?.message || 'Failed to delete property');
  }
};

  if (loading) return <CircularProgress />;

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Admin Property Management
      </Typography>
      <Button 
        variant="contained" 
        sx={{ mb: 2 }}
        onClick={() => navigate('/admin/addproperty')}
      >
        Add New Property
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {properties.map((property) => (
              <TableRow key={property._id}>
                <TableCell>{property.title}</TableCell>
                <TableCell>
                  {property.location?.city}, {property.location?.state}
                </TableCell>
                <TableCell>
                  {property.price?.currency === 'INR' ? '₹' : '$'}
                  {property.price?.amount}
                </TableCell>
                <TableCell>{property.status}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => navigate(`/admin/properties/edit/${property._id}`)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(property._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default PropertyList;