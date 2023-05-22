import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoutes = () => {
    const auth = localStorage.getItem('token');
    return auth && auth !== "" ? <Outlet /> : <Navigate to="/dashboard" replace />;
};

export default PrivateRoutes;
