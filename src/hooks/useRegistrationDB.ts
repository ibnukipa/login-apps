import {useMMKVStorage} from 'react-native-mmkv-storage';
import {userStorage} from '../db/user';

const useErrorLogged = () => {
  return useMMKVStorage<string>('errorLogged', userStorage);
};

const useLoggedIn = () => {
  return useMMKVStorage<boolean>('loggedIn', userStorage);
};

const useSavedUsername = () => {
  return useMMKVStorage<string>('savedUsername', userStorage);
};

export {useErrorLogged, useLoggedIn, useSavedUsername};
