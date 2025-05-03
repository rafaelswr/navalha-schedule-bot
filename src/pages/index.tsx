
import React from 'react';
import { Navigate } from 'react-router-dom';

const Index = () => {
  // For now, redirect to admin dashboard
  return <Navigate to="/admin/dashboard" replace />;
};

export default Index;
