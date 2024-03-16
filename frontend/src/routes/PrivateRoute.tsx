import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  children: ReactNode;
}

function PrivateRoute({ children }: PrivateRouteProps) {

  const token = localStorage.getItem('userToken');
  const parsedToken = token ? JSON.parse(token) : "";

  if (parsedToken) {
    return <>{children}</>;
  } else {
    return <Navigate to="/login" />;
  }
}

export default PrivateRoute;