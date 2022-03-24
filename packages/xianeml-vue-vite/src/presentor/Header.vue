<script setup lang="ts">
import { computed, watch } from 'vue';
import { useMenuStore } from '@/store/menu.ts';
import { INITIAL_CATEGORIES } from '@/constants';

const menuStore = useMenuStore();

const currentTab = computed(() => menuStore.category);

watch(currentTab, async () => await menuStore.getMenus());

const setCurrentTab = (categoryId: string) => {
  menuStore.setCurrentTab(categoryId);
};
</script>
<template>
  <header class="my-4">
    <a href="/" class="text-black">
      <h1 class="text-center font-bold text-[2em] m-b my-5">🌝 문벅스 메뉴 관리</h1>
    </a>
    <nav class="flex justify-center flex-wrap">
      <template v-for="category in INITIAL_CATEGORIES" :key="category.id">
        <button
          :data-category-name="category.id"
          class="h-9 min-w-[64px] px-4 rounded outline-none border-none cursor-pointer shadow mx-1 hover:bg-gray-300"
          :class="category.id === currentTab ? 'bg-gray-400' : 'bg-white'"
          @click="setCurrentTab(category.id)"
        >
          {{ category.text }}
        </button>
      </template>
    </nav>
  </header>
</template>
