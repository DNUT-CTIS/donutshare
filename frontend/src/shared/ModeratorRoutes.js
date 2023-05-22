import { Outlet, Navigate } from 'react-router-dom';

const ModeratorRoutes = () => {
  const userType = JSON.parse(localStorage.getItem("userType"));
  return  userType === "moderator" || userType === "admin" ? <Outlet /> : <Navigate to="/dashboard" replace />;
};

export default ModeratorRoutes;
