import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import Booking from './pages/Booking';
import NotFound from './pages/NotFound';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Admin pages
import AdminLogin from './pages/Admin/Login';
import AdminHome from './pages/Admin/AdminHome';
import ManageMechanics from './pages/Admin/ManageMechanics';
import ManageServiceRequests from './pages/Admin/ManageServiceRequests';
import ManageVehicleCategories from './pages/Admin/ManageVehicleCategories';
import ManageServices from './pages/Admin/ManageServices';
import GenerateReport from './pages/Admin/GenerateReport';
import ManageUsers from './pages/Admin/ManageUsers';
import ManageWebsiteInfo from './pages/Admin/ManageWebsiteInfo';
import ManageAccount from './pages/Admin/ManageAccount';

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/booking" element={<Booking />} />
        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute>
              <Routes>
                <Route path="" element={<AdminHome />} />
                <Route path="mechanics" element={<ManageMechanics />} />
                <Route path="service-requests" element={<ManageServiceRequests />} />
                <Route path="vehicle-categories" element={<ManageVehicleCategories />} />
                <Route path="services" element={<ManageServices />} />
                <Route path="report" element={<GenerateReport />} />
                <Route path="users" element={<ManageUsers />} />
                <Route path="website-info" element={<ManageWebsiteInfo />} />
                <Route path="account" element={<ManageAccount />} />
              </Routes>
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </AuthProvider>
  );
}

export default App;
