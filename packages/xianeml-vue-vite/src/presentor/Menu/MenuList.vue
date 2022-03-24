<template>
  <div class="flex justify-between">
    <h2 class="text-2xl mb-5 mt-1 font-bold">{{ category.text }} 메뉴 관리</h2>
    <span class="mr-2 mt-4">총 {{ menuCount }}개</span>
  </div>
  <form :id="`${category.id}-menu-form`" @submit.prevent="addMenu">
    <div class="flex w-full">
      <label :for="`${category.id}-menu-name`" hidden>{{ category.text }} 메뉴 이름 </label>
      <input
        :id="`${category.id}-menu-name`"
        v-model="newMenuName"
        type="text"
        :name="`${category.id}MenuName`"
        class="text-base font-normal w-full h-auto px-5 py-3 border-none outline-none rounded-[2rem] bg-[#f1f5f9]"
        :placeholder="`${category.text} 메뉴 이름`"
        autocomplete="off"
      />
      <button
        :id="`${category.id}-menu-submit-button`"
        type="submit"
        name="submit"
        class="text-base cursor-pointer min-w-[90px] h-auto px-5 py-[0.65rem] border-none outline-none rounded-[2rem] bg-green-600 ml-2"
      >
        확인
      </button>
    </div>
  </form>
  <ul v-if="isLoaded" :id="`${category.id}-menu-list`" class="mt-3 pl-0">
    <MenuItem
      v-for="menu in menus"
      :key="menu.id"
      :menu="menu"
      :category="category.id"
      @reload-menu-list="reloadMenuList"
    />
  </ul>
</template>

<script lang="ts">
import { ref, computed, onMounted } from 'vue';
import MenuItem from './MenuItem.vue';
import { useMenuStore } from '@/store/menu.ts';
import { INITIAL_CATEGORIES } from '@/constants';
import { createMenuAPI } from '@/api/menu.ts';

export default {
  components: {
    MenuItem,
  },
  setup() {
    const menuStore = useMenuStore();

    const menus = computed(() => menuStore.menus);
    const category = computed(() => {
      return INITIAL_CATEGORIES.find(cate => cate.id === menuStore.category);
    });

    const menuCount = computed(() => menus.value.length);
    const isLoaded = ref(false);

    onMounted(async () => {
      await menuStore.getMenus();
      isLoaded.value = true;
    });

    const reloadMenuList = async () => await menuStore.getMenus();

    const newMenuName = ref('');

    const addMenu = async () => {
      if (!newMenuName.value) return;
      if (menus.value.length === 20) return alert('메뉴는 20개까지 추가 가능합니다.');
      try {
        const payload = {
          category: category.value.id,
          name: newMenuName.value,
        };
        await createMenuAPI(payload);
      } catch (error) {
        return alert(error);
      }
      newMenuName.value = '';
      reloadMenuList();
    };

    return {
      category,
      menus,
      menuCount,
      newMenuName,
      isLoaded,
      addMenu,
      reloadMenuList,
    };
  },
};
</script>
