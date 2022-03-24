import { defineStore } from 'pinia';
import { getMenusAPI } from '@/api/menu.ts';

export const useMenuStore = defineStore('menu', {
  state: () => ({
    category: 'espresso',
    menus: [],
  }),
  actions: {
    setCurrentTab(categoryId: string) {
      this.category = categoryId;
    },
    async getMenus() {
      try {
        const menuList = await getMenusAPI(this.category);
        this.menus = menuList;
      } catch (error) {
        return alert(error);
      }
    },
  },
});
