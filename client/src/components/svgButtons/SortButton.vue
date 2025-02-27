<template>
  <div class="table_header__orderBy__btns__btn">
    <svg
      viewBox="-1 0 7 4"
      fill="#666666"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M-1 4L6 4L2.5 0Z"
        :fill="isActive && '#1d4b79e6'"
      />
    </svg>
  </div>
</template>

<script setup>
const props = defineProps({
  isActive: {
    type: Boolean,
    default: true,
  },
});
</script>
