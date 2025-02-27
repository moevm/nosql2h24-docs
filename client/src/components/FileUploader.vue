<template>
  <div
    @dragenter.prevent="toggleActive"
    @dragleave.prevent="toggleActive"
    @dragover.prevent
    @drop.prevent="toggleActive"
    class="uploader"
    :class="{ uploader_active: active }"
  >
    <svg
      class="icon__download"
      width="32"
      height="33"
      viewBox="0 0 32 33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M32 18.3148C32 22.4058 28.7439 25.7222 24.7273 25.7222V22.7593C24.8256 22.7593 24.9231 22.7559 25.0198 22.7494C27.2934 22.5961 29.0909 20.6693 29.0909 18.3148C29.0909 16.9718 28.506 15.7679 27.5816 14.9529C26.8164 14.2784 25.8186 13.8704 24.7273 13.8704C24.7273 12.8263 24.5152 11.8327 24.1325 10.9318C23.0158 8.30263 20.4461 6.46296 17.4545 6.46296C14.9184 6.46296 12.6854 7.78518 11.3839 9.78975C10.8416 10.6249 10.461 11.5786 10.2876 12.6044C9.79102 12.4639 9.26776 12.3889 8.72727 12.3889C8.25416 12.3889 7.79423 12.4464 7.35386 12.5549C4.80337 13.1836 2.90909 15.5239 2.90909 18.3148C2.90909 21.0761 4.76331 23.3962 7.27273 24.054V27.0808C3.14514 26.3755 0 22.7193 0 18.3148C0 13.57 3.6501 9.69343 8.24638 9.43919C9.87784 5.92842 13.3878 3.5 17.4545 3.5C22.2428 3.5 26.259 6.86641 27.3462 11.4022C30.0688 12.473 32 15.1642 32 18.3148ZM21.0909 21.098L17.7557 24.4949L17.7558 12.3889L14.8467 12.3889L14.8467 24.4949L11.5115 21.098L9.4545 23.1932L16.3012 30.1667L23.1479 23.1932L21.0909 21.098Z"
        fill="#0087C9"
      />
    </svg>

    <span>Перетащите файл сюда</span>
    <span>ИЛИ</span>
    <label>
      Выберите файл
      <input
        type="file"
        name="uploaderFile"
        class="uploaderFile"
        :accept="
          from === 'zip'
            ? '.zip'
            : '.doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        "
      />
    </label>

    <div
      class="uploader__file-view"
      v-if="uploaderFile"
    >
      <div class="uploader__file-name">
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            opacity="0.6"
            d="M11.8 1H4C3.4 1 3 1.4 3 2V16C3 16.6 3.5 17 4 17H14C14.6 17 15 16.5 15 16V4.1L11.8 1ZM9 14H5V13H9V14ZM13 12H5V11H13V12ZM13 10H5V9H13V10ZM13 8H5V7H13V8ZM11 5V2L14 5H11Z"
            fill="black"
          />
        </svg>

        <span v-if="uploaderFile.name.length > maxLength * 2">{{
          uploaderFile.name.slice(0, maxLength) +
          '...' +
          uploaderFile.name.slice(-maxLength)
        }}</span>
        <span v-else>{{ uploaderFile.name }}</span>
      </div>
      <button
        class="uploader__trash-btn"
        @click="$emit('deleteFile')"
      >
        <div class="uploader__trash-tooltip">
          <svg
            class="icon__trash"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              opacity="0.6"
              d="M15 5H3V4.3C3 3.6 3.6 3 4.3 3H13.8C14.5 3 15 3.5 15 4.2V5Z"
              fill="black"
            />
            <path
              opacity="0.6"
              d="M11 2H7V3H11V2Z"
              fill="black"
            />
            <path
              opacity="0.6"
              d="M4 6L4.9 14.9C5 15.5 5.5 16 6.1 16H11.9C12.5 16 13.1 15.5 13.1 14.9L14 6H4ZM8 14H7V8H8V14ZM11 14H10V8H11V14Z"
              fill="black"
            />
          </svg>
          <span class="uploader__trash-tooltip-text"> Удалить файл </span>
        </div>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const props = defineProps({
  uploaderFile: {
    type: [File, null, String],
    required: true,
  },
  from: {
    type: String,
    required: true,
  },
});

const active = ref(false);
const maxLength = 12;
const toggleActive = () => {
  active.value = !active.value;
};
</script>
