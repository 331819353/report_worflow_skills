import { useStore } from '@/stores';

export const login = async (force = false) => {
  const loginUrl = import.meta.env.VITE_LOGIN_URL;

  if (force) {
    useStore().clearUserSession();
  }

  if (force && loginUrl && typeof window !== 'undefined') {
    window.location.assign(loginUrl);
  }

  return false;
};
