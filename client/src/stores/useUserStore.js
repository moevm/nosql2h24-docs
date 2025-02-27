import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    role: null,
    userId: null,
  }),
  actions: {
    setRole(role) {
      this.role = role;
    },
    setId(userId) {
      this.userId = userId;
    },
    removeRole() {
      this.role = null;
    },
    removeId() {
      this.userId = null;
    },
    async loadRole() {
      if (localStorage.getItem('login')) {
        this.setRole('user');
      }
    },
  },
});
