import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { Users } from '@/types';

interface UserState {
  user: Users | null;
  isAuthenticated: boolean;
}

interface UserActions {
  setUser: (user: Users) => void;
  clearUser: () => void;
}

type UserStore = UserState & UserActions;

const useUserStore = create<UserStore>()(devtools(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      setUser: (user: Users) => {
        set({ 
          user, 
          isAuthenticated: true
        });
      },

      clearUser: () => {
        set({ 
          user: null, 
          isAuthenticated: false
        });
      },
    }),
    {
      name: 'user-storage',
    }
  )
));

export default useUserStore;