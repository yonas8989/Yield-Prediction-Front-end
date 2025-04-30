import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }: { children: JSx.Element }) => {
  // Replace this with your actual authentication check
  const isAuthenticated = localStorage.getItem('token'); // or use context/state management
  
  if (!isAuthenticated) {
    // User not authenticated, redirect to login
    return <Navigate to="/signin" replace />;
  }

  return children;
};

export default ProtectedRoute;