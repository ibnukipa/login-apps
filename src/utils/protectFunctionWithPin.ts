import {navigate} from './navigation';

const protectFunctionWithPin = (callback: any) => {
  navigate('Pin', {
    callback,
  });
};

export default protectFunctionWithPin;
