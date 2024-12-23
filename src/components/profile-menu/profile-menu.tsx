import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { useDispatch } from '../../services/store';
import { logoutUserThunk } from '../../slices/userSlice';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  return (
    <ProfileMenuUI
      handleLogout={() => {
        dispatch(logoutUserThunk());
      }}
      pathname={pathname}
    />
  );
};
