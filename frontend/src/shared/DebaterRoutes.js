import { Outlet, Navigate } from 'react-router-dom';

const DebaterRoutes = () => {
  const userType = JSON.parse(localStorage.getItem("userType"));
  console.log("hehe",userType)
  return userType === "debater" || userType === "moderator" || userType === "admin" ? <Outlet /> : <Navigate to="/dashboard" replace />;
};

export default DebaterRoutes;
