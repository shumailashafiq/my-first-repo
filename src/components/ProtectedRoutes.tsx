import { Navigate, Outlet } from 'react-router-dom';
export const ProtectedRoutes = () => {
  const auth = JSON.parse(localStorage.getItem('auth') || '{}');

  return auth ? <Outlet /> : <Navigate to="/auth/signin" />;
};
