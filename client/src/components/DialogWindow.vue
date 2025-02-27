<template>
  <div
    class="dialog-window"
    v-if="isDownload"
  >
    <div class="dialog-window__content">
      <button
        class="dialog-window__btn-close"
        @click="hideDialogWindow"
      >
        <svg
          class="icon__close"
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13.4282 3.08977L3.00171 13.5251L4.57163 15.0937L14.9982 4.65836L13.4282 3.08977Z"
            fill="#666666"
          />
          <path
            d="M4.56905 2.90834L2.99979 4.4776L13.4307 14.9085L15 13.3393L4.56905 2.90834Z"
            fill="#666666"
          />
        </svg>
      </button>
      <div
        v-if="statusCode === 200"
        class="dialog-window__message success"
      >
        <svg
          class="icon__success"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20ZM15.7537 6.26767H15.7538C16.0821 6.62456 16.0821 7.20227 15.7537 7.55788L9.14567 14.733C8.98155 14.9114 8.7661 15 8.55125 15C8.3364 15 8.12095 14.9114 7.95683 14.733L4.24628 10.7044C3.91791 10.3475 3.91791 9.76983 4.24628 9.41422C4.57453 9.05733 5.10687 9.05733 5.43512 9.41422L8.55125 12.797L14.565 6.26767C14.8932 5.91078 15.4255 5.91078 15.7537 6.26767Z"
            fill="#27AE60"
          />
        </svg>
        <div>
          <h4>Конвертация завершена</h4>
          <p>Преобразование файла завершено. Файл успешно загружен.</p>
        </div>
      </div>
      <div
        v-else
        class="dialog-window__message error"
      >
        <svg
          class="icon__error"
          width="30"
          height="30"
          viewBox="0 0 30 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_42_151)">
            <path
              d="M15 30C23.2843 30 30 23.2843 30 15C30 6.71573 23.2843 0 15 0C6.71573 0 0 6.71573 0 15C0 23.2843 6.71573 30 15 30Z"
              fill="#CD4141"
            />
            <path
              d="M16.8 6H13.1L13.5 18H16.4L16.8 6ZM13.6 20.2C13.3 20.5 13.1 21 13.1 21.5C13.1 22 13.3 22.4 13.6 22.8C13.9 23.1 14.4 23.3 15 23.3C15.6 23.3 16 23.1 16.4 22.8C16.7 22.5 16.9 22 16.9 21.5C16.9 21 16.7 20.5 16.4 20.2C16.1 19.9 15.6 19.7 15 19.7C14.4 19.7 14 19.9 13.6 20.2Z"
              fill="white"
            />
          </g>
          <defs>
            <clipPath id="clip0_42_151">
              <rect
                width="30"
                height="30"
                fill="white"
              />
            </clipPath>
          </defs>
        </svg>
        <div>
          <h4>Конвертация прервана</h4>
          <p>
            Ошибка при конвертации файла. Пожалуйста, повторите попытку позже.
          </p>
        </div>
      </div>
      <div class="dialog-window__btns">
        <button @click="router.push('/logs')">Логи</button>

        <button @click="hideDialogWindow">Продолжить</button>
      </div>
    </div>
    <div
      class="dialog-window__overlay"
      @click="hideDialogWindow"
    ></div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const emit = defineEmits(['hideWindow']);

const props = defineProps({
  isDownload: {
    type: Boolean,
    default: false,
  },
  statusCode: {
    type: Number,
    required: true,
  },
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
});
const router = useRouter();

const hideDialogWindow = async () => {
  emit('hideWindow');
};
</script>
