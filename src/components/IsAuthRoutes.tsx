import { Navigate, Outlet } from 'react-router-dom';
export const IsAuthRoutes = () => {
  const auth = JSON.parse(localStorage.getItem('auth') || '{}');

  return !auth ? <Outlet /> : <Navigate to="/" />;
};
