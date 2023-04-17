import { useEffect, useState } from 'react';

import { atom, SetterOrUpdater, useRecoilState } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist({
  key: 'recoil-persist',
  storage: typeof window === 'undefined' ? undefined : sessionStorage,
});

export type ThemeStateType = {
  dark: boolean;
};

const DEFAULT_STATE: ThemeStateType = {
  dark: false,
};

export const themeState = atom<ThemeStateType>({
  key: 'theme',
  default: DEFAULT_STATE,
  effects_UNSTABLE: [persistAtom],
});

export const useThemeState = (): [ThemeStateType, SetterOrUpdater<ThemeStateType>] => {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [state, setState] = useRecoilState(themeState);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return [isMounted ? state : DEFAULT_STATE, setState];
};
