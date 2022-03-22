<template>
  <div class="flex justify-between">
    <h2 class="text-2xl mb-5 mt-1 font-bold">☕ 에스프레소 메뉴 관리</h2>
    <span class="mr-2 mt-4">총 {{ menuCount }}개</span>
  </div>
  <form id="espresso-menu-form" @submit.prevent="addMenu">
    <div class="flex w-full">
      <label for="espresso-menu-name" hidden> 에스프레소 메뉴 이름 </label>
      <input
        id="espresso-menu-name"
        v-model="newMenuName"
        type="text"
        name="espressoMenuName"
        class="text-base font-normal w-full h-auto px-5 py-3 border-none outline-none rounded-[2rem] bg-[#f1f5f9]"
        placeholder="에스프레소 메뉴 이름"
        autocomplete="off"
      />
      <button
        id="espresso-menu-submit-button"
        type="submit"
        name="submit"
        class="text-base cursor-pointer min-w-[90px] h-auto px-5 py-[0.65rem] border-none outline-none rounded-[2rem] bg-green-600 ml-2"
      >
        확인
      </button>
    </div>
  </form>
  <ul v-if="isLoaded" id="espresso-menu-list" class="mt-3 pl-0">
    <MenuItem v-for="menu in menus" :key="menu.id" :menu="menu" @reload-menu-list="initMenuList" />
  </ul>
</template>

<script lang="ts">
// TODO: 추후 ts, setup 적용
import { ref, computed, onMounted } from 'vue';
import MenuItem from './MenuItem.vue';
import { getMenusAPI, createMenuAPI } from '@/api/menu.ts';
export default {
  components: {
    MenuItem,
  },
  setup() {
    const category = ref('espresso');
    const menus = ref([]);
    const isLoaded = ref(false);

    const menuCount = computed(() => menus.value.length);

    const initMenuList = async () => {
      const menuList = await getMenusAPI(category.value);
      menus.value = menuList;
      isLoaded.value = true;
    };

    onMounted(() => initMenuList());

    const newMenuName = ref('');

    const addMenu = async () => {
      if (menus.value.length === 20) {
        return alert('메뉴는 20개까지 추가 가능합니다.');
      }
      if (!newMenuName.value) return;
      try {
        await createMenuAPI({
          category: category.value,
          name: newMenuName.value,
        });
      } catch (error) {
        // TODO: 커스텀 에러 객체 만들어서 message만 알림창에 표시하기
        newMenuName.value = '';
        return alert(error);
      }
      newMenuName.value = '';
      initMenuList();
    };

    return { newMenuName, menus, menuCount, isLoaded, addMenu, initMenuList };
  },
};
</script>
