import { Navigate, Outlet } from 'react-router-dom';
import useAuthStore from '../store/authStore';

const ProtectedRoute = () => {
  const { token } = useAuthStore();

  // Agar user login nahi hai (token nahi hai), toh use login page par bhej do
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Agar user logged in hai, toh use content dikhao (Dashboard, Profile, etc.)
  return <Outlet />;
};

export default ProtectedRoute;