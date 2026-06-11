import { defineStore } from 'pinia';
import { ref } from 'vue';

export interface UserInfo {
  [key: string]: unknown;
}

const getStorageValue = (key: string) => {
  if (typeof window === 'undefined') {
    return null;
  }

  return window.localStorage.getItem(key);
};

const readStorageJson = <T>(key: string, fallback: T): T => {
  const rawValue = getStorageValue(key);

  if (!rawValue) {
    return fallback;
  }

  try {
    return JSON.parse(rawValue) as T;
  } catch {
    return fallback;
  }
};

export const useUserStore = defineStore('user', () => {
  const haierToken = ref(getStorageValue('haierToken') ?? '');
  const userInfo = ref<UserInfo | null>(readStorageJson<UserInfo | null>('userInfo', null));

  const setHaierToken = (token: string) => {
    haierToken.value = token;
    window.localStorage.setItem('haierToken', token);
  };

  const setUserInfo = (info: UserInfo | null) => {
    userInfo.value = info;

    if (info) {
      window.localStorage.setItem('userInfo', JSON.stringify(info));
      return;
    }

    window.localStorage.removeItem('userInfo');
  };

  const clearUserSession = () => {
    haierToken.value = '';
    userInfo.value = null;
    window.localStorage.removeItem('haierToken');
    window.localStorage.removeItem('userInfo');
  };

  return {
    haierToken,
    userInfo,
    setHaierToken,
    setUserInfo,
    clearUserSession,
  };
});
