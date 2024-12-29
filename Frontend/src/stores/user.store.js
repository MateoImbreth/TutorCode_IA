import { create } from "zustand"

const storeApi = (set) => ({
  user: null,
  isLoggedIn: false,

  setUser: (user) => set({ user }),
  setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn })
})

export const useUserStore = create(
  storeApi
)