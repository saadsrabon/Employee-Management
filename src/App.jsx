import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './contexts/AuthContext';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ContactUs from './pages/ContactUs';
import ProtectedRoute from './components/ProtectedRoute';
import WorkSheet from './pages/employee/WorkSheet';
import PaymentHistory from './pages/employee/PaymentHistory';
import EmployeeList from './pages/HR/EmployeeList';
import EmployeeDetails from './pages/HR/EmployeeDetails';
import Progress from './pages/HR/Progress';
import AllEmployeeList from './pages/admin/AllEmployeeList';
import Payroll from './pages/admin/Payroll';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Navbar />
            <main className="min-h-screen">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/contact-us" element={<ContactUs />} />
                <Route 
                  path="/dashboard" 
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/work-sheet" 
                  element={
                    <ProtectedRoute allowedRoles={['Employee']}>
                      <WorkSheet />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/payment-history" 
                  element={
                    <ProtectedRoute allowedRoles={['Employee']}>
                      <PaymentHistory />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/employee-list" 
                  element={
                    <ProtectedRoute allowedRoles={['HR']}>
                      <EmployeeList />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/details/:id" 
                  element={
                    <ProtectedRoute allowedRoles={['HR','Admin']}>
                      <EmployeeDetails />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/progress" 
                  element={
                    <ProtectedRoute allowedRoles={['HR']}>
                      <Progress />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/all-employee-list" 
                  element={
                    <ProtectedRoute allowedRoles={['admin']}>
                      <AllEmployeeList />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/payroll" 
                  element={
                    <ProtectedRoute allowedRoles={['admin']}>
                      <Payroll />
                    </ProtectedRoute>
                  } 
                />
              </Routes>
            </main>
            <Footer />
            <Toaster position="top-right" />
          </div>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;