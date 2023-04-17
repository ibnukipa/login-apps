import {useCallback, useState} from 'react';

const usernameRegex = /^[a-zA-Z0-9]+$/;
const passwordRegex = /^(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
const useRegistrationForm = () => {
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [usernameError, setUsernameError] = useState<string | undefined>();
  const [passwordError, setPasswordError] = useState<string | undefined>();

  const onChangeUsername = useCallback((username: string) => {
    setUsername(username);
    if (!usernameRegex.test(username)) {
      setUsernameError('Username must be letter and/or digit');
    } else {
      setUsernameError(undefined);
    }
  }, []);

  const onChangePassword = useCallback((password: string) => {
    setPassword(password);
    if (!passwordRegex.test(password)) {
      setPasswordError('Username min 8 char, 1 lower, 1 upper, and 1 special');
    } else {
      setPasswordError(undefined);
    }
  }, []);

  return {
    username,
    usernameError,
    password,
    passwordError,
    onChangeUsername,
    onChangePassword,
  };
};

export default useRegistrationForm;
