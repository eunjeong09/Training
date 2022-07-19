import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    name: '',
    email: '',
  }),
  getters: {
    getName(state) {
      return state.name;
    },
    getEmail(state) {
      return state.email;
    },
  },
  actions: {
    setName(name: string) {
      this.name = name;
    },
    setEmail(email: string) {
      this.email = email;
    },
  },
});
