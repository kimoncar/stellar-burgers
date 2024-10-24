import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { ReactElement } from 'react';
import { isAuthorizedSelector } from '../../slices/userSlice';

type ProtectedRouteProps = {
  children: ReactElement;
  forAuthorized?: boolean;
};

export const ProtectedRoute = ({
  children,
  forAuthorized = false
}: ProtectedRouteProps) => {
  const location = useLocation();
  const isAuthorized = useSelector(isAuthorizedSelector);

  const path = location.state?.from || '/';
  console.log(isAuthorized);
  /*
  if (!forAuthorized && isAuthorized) {
    return <Navigate to={path} />;
  }

  if (forAuthorized && !isAuthorized) {
    return <Navigate to={'/login'} state={{ from: location }} />;
  }
  */
  return children;
};
