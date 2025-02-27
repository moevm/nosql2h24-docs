<template>
  <div class="app">
    <header v-if="userStore.role" class="app-header">
      <div
        class="app-header-logo app-header-menu-item"
        @click="router.push({ name: 'main' })"
      >
        <!--<img
          src="../public/logo.png"
          class="icon__header"
        />-->
        Мои.Документы
      </div>
      <div
        class="app-header-menu"
      >
        <div>
          {{usname  }}
        </div>
        <div
          @click="handleClickExit"
          class="app-header-btn-exit"
        >
          <svg
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="Interface / Exit">
              <path
                id="Vector"
                d="M12 15L15 12M15 12L12 9M15 12H4M4 7.24802V7.2002C4 6.08009 4 5.51962 4.21799 5.0918C4.40973 4.71547 4.71547 4.40973 5.0918 4.21799C5.51962 4 6.08009 4 7.2002 4H16.8002C17.9203 4 18.4796 4 18.9074 4.21799C19.2837 4.40973 19.5905 4.71547 19.7822 5.0918C20 5.5192 20 6.07899 20 7.19691V16.8036C20 17.9215 20 18.4805 19.7822 18.9079C19.5905 19.2842 19.2837 19.5905 18.9074 19.7822C18.48 20 17.921 20 16.8031 20H7.19691C6.07899 20 5.5192 20 5.0918 19.7822C4.71547 19.5905 4.40973 19.2839 4.21799 18.9076C4 18.4798 4 17.9201 4 16.8V16.75"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
            <title>Выйти</title>
          </svg>
        </div>
      </div>
    </header>

    <main class="container">
      <router-view :key="$route.fullPath" />
    </main>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { fetchLogout } from './api';
import { userStore } from './main';

const router = useRouter();
const usname = localStorage.getItem('login');

const handleClickExit = async () => {
  userStore.removeRole();
  userStore.removeId();
  localStorage.removeItem('login');
  localStorage.removeItem('add_done');
  await fetchLogout();
  router.push({ name: 'Login' });
};

onMounted(async () => {
  await userStore.loadRole();
});
</script>