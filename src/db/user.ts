import {MMKVLoader} from 'react-native-mmkv-storage';
import protectFunctionWithPin from '../utils/protectFunctionWithPin';

const userStorage = new MMKVLoader()
  .withEncryption()
  .withInstanceID('user')
  .initialize();

const signInUser = async (username: string) => {
  userStorage.removeItem('errorLogged');
  await userStorage.setStringAsync('loggedUser', JSON.stringify({username}));
  await userStorage.setBoolAsync('loggedIn', true);
  await userStorage.setStringAsync('savedUsername', username);
  return Promise.resolve(true);
};

const signOutUser = async () => {
  userStorage.removeItem('loggedUser');
  userStorage.removeItem('loggedIn');
  return Promise.resolve(true);
};

const registerOrLoginUser = async (username: string, password: string) => {
  const existingUser = await userStorage.getStringAsync(username);

  if (!existingUser) {
    await userStorage.setStringAsync(username, password);
    protectFunctionWithPin(async () => await signInUser(username));
  } else {
    if (existingUser === password) {
      protectFunctionWithPin(async () => await signInUser(username));
    } else {
      await userStorage.setStringAsync('errorLogged', 'Wrong password!');
    }
  }
};

const logoutUser = async () => {
  await signOutUser();
};

export {userStorage, registerOrLoginUser, logoutUser};
