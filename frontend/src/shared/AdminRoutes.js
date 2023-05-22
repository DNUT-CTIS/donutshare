import { Outlet, Navigate } from 'react-router-dom';

const AdminRoutes = () => {
  const userType = JSON.parse(localStorage.getItem("userType"));
  return  userType === "admin" ? <Outlet /> : <Navigate to="/dashboard" replace />;
};

export default AdminRoutes;
