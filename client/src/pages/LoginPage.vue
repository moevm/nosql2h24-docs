<template>
  <div class="login">
    <div class="login__content">
      <h1 class="header">Мои.Документы</h1>
      <form
        @submit.prevent="handleClick"
        class="login__content__form"
      >
        <input
          v-model="login"
          type="text"
          placeholder="Логин"
        />
        <input
          v-model="password"
          type="password"
          placeholder="Пароль"
        />
        <button>Войти</button>

        <b
          class="login__content__form__error"
          v-show="isWrong"
        >
          Неверный логин или пароль
        </b>
        <b
          class="login__content__form__error"
          v-show="isEmptyInputs"
        >
          Заполните все поля
        </b>
      </form>
      <b
        :class="[
          createdStatus.includes('существует')
            ? 'login__content__form__error'
            : 'login__content__form__success',
        ]"
        v-show="createdStatus"
      >
        {{ createdStatus }}
      </b>
    </div>
  </div>
</template>
<script setup>
import { ref, watch } from 'vue';
import { useRouter, RouterLink } from 'vue-router';
import { fetchPostAuthorization, fetchPostSignup } from '@/api';
import { userStore } from '@/main';

const router = useRouter();
const isPageLogin = router.currentRoute.value.path === '/login';
const login = ref('');
const password = ref('');
const isWrong = ref(false);
const isEmptyInputs = ref(false);

const createdStatus = ref('');

watch([login, password], () => {
  isEmptyInputs.value = false;
  isWrong.value = false;
  if (login.value !== '' || password.value !== '') {
    createdStatus.value = '';
  }
});

const handleClick = async () => {
  if (login.value === '' || password.value === '') {
    isEmptyInputs.value = true;
    return;
  }
    const response = await fetchPostAuthorization(login.value, password.value);
    if (response.status === 200) {
      const responseJson = await response.json();
      userStore.setRole(responseJson.role);
      userStore.setId(responseJson.id);
      localStorage.setItem('login', login.value);
      router.push({ path: '/' });
    } else {
      isWrong.value = true;
    }
};
</script>