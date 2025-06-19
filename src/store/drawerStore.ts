import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface DrawerState {
  isCartDrawerOpen: boolean;
}

interface DrawerActions {
  openCartDrawer: () => void;
  closeCartDrawer: () => void;
  toggleCartDrawer: () => void;
}

type DrawerStore = DrawerState & DrawerActions;

const useDrawerStore = create<DrawerStore>()(devtools((set) => ({

  isCartDrawerOpen: false,

  // Ações
  openCartDrawer: () => set({ isCartDrawerOpen: true }),
  closeCartDrawer: () => set({ isCartDrawerOpen: false }),
  toggleCartDrawer: () => set((state) => ({ isCartDrawerOpen: !state.isCartDrawerOpen })),
})));

export default useDrawerStore;