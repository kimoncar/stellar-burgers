import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { ReactElement } from 'react';
import {
  isAuthCheckedSelector,
  isAuthorizedSelector
} from '../../slices/userSlice';
import { Preloader } from '@ui';

type ProtectedRouteProps = {
  children: ReactElement;
  forGuest?: boolean;
};

export const ProtectedRoute = ({ children, forGuest }: ProtectedRouteProps) => {
  const location = useLocation();
  const isAuthorized = useSelector(isAuthorizedSelector);
  const isAuthChecked = useSelector(isAuthCheckedSelector);

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (!forGuest && !isAuthorized) {
    return <Navigate to={'/login'} state={{ from: location }} />;
  }

  if (forGuest && isAuthorized) {
    const path = location.state?.from || '/';
    return <Navigate to={path} />;
  }

  return children;
};
