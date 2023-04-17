import {useMMKVStorage} from 'react-native-mmkv-storage';
import {userStorage} from '../db/user';

const useErrorLogged = () => {
  return useMMKVStorage('errorLogged', userStorage);
};

export {useErrorLogged};
