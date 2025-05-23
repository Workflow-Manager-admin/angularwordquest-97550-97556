import React from 'react';
import AdminDashboard from '../components/admin/AdminDashboard';
import { GameProvider } from '../contexts/GameContext';

/**
 * AdminPage component serves as the main admin interface page
 */
const AdminPage = () => {
  return (
    <div className="admin-page">
      <AdminDashboard />
    </div>
  );
};

export default AdminPage;
