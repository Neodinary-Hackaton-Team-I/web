import { atom } from 'recoil';
import { Profile } from './type';

export const isLoggedInStore = atom<boolean>({
  key: 'isLoggedIn',
  default: false,
});

export const profileStore = atom<Profile>({
  key: 'profile',
  default: {
    memberId: 0,
    nickname: '',
  },
});
