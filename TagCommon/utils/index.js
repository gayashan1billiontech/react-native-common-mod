import { DeviceEventEmitter } from 'react-native';

export const separator = (s, m) => {
  return s.split(new RegExp(`(${m})`, 'gi')).filter((e) => e);
};

export const free = (s, m) => {
  return s.replace(new RegExp(m, 'g'), '').trim();
};

export const unFocus = () => {
  DeviceEventEmitter.emit('unfocusBubble', true);
};
