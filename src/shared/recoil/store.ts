import { atom } from 'recoil';
import { Profile } from './type';

export const isLoggedInStore = atom<boolean>({
  key: 'isLoggedIn',
  default: false,
});

export const profileStore = atom<Profile>({
  key: 'profile',
  default: {
    userId: 0,
    nickname: '',
  },
});
