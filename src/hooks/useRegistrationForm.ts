import {useCallback, useMemo, useState} from 'react';
import {registerOrLoginUser} from '../db/user';
import {useErrorLogged, useSavedUsername} from './useRegistrationDB';

const usernameRegex = /^[a-zA-Z0-9]+$/;
const passwordRegex = /^(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

const useRegistrationForm = () => {
  const [registrationSubmitError, setRegistrationSubmitError] =
    useErrorLogged();
  const [savedUsername] = useSavedUsername();

  const [username, setUsername] = useState<string>(savedUsername as string);
  const [password, setPassword] = useState<string>();
  const [usernameError, setUsernameError] = useState<string | undefined>();
  const [passwordError, setPasswordError] = useState<string | undefined>();

  const onChangeUsername = useCallback((usernameInput: string) => {
    setUsername(usernameInput);
    if (!usernameRegex.test(usernameInput)) {
      setUsernameError('Username must be letter and/or digit');
    } else {
      setUsernameError(undefined);
    }
  }, []);

  const onChangePassword = useCallback(
    (passwordInput: string) => {
      setPassword(passwordInput);
      setRegistrationSubmitError(undefined);
      if (!passwordRegex.test(passwordInput)) {
        setPasswordError(
          'Username min 8 char, 1 lower, 1 upper, and 1 special',
        );
      } else {
        setPasswordError(undefined);
      }
    },
    [setRegistrationSubmitError],
  );

  const onRegistrationSubmit = useCallback(() => {
    if (username && password) {
      registerOrLoginUser(username, password);
    }
  }, [username, password]);

  const isRegistrationValid = useMemo(() => {
    return !usernameError && !passwordError;
  }, [usernameError, passwordError]);

  return {
    username,
    usernameError,
    password,
    passwordError,
    onChangeUsername,
    onChangePassword,
    isRegistrationValid,
    onRegistrationSubmit,
    registrationSubmitError,
  };
};

export default useRegistrationForm;
