import {useMMKVStorage} from 'react-native-mmkv-storage';
import {userStorage} from '../db/user';
import {useCallback, useMemo} from 'react';

const useErrorLogged = () => {
  return useMMKVStorage<string>('errorLogged', userStorage);
};

const useLoggedIn = () => {
  return useMMKVStorage<boolean>('loggedIn', userStorage);
};

const useSavedUsername = () => {
  return useMMKVStorage<string>('savedUsername', userStorage);
};
const useUser = () => {
  const [userString, setUserString] = useMMKVStorage<string>(
    'loggedUser',
    userStorage,
  );

  const user = useMemo(() => {
    try {
      if (userString) {
        return JSON.parse(userString);
      } else {
        return {};
      }
    } catch (e) {
      return {};
    }
  }, [userString]);

  const setUser = useCallback(
    (userObject: any) => {
      try {
        const parsedUserObject = JSON.stringify(userObject);
        if (parsedUserObject) {
          setUserString(parsedUserObject);
        }
      } catch (e) {
        setUserString('');
      }
    },
    [setUserString],
  );

  return [user, setUser];
};

export {useErrorLogged, useLoggedIn, useSavedUsername, useUser};
