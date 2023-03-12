import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist({
  key: 'recoil-persist',
  storage: typeof window === 'undefined' ? undefined : sessionStorage,
});

export type themeStateType = {
  dark: boolean;
};

export const themeState = atom<themeStateType>({
  key: 'theme',
  default: {
    dark: false,
  },
  effects_UNSTABLE: [persistAtom],
});
