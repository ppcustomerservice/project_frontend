import React, { useState } from 'react';
import axios from 'axios';
import { 
  Box, Button, TextField, Typography, Paper, Grid, 
  FormControl, InputLabel, FormHelperText, MenuItem, 
  Select, Checkbox, FormControlLabel, Divider 
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LocationOnIcon from '@mui/icons-material/LocationOn';

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

const AddPropertyForm = () => {
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

  const [heroVideo, setHeroVideo] = useState(null);
  const [exterior, setExterior] = useState([]);
  const [interior, setInterior] = useState([]);
  const [views, setViews] = useState([]);
  const [lifestyle, setLifestyle] = useState([]);
  const [floorplan, setFloorplan] = useState([]);
  const [virtualTour, setVirtualTour] = useState(null);

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
    } else if (name.includes('location.')) {
      const [, parent, child] = name.split('.');
      setForm(prev => ({
        ...prev,
        location: {
          ...prev.location,
          [parent]: {
            ...prev.location[parent],
            [child]: value
          }
        }
      }));
    } else {
      setForm(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleFileChange = (setter) => (e) => {
    setter([...e.target.files]);
  };

  const handleSingleFileChange = (setter) => (e) => {
    setter(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    
    // Append all form fields
    Object.entries(form).forEach(([key, value]) => {
      if (typeof value === 'object' && value !== null) {
        formData.append(key, JSON.stringify(value));
      } else if (['configurationTags', 'highlights', 'amenities', 'uniqueFeatures'].includes(key)) {
        formData.append(key, JSON.stringify(value.split(',')));
      } else {
        formData.append(key, value);
      }
    });

    // Append files
    if (heroVideo) formData.append('heroVideo', heroVideo);
    if (virtualTour) formData.append('virtualTour', virtualTour);
    exterior.forEach((file) => formData.append('exterior', file));
    interior.forEach((file) => formData.append('interior', file));
    views.forEach((file) => formData.append('views', file));
    lifestyle.forEach((file) => formData.append('lifestyle', file));
    floorplan.forEach((file) => formData.append('floorplan', file));

    try {
      const res = await axios.post('https://project-backend-nr9n.onrender.com/api/projects', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Property added successfully!');
      console.log(res.data);
    } catch (err) {
      console.error(err);
      alert('Failed to add property');
    }
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4, fontWeight: 'bold', color: '#2c3e50' }}>
          Add New Luxury Property
        </Typography>
        
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
                    label="Title"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    required
                    variant="outlined"
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
                    label="Price Amount"
                    name="price.amount"
                    type="number"
                    value={form.price.amount}
                    onChange={handleChange}
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
                    label="City"
                    name="location.city"
                    value={form.location.city}
                    onChange={handleChange}
                    required
                    variant="outlined"
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
                    label="Built-up Area"
                    name="builtUpArea"
                    value={form.builtUpArea}
                    onChange={handleChange}
                    required
                    variant="outlined"
                    helperText="e.g., '22,000 Sq ft'"
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Land Area"
                    name="landArea"
                    value={form.landArea}
                    onChange={handleChange}
                    required
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
                    required
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
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <Button
                      component="label"
                      variant="contained"
                      startIcon={<CloudUploadIcon />}
                      sx={{ mb: 1 }}
                    >
                      Upload Hero Video
                      <VisuallyHiddenInput 
                        type="file" 
                        accept="video/*" 
                        onChange={handleSingleFileChange(setHeroVideo)} 
                      />
                    </Button>
                    <FormHelperText>Main promotional video for the property</FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <Button
                      component="label"
                      variant="contained"
                      startIcon={<CloudUploadIcon />}
                      sx={{ mb: 1 }}
                    >
                      Upload Virtual Tour
                      <VisuallyHiddenInput 
                        type="file" 
                        accept="video/*" 
                        onChange={handleSingleFileChange(setVirtualTour)} 
                      />
                    </Button>
                    <FormHelperText>VR walkthrough or 3D tour</FormHelperText>
                  </FormControl>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <Button
                      component="label"
                      variant="outlined"
                      startIcon={<CloudUploadIcon />}
                      sx={{ mb: 1 }}
                    >
                      Upload Exterior Images
                      <VisuallyHiddenInput 
                        type="file" 
                        multiple 
                        accept="image/*" 
                        onChange={handleFileChange(setExterior)} 
                      />
                    </Button>
                    <FormHelperText>{exterior.length} files selected</FormHelperText>
                  </FormControl>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <Button
                      component="label"
                      variant="outlined"
                      startIcon={<CloudUploadIcon />}
                      sx={{ mb: 1 }}
                    >
                      Upload Interior Images
                      <VisuallyHiddenInput 
                        type="file" 
                        multiple 
                        accept="image/*" 
                        onChange={handleFileChange(setInterior)} 
                      />
                    </Button>
                    <FormHelperText>{interior.length} files selected</FormHelperText>
                  </FormControl>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <Button
                      component="label"
                      variant="outlined"
                      startIcon={<CloudUploadIcon />}
                      sx={{ mb: 1 }}
                    >
                      Upload View Images
                      <VisuallyHiddenInput 
                        type="file" 
                        multiple 
                        accept="image/*" 
                        onChange={handleFileChange(setViews)} 
                      />
                    </Button>
                    <FormHelperText>{views.length} files selected</FormHelperText>
                  </FormControl>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <Button
                      component="label"
                      variant="outlined"
                      startIcon={<CloudUploadIcon />}
                      sx={{ mb: 1 }}
                    >
                      Upload Lifestyle Images
                      <VisuallyHiddenInput 
                        type="file" 
                        multiple 
                        accept="image/*" 
                        onChange={handleFileChange(setLifestyle)} 
                      />
                    </Button>
                    <FormHelperText>{lifestyle.length} files selected</FormHelperText>
                  </FormControl>
                </Grid>
                
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <Button
                      component="label"
                      variant="outlined"
                      startIcon={<CloudUploadIcon />}
                      sx={{ mb: 1 }}
                    >
                      Upload Floor Plan Images
                      <VisuallyHiddenInput 
                        type="file" 
                        multiple 
                        accept="image/*" 
                        onChange={handleFileChange(setFloorplan)} 
                      />
                    </Button>
                    <FormHelperText>{floorplan.length} files selected</FormHelperText>
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
                Submit Property
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default AddPropertyForm;