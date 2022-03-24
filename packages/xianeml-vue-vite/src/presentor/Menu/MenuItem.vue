<template>
  <li class="flex items-center py-2">
    <span class="w-full pl-2" :class="{ 'line-through text-gray-400': !menu.inStock }">
      {{ menu.menuName }}
    </span>
    <button
      class="bg-gray-50 text-gray-500 text-sm mr-1 w-[60px] cursor-pointer h-auto border-none outline-none rounded-[2rem]"
      @click="soldOutMenu(menu.id, menu.inStock)"
    >
      {{ menu.inStock ? '품절' : '입고' }}
    </button>
    <button
      class="bg-gray-50 text-gray-500 text-sm mr-1 w-[60px] cursor-pointer h-auto border-none outline-none rounded-[2rem]"
      @click="modifyMenu(menu.id)"
    >
      수정
    </button>
    <button
      class="bg-gray-50 text-gray-500 text-sm mr-1 w-[60px] cursor-pointer h-auto border-none outline-none rounded-[2rem]"
      @click="deleteMenu(menu.id)"
    >
      삭제
    </button>
  </li>
</template>

<script lang="ts">
import { modifyMenuAPI, soldOutMenuAPI, deleteMenuAPI } from '@/api/menu.ts';

export default {
  props: {
    category: {
      type: String,
      require: true,
      default: 'espresso',
    },
    menu: {
      type: Object,
      require: true,
      default: () => {},
    },
  },
  emits: ['reloadMenuList'],
  setup(props, { emit }) {
    const soldOutMenu = async (menuId: string, inStock: boolean) => {
      if (!confirm(`메뉴를 ${inStock ? '품절' : '입고'} 처리하시겠습니까?`)) return;
      const payload = {
        category: props.category,
        menuId,
      };
      try {
        await soldOutMenuAPI(payload);
      } catch (error) {
        return alert(error);
      }
      emit('reloadMenuList');
    };

    const modifyMenu = async (menuId: string) => {
      const newMenuName = prompt('수정할 메뉴명을 입력하세요.')?.trim();
      if (!newMenuName) return;
      const payload = {
        category: props.category,
        menuId,
        name: newMenuName || '',
      };
      try {
        await modifyMenuAPI(payload);
      } catch (error) {
        return alert(error);
      }
      emit('reloadMenuList');
    };

    const deleteMenu = async (menuId: string) => {
      if (!confirm('메뉴를 삭제하시겠습니까?')) return;
      const payload = {
        category: props.category,
        menuId,
      };
      try {
        await deleteMenuAPI(payload);
      } catch (error) {
        return alert(error);
      }
      emit('reloadMenuList');
    };

    return {
      soldOutMenu,
      modifyMenu,
      deleteMenu,
    };
  },
};
</script>
