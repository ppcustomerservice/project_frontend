import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  Box, Button, TextField, Typography, Paper, Grid, 
  FormControl, InputLabel, FormHelperText, MenuItem, 
  Select, Checkbox, FormControlLabel, Divider, Dialog,
  DialogTitle, DialogContent, DialogContentText, DialogActions,
  Snackbar, Alert, CircularProgress, IconButton, Chip
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const EditPropertyForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: '',
    tagline: '',
    description: '',
    price: {
      amount: '',
      currency: 'INR',
      pricePerSqFt: '',
      displayText: '',
      isPriceVisible: true
    },
    location: {
      address: '',
      city: '',
      state: '',
      country: 'India',
      pinCode: '',
      landmark: '',
      neighborhoodDescription: ''
    },
    builtUpArea: '',
    landArea: '',
    bedrooms: '',
    bathrooms: '',
    floors: '',
    yearBuilt: '',
    configurationTags: '',
    highlights: '',
    amenities: '',
    uniqueFeatures: '',
    architect: '',
    interiorDesigner: '',
    developer: '',
    designPhilosophy: '',
    reraNumber: '',
    possessionStatus: 'Ready to Move',
    ownershipType: 'Freehold',
    stampDuty: '',
    maintenanceCharges: '',
    contactPerson: '',
    contactEmail: '',
    contactPhone: '',
    isFeatured: false,
    status: 'available'
  });

  const [errors, setErrors] = useState({
    title: false,
    'location.city': false,
    'price.amount': false,
    builtUpArea: false
  });

  const [heroVideo, setHeroVideo] = useState(null);
  const [exterior, setExterior] = useState([]);
  const [interior, setInterior] = useState([]);
  const [views, setViews] = useState([]);
  const [lifestyle, setLifestyle] = useState([]);
  const [floorplan, setFloorplan] = useState([]);
  const [virtualTour, setVirtualTour] = useState(null);
  const [existingMedia, setExistingMedia] = useState({
    heroVideo: null,
    virtualTour: null,
    exterior: [],
    interior: [],
    views: [],
    lifestyle: [],
    floorplan: []
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  useEffect(() => {
    const fetchProperty = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`https://project-backend-nr9n.onrender.com/api/projects/${id}`);
        const property = res.data;
        
        const formatArrayFields = (field) => {
          return Array.isArray(property[field]) ? property[field].join(', ') : property[field] || '';
        };

        setForm({
          ...property,
          configurationTags: formatArrayFields('configurationTags'),
          highlights: formatArrayFields('highlights'),
          amenities: formatArrayFields('amenities'),
          uniqueFeatures: formatArrayFields('uniqueFeatures')
        });

        setExistingMedia({
          heroVideo: property.heroVideo,
          virtualTour: property.virtualTour,
          exterior: property.exterior || [],
          interior: property.interior || [],
          views: property.views || [],
          lifestyle: property.lifestyle || [],
          floorplan: property.floorplan || []
        });

      } catch (err) {
        console.error('Failed to fetch property:', err);
        showSnackbar('Failed to load property data', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setForm(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: type === 'checkbox' ? checked : value
        }
      }));
    } else {
      setForm(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }

    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: false }));
    }
  };

  const handleFileChange = (setter) => (e) => {
    setter([...e.target.files]);
  };

  const handleSingleFileChange = (setter) => (e) => {
    setter(e.target.files[0]);
  };

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const validateForm = () => {
    const newErrors = {
      title: !form.title,
      'location.city': !form.location.city,
      'price.amount': !form.price.amount,
      builtUpArea: !form.builtUpArea
    };
    
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      showSnackbar('Please fill in all required fields', 'error');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    
    // Append all form fields
    Object.entries(form).forEach(([key, value]) => {
      if (typeof value === 'object' && value !== null) {
        formData.append(key, JSON.stringify(value));
      } else if (['configurationTags', 'highlights', 'amenities', 'uniqueFeatures'].includes(key)) {
        formData.append(key, JSON.stringify(value.split(',').map(item => item.trim())));
      } else {
        formData.append(key, value);
      }
    });

    // Append files only if they're new
    if (heroVideo) formData.append('heroVideo', heroVideo);
    if (virtualTour) formData.append('virtualTour', virtualTour);
    exterior.forEach((file) => formData.append('exterior', file));
    interior.forEach((file) => formData.append('interior', file));
    views.forEach((file) => formData.append('views', file));
    lifestyle.forEach((file) => formData.append('lifestyle', file));
    floorplan.forEach((file) => formData.append('floorplan', file));

    try {
      await axios.put(`https://project-backend-nr9n.onrender.com/api/projects/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      showSnackbar('Property updated successfully!');
    } catch (err) {
      console.error(err);
      showSnackbar('Failed to update property', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setDeleteConfirmOpen(false);
    setLoading(true);
    try {
      await axios.delete(`https://project-backend-nr9n.onrender.com/api/projects/${id}`);
      showSnackbar('Property deleted successfully!');
      navigate('/properties');
    } catch (err) {
      console.error(err);
      showSnackbar('Failed to delete property', 'error');
    } finally {
      setLoading(false);
    }
  };

  const removeExistingMedia = async (category, index) => {
    const mediaUrl = existingMedia[category][index];
    
    try {
      await axios.put(`https://project-backend-nr9n.onrender.com/api/projects/${id}/media`, {
        mediaType: category,
        mediaUrl: mediaUrl
      });
      
      setExistingMedia(prev => ({
        ...prev,
        [category]: prev[category].filter((_, i) => i !== index)
      }));
      
      showSnackbar('Media removed successfully');
    } catch (err) {
      console.error('Failed to delete media:', err);
      showSnackbar('Failed to remove media', 'error');
    }
  };

  const MediaPreview = ({ url, type, category, index }) => {
    if (type === 'video') {
      return (
        <Box sx={{ position: 'relative', mb: 2 }}>
          <video controls width="100%" style={{ maxWidth: '300px' }} src={url} />
          <Chip
            label="Remove"
            onDelete={() => removeExistingMedia(category, index)}
            color="error"
            sx={{ position: 'absolute', top: 8, right: 8 }}
          />
        </Box>
      );
    }
    
    return (
      <Box sx={{ position: 'relative', display: 'inline-block', mr: 2, mb: 2 }}>
        <img 
          src={url} 
          alt="Property media" 
          style={{ width: '150px', height: '150px', objectFit: 'cover' }} 
        />
        <IconButton
          size="small"
          color="error"
          sx={{ position: 'absolute', top: 4, right: 4, backgroundColor: 'rgba(0,0,0,0.5)' }}
          onClick={() => removeExistingMedia(category, index)}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Box>
    );
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Button 
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
            sx={{ mr: 2 }}
          >
            Back
          </Button>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
            Edit Property Listing
          </Typography>
          <Button 
            variant="contained" 
            color="error" 
            startIcon={<DeleteIcon />}
            onClick={() => setDeleteConfirmOpen(true)}
            disabled={loading}
          >
            Delete
          </Button>
        </Box>
        
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <Grid container spacing={4}>
            {/* Basic Information */}
            <Grid item xs={12}>
              <Typography variant="h6" component="h2" sx={{ mb: 2, color: '#3498db', borderBottom: '1px solid #eee', pb: 1 }}>
                Basic Information
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Title *"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    required
                    variant="outlined"
                    error={errors.title}
                    helperText={errors.title ? 'This field is required' : ''}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Tagline"
                    name="tagline"
                    value={form.tagline}
                    onChange={handleChange}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Description"
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    multiline
                    rows={4}
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </Grid>

            {/* Price Information */}
            <Grid item xs={12}>
              <Typography variant="h6" component="h2" sx={{ mb: 2, color: '#3498db', borderBottom: '1px solid #eee', pb: 1 }}>
                <AttachMoneyIcon sx={{ mr: 1 }} /> Pricing Information
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Price Amount *"
                    name="price.amount"
                    type="number"
                    value={form.price.amount}
                    onChange={handleChange}
                    error={errors['price.amount']}
                    helperText={errors['price.amount'] ? 'This field is required' : ''}
                    InputProps={{
                      startAdornment: (
                        <Select
                          value={form.price.currency}
                          onChange={handleChange}
                          name="price.currency"
                          sx={{ width: 100, height: '100%', mr: 1 }}
                        >
                          <MenuItem value="INR">₹</MenuItem>
                          <MenuItem value="USD">$</MenuItem>
                          <MenuItem value="EUR">€</MenuItem>
                        </Select>
                      )
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Price Per Sq Ft"
                    name="price.pricePerSqFt"
                    type="number"
                    value={form.price.pricePerSqFt}
                    onChange={handleChange}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Display Text"
                    name="price.displayText"
                    value={form.price.displayText}
                    onChange={handleChange}
                    variant="outlined"
                    helperText="e.g., 'Price on Request', '₹25 Crore+'"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={form.price.isPriceVisible}
                        onChange={handleChange}
                        name="price.isPriceVisible"
                        color="primary"
                      />
                    }
                    label="Show Price Publicly"
                  />
                </Grid>
              </Grid>
            </Grid>

            {/* Location Details */}
            <Grid item xs={12}>
              <Typography variant="h6" component="h2" sx={{ mb: 2, color: '#3498db', borderBottom: '1px solid #eee', pb: 1 }}>
                <LocationOnIcon sx={{ mr: 1 }} /> Location Details
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Address"
                    name="location.address"
                    value={form.location.address}
                    onChange={handleChange}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="City *"
                    name="location.city"
                    value={form.location.city}
                    onChange={handleChange}
                    required
                    variant="outlined"
                    error={errors['location.city']}
                    helperText={errors['location.city'] ? 'This field is required' : ''}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="State"
                    name="location.state"
                    value={form.location.state}
                    onChange={handleChange}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Country"
                    name="location.country"
                    value={form.location.country}
                    onChange={handleChange}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="PIN Code"
                    name="location.pinCode"
                    value={form.location.pinCode}
                    onChange={handleChange}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Landmark"
                    name="location.landmark"
                    value={form.location.landmark}
                    onChange={handleChange}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Neighborhood Description"
                    name="location.neighborhoodDescription"
                    value={form.location.neighborhoodDescription}
                    onChange={handleChange}
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </Grid>

            {/* Property Specifications */}
            <Grid item xs={12}>
              <Typography variant="h6" component="h2" sx={{ mb: 2, color: '#3498db', borderBottom: '1px solid #eee', pb: 1 }}>
                Property Specifications
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Built-up Area *"
                    name="builtUpArea"
                    value={form.builtUpArea}
                    onChange={handleChange}
                    required
                    variant="outlined"
                    error={errors.builtUpArea}
                    helperText={errors.builtUpArea ? 'This field is required' : "e.g., '22,000 Sq ft'"}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Land Area"
                    name="landArea"
                    value={form.landArea}
                    onChange={handleChange}
                    variant="outlined"
                    helperText="e.g., '1.2 acres'"
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Bedrooms"
                    name="bedrooms"
                    type="number"
                    value={form.bedrooms}
                    onChange={handleChange}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Bathrooms"
                    name="bathrooms"
                    type="number"
                    value={form.bathrooms}
                    onChange={handleChange}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Floors"
                    name="floors"
                    type="number"
                    value={form.floors}
                    onChange={handleChange}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Year Built"
                    name="yearBuilt"
                    type="number"
                    value={form.yearBuilt}
                    onChange={handleChange}
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </Grid>

            {/* Configuration & Features */}
            <Grid item xs={12}>
              <Typography variant="h6" component="h2" sx={{ mb: 2, color: '#3498db', borderBottom: '1px solid #eee', pb: 1 }}>
                Configuration & Features
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Configuration Tags (comma separated)"
                    name="configurationTags"
                    value={form.configurationTags}
                    onChange={handleChange}
                    variant="outlined"
                    helperText="e.g., '4 BHK Penthouse, Villa Ment, Sea Facing'"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Highlights (comma separated)"
                    name="highlights"
                    value={form.highlights}
                    onChange={handleChange}
                    variant="outlined"
                    helperText="e.g., 'Infinity Pool, Private Cinema, Butler Suite'"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Amenities (comma separated)"
                    name="amenities"
                    value={form.amenities}
                    onChange={handleChange}
                    variant="outlined"
                    helperText="Separate amenities with commas"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Unique Features (comma separated)"
                    name="uniqueFeatures"
                    value={form.uniqueFeatures}
                    onChange={handleChange}
                    variant="outlined"
                    helperText="e.g., 'Direct Beach Access, Helipad'"
                  />
                </Grid>
              </Grid>
            </Grid>

            {/* Provenance & Design */}
            <Grid item xs={12}>
              <Typography variant="h6" component="h2" sx={{ mb: 2, color: '#3498db', borderBottom: '1px solid #eee', pb: 1 }}>
                Provenance & Design
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Architect"
                    name="architect"
                    value={form.architect}
                    onChange={handleChange}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Interior Designer"
                    name="interiorDesigner"
                    value={form.interiorDesigner}
                    onChange={handleChange}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Developer"
                    name="developer"
                    value={form.developer}
                    onChange={handleChange}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Design Philosophy"
                    name="designPhilosophy"
                    value={form.designPhilosophy}
                    onChange={handleChange}
                    multiline
                    rows={3}
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </Grid>

            {/* Legal & Financial */}
            <Grid item xs={12}>
              <Typography variant="h6" component="h2" sx={{ mb: 2, color: '#3498db', borderBottom: '1px solid #eee', pb: 1 }}>
                Legal & Financial
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="RERA Number"
                    name="reraNumber"
                    value={form.reraNumber}
                    onChange={handleChange}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControl fullWidth>
                    <InputLabel>Possession Status</InputLabel>
                    <Select
                      label="Possession Status"
                      name="possessionStatus"
                      value={form.possessionStatus}
                      onChange={handleChange}
                    >
                      <MenuItem value="Ready to Move">Ready to Move</MenuItem>
                      <MenuItem value="Under Construction">Under Construction</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControl fullWidth>
                    <InputLabel>Ownership Type</InputLabel>
                    <Select
                      label="Ownership Type"
                      name="ownershipType"
                      value={form.ownershipType}
                      onChange={handleChange}
                    >
                      <MenuItem value="Freehold">Freehold</MenuItem>
                      <MenuItem value="Leasehold">Leasehold</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Stamp Duty"
                    name="stampDuty"
                    value={form.stampDuty}
                    onChange={handleChange}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Maintenance Charges"
                    name="maintenanceCharges"
                    value={form.maintenanceCharges}
                    onChange={handleChange}
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </Grid>

            {/* Contact Information */}
            <Grid item xs={12}>
              <Typography variant="h6" component="h2" sx={{ mb: 2, color: '#3498db', borderBottom: '1px solid #eee', pb: 1 }}>
                Contact Information
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Contact Person"
                    name="contactPerson"
                    value={form.contactPerson}
                    onChange={handleChange}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Contact Email"
                    name="contactEmail"
                    type="email"
                    value={form.contactEmail}
                    onChange={handleChange}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Contact Phone"
                    name="contactPhone"
                    value={form.contactPhone}
                    onChange={handleChange}
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </Grid>

            {/* Property Status */}
            <Grid item xs={12}>
              <Typography variant="h6" component="h2" sx={{ mb: 2, color: '#3498db', borderBottom: '1px solid #eee', pb: 1 }}>
                Property Status
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <FormControl fullWidth>
                    <InputLabel>Status</InputLabel>
                    <Select
                      label="Status"
                      name="status"
                      value={form.status}
                      onChange={handleChange}
                    >
                      <MenuItem value="available">Available</MenuItem>
                      <MenuItem value="sold">Sold</MenuItem>
                      <MenuItem value="reserved">Reserved</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={form.isFeatured}
                        onChange={handleChange}
                        name="isFeatured"
                        color="primary"
                      />
                    }
                    label="Featured Property"
                  />
                </Grid>
              </Grid>
            </Grid>

            {/* Media Uploads */}
            <Grid item xs={12}>
              <Typography variant="h6" component="h2" sx={{ mb: 2, color: '#3498db', borderBottom: '1px solid #eee', pb: 1 }}>
                Media Uploads
              </Typography>
              
              {/* Hero Video */}
              <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid item xs={12}>
                  <Typography variant="subtitle1">Hero Video</Typography>
                  {existingMedia.heroVideo && (
                    <MediaPreview 
                      url={existingMedia.heroVideo} 
                      type="video" 
                      category="heroVideo" 
                      index={0} 
                    />
                  )}
                  <FormControl fullWidth>
                    <Button
                      component="label"
                      variant="contained"
                      startIcon={<CloudUploadIcon />}
                      sx={{ mb: 1 }}
                      disabled={loading}
                    >
                      {existingMedia.heroVideo ? 'Replace Hero Video' : 'Upload Hero Video'}
                      <VisuallyHiddenInput 
                        type="file" 
                        accept="video/*" 
                        onChange={handleSingleFileChange(setHeroVideo)} 
                      />
                    </Button>
                    <FormHelperText>Main promotional video for the property</FormHelperText>
                  </FormControl>
                </Grid>
              </Grid>

              {/* Virtual Tour */}
              <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid item xs={12}>
                  <Typography variant="subtitle1">Virtual Tour</Typography>
                  {existingMedia.virtualTour && (
                    <MediaPreview 
                      url={existingMedia.virtualTour} 
                      type="video" 
                      category="virtualTour" 
                      index={0} 
                    />
                  )}
                  <FormControl fullWidth>
                    <Button
                      component="label"
                      variant="contained"
                      startIcon={<CloudUploadIcon />}
                      sx={{ mb: 1 }}
                      disabled={loading}
                    >
                      {existingMedia.virtualTour ? 'Replace Virtual Tour' : 'Upload Virtual Tour'}
                      <VisuallyHiddenInput 
                        type="file" 
                        accept="video/*" 
                        onChange={handleSingleFileChange(setVirtualTour)} 
                      />
                    </Button>
                    <FormHelperText>VR walkthrough or 3D tour</FormHelperText>
                  </FormControl>
                </Grid>
              </Grid>

              {/* Exterior Images */}
              <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid item xs={12}>
                  <Typography variant="subtitle1">Exterior Images</Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}>
                    {existingMedia.exterior.map((img, index) => (
                      <MediaPreview 
                        key={index} 
                        url={img} 
                        type="image" 
                        category="exterior" 
                        index={index} 
                      />
                    ))}
                  </Box>
                  <FormControl fullWidth>
                    <Button
                      component="label"
                      variant="outlined"
                      startIcon={<CloudUploadIcon />}
                      sx={{ mb: 1 }}
                      disabled={loading}
                    >
                      Upload Additional Exterior Images
                      <VisuallyHiddenInput 
                        type="file" 
                        multiple 
                        accept="image/*" 
                        onChange={handleFileChange(setExterior)} 
                      />
                    </Button>
                    <FormHelperText>{exterior.length} new files selected</FormHelperText>
                  </FormControl>
                </Grid>
              </Grid>

              {/* Interior Images */}
              <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid item xs={12}>
                  <Typography variant="subtitle1">Interior Images</Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}>
                    {existingMedia.interior.map((img, index) => (
                      <MediaPreview 
                        key={index} 
                        url={img} 
                        type="image" 
                        category="interior" 
                        index={index} 
                      />
                    ))}
                  </Box>
                  <FormControl fullWidth>
                    <Button
                      component="label"
                      variant="outlined"
                      startIcon={<CloudUploadIcon />}
                      sx={{ mb: 1 }}
                      disabled={loading}
                    >
                      Upload Additional Interior Images
                      <VisuallyHiddenInput 
                        type="file" 
                        multiple 
                        accept="image/*" 
                        onChange={handleFileChange(setInterior)} 
                      />
                    </Button>
                    <FormHelperText>{interior.length} new files selected</FormHelperText>
                  </FormControl>
                </Grid>
              </Grid>

              {/* View Images */}
              <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid item xs={12}>
                  <Typography variant="subtitle1">View Images</Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}>
                    {existingMedia.views.map((img, index) => (
                      <MediaPreview 
                        key={index} 
                        url={img} 
                        type="image" 
                        category="views" 
                        index={index} 
                      />
                    ))}
                  </Box>
                  <FormControl fullWidth>
                    <Button
                      component="label"
                      variant="outlined"
                      startIcon={<CloudUploadIcon />}
                      sx={{ mb: 1 }}
                      disabled={loading}
                    >
                      Upload Additional View Images
                      <VisuallyHiddenInput 
                        type="file" 
                        multiple 
                        accept="image/*" 
                        onChange={handleFileChange(setViews)} 
                      />
                    </Button>
                    <FormHelperText>{views.length} new files selected</FormHelperText>
                  </FormControl>
                </Grid>
              </Grid>

              {/* Lifestyle Images */}
              <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid item xs={12}>
                  <Typography variant="subtitle1">Lifestyle Images</Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}>
                    {existingMedia.lifestyle.map((img, index) => (
                      <MediaPreview 
                        key={index} 
                        url={img} 
                        type="image" 
                        category="lifestyle" 
                        index={index} 
                      />
                    ))}
                  </Box>
                  <FormControl fullWidth>
                    <Button
                      component="label"
                      variant="outlined"
                      startIcon={<CloudUploadIcon />}
                      sx={{ mb: 1 }}
                      disabled={loading}
                    >
                      Upload Additional Lifestyle Images
                      <VisuallyHiddenInput 
                        type="file" 
                        multiple 
                        accept="image/*" 
                        onChange={handleFileChange(setLifestyle)} 
                      />
                    </Button>
                    <FormHelperText>{lifestyle.length} new files selected</FormHelperText>
                  </FormControl>
                </Grid>
              </Grid>

              {/* Floorplan Images */}
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography variant="subtitle1">Floorplan Images</Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}>
                    {existingMedia.floorplan.map((img, index) => (
                      <MediaPreview 
                        key={index} 
                        url={img} 
                        type="image" 
                        category="floorplan" 
                        index={index} 
                      />
                    ))}
                  </Box>
                  <FormControl fullWidth>
                    <Button
                      component="label"
                      variant="outlined"
                      startIcon={<CloudUploadIcon />}
                      sx={{ mb: 1 }}
                      disabled={loading}
                    >
                      Upload Additional Floorplan Images
                      <VisuallyHiddenInput 
                        type="file" 
                        multiple 
                        accept="image/*" 
                        onChange={handleFileChange(setFloorplan)} 
                      />
                    </Button>
                    <FormHelperText>{floorplan.length} new files selected</FormHelperText>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12} sx={{ mt: 2 }}>
              <Button 
                type="submit" 
                variant="contained" 
                size="large"
                disabled={loading}
                sx={{
                  py: 2,
                  px: 6,
                  fontSize: '1.1rem',
                  background: 'linear-gradient(45deg, #3498db 30%, #2c3e50 90%)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #2980b9 30%, #1a252f 90%)',
                  }
                }}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Update Property'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this property? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmOpen(false)} disabled={loading}>
            Cancel
          </Button>
          <Button 
            onClick={handleDelete} 
            color="error" 
            variant="contained"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
      >
        <Alert 
          onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default EditPropertyForm;