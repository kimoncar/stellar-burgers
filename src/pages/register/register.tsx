import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { registerUserThunk } from '../../slices/userSlice';
import { useNavigate } from 'react-router-dom';

export const Register: FC = () => {
  const [name, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector((state) => state.user.error);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      await dispatch(registerUserThunk({ email, name, password })).unwrap();
      navigate('/profile');
    } catch (e) {}
  };

  return (
    <RegisterUI
      errorText={error?.toString()}
      email={email}
      userName={name}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
