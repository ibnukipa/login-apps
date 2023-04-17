import {MMKVLoader} from 'react-native-mmkv-storage';

const userStorage = new MMKVLoader()
  .withEncryption()
  .withInstanceID('user')
  .initialize();

const signingUser = async (username: string) => {
  userStorage.removeItem('errorLogged');
  await userStorage.setStringAsync('loggedUser', JSON.stringify({username}));
  await userStorage.setBoolAsync('loggedIn', true);
  return Promise.resolve(true);
};

const registerOrLoginUser = async (username: string, password: string) => {
  const existingUser = await userStorage.getStringAsync(username);

  if (!existingUser) {
    await userStorage.setStringAsync(username, password);
    await signingUser(username);
  } else {
    if (existingUser === password) {
      await signingUser(username);
    } else {
      await userStorage.setStringAsync('errorLogged', 'Wrong password!');
    }
  }
};

export {userStorage, registerOrLoginUser};
