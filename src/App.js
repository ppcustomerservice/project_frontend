import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './assets/styles/GlobalStyle';
import theme from './assets/styles/theme';
import HomePage from './pages/Home';
import PropertiesPage from './pages/Properties';
import PrivateAccessPage from './pages/PrivateAccess';
import Layout from './components/layout/Layout';
import ContactPage from './pages/Contact';
import PropertyDetails from './pages/PropertyDetails';
import AddPropertyForm from './pages/AddPropertyForm';
import EditPropertyForm from './pages/EditPropertyForm';
import PropertyList from './pages/PropertyList';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/properties" element={<PropertiesPage />} />
            <Route path="/private-access" element={<PrivateAccessPage />} />
            <Route path="/contact" element={<ContactPage />} />
               <Route path="/properties/:id" element={<PropertyDetails />} />
         {/* Admin-only routes (hidden from regular users) */}
  <Route path="/admin/addproperty" element={<AddPropertyForm />} />
  <Route path="/admin/properties/edit/:id" element={<EditPropertyForm />} />
  <Route path="/admin/propertylist" element={<PropertyList />} />

          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;