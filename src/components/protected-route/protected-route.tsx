import { Navigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { ReactElement, useEffect } from 'react';
import { isAuthorizedSelector } from '../../slices/userSlice';

type ProtectedRouteProps = {
  children: ReactElement;
  forGuest?: boolean;
};

export const ProtectedRoute = ({ children, forGuest }: ProtectedRouteProps) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const isAuthorized = useSelector(isAuthorizedSelector);

  if (!forGuest && !isAuthorized) {
    return <Navigate to={'/login'} state={{ from: location }} />;
  }

  if (forGuest && isAuthorized) {
    const path = location.state?.from || '/';
    return <Navigate to={path} />;
  }

  return children;
};
