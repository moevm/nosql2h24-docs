<template>
  <div class="add">
    <div
      class="preloader"
      v-if="isLoading"
    >
      <img
        src="@/assets/img/png/preloader.png"
        alt="preloader"
        class="preloader__loader"
        srcset="@/assets/img/svg/preloader.svg"
      />
    </div>
    <div
      class="add-content"
      v-else
    >
      <FileUploader
        @drop.prevent="drop"
        @change="selectedFile"
        @deleteFile="deleteFile"
        :uploaderFile="uploaderFile"
        :from="from"
      />
      <button
        class="add-btn"
        :class="{ add__btn_disabled: !uploaderFile }"
        @click="uploaderFile ? sendRequest() : setMessage()"
      >
        Добавить
      </button>
      <span
        v-if="!uploaderFile && message"
        class="add-warning"
      >
        <svg
          class="icon__warning"
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17.7465 14.4266L10.5352 1.89511C10.1972 1.33566 9.6338 1 8.95775 1C8.28169 1 7.71831 1.33566 7.38028 1.89511L0.169014 14.4266C-0.056338 14.8741 -0.056338 15.5455 0.169014 16.1049C0.507042 16.6643 1.07042 17 1.74648 17H16.169C16.8451 17 17.4085 16.6643 17.7465 16.1049C18.0845 15.5455 18.0845 14.8741 17.7465 14.4266ZM8.95775 14.986C8.28169 14.986 7.83099 14.4266 7.83099 13.8671C7.83099 13.1958 8.39437 12.7483 8.95775 12.7483C9.6338 12.7483 10.0845 13.3077 10.0845 13.8671C10.0845 14.4266 9.6338 14.986 8.95775 14.986ZM10.0845 10.0629C10.0845 10.7343 9.52113 11.1818 8.95775 11.1818C8.28169 11.1818 7.83099 10.6224 7.83099 10.0629V4.8042C7.83099 4.46853 8.05634 4.24476 8.39437 4.24476H9.6338C9.97183 4.24476 10.1972 4.46853 10.1972 4.8042L10.0845 10.0629Z"
            fill="#CD4141"
          />
        </svg>
        {{ message }}
      </span>
      <DialogWindow
        :isDownload="isDownload"
        :statusCode="statusCode"
        @hideWindow="showHideDialogWindow"
        :to="to"
        :from="from"
      />
    </div>
  </div>
</template>

<script setup>
import FileUploader from '@/components/FileUploader';
import DialogWindow from '@/components/DialogWindow.vue';
import b64ToBlob from 'b64-to-blob';
import FileSaver from 'file-saver';
import { useRoute, useRouter } from 'vue-router';
import { ref, computed } from 'vue';
import { Buffer } from 'buffer';
import { userStore } from '@/main';

const router = useRouter();
const statusCode = ref(0);
let uploaderFile = ref(null);
const message = ref('');
const isLoading = ref(false);
const isDownload = ref(false);
const is = ref(localStorage.getItem('add_done') || false);

const route = useRoute();
const from = computed(() => route.params.from);
const to = computed(() => route.params.to);

const drop = (e) => {
  setMessage('');
  uploaderFile.value = e.dataTransfer.files[0];

  if (checkTypeInputFile(uploaderFile.value.type) === false) {
    setMessage('Недопустимый формат файла: .' + getFileExtension() + '\nФормат файла должен соответствовать PDF');
    deleteFile();
  }
};
const selectedFile = () => {
  setMessage('');
  uploaderFile.value = document.querySelector('.uploaderFile').files[0];
};

const toggleLoading = () => {
  isLoading.value = !isLoading.value;
};

const showHideDialogWindow = () => {
  isDownload.value = !isDownload.value;
};

const sendRequest = async () => {
  const requestURL =
    process.env.VUE_APP_BASE_URL + '/documents';

  const formData = new FormData();

  formData.append('file', uploaderFile.value);
  try {
    toggleLoading();
    const response = await fetch(requestURL, {
      method: 'POST',
      mode: 'cors',
      body: formData,
      credentials: 'include',
    });
    statusCode.value = response.status;
    if (response.ok) {
      if (to.value === 'pdf') {
        const pdfAsBuffer = await response.arrayBuffer();
        const pdfAsBase64 = await Buffer.from(pdfAsBuffer).toString('base64');
        const blob = await b64ToBlob(pdfAsBase64, 'application/pdf');
        FileSaver.saveAs(blob, 'example.pdf');
      }
    } else {
      console.log(requestURL);
      console.log('Error HTTP: ' + response.status);
    }
  } catch (error) {
    console.log('Request execution error: ' + error.message);
  } finally {
    localStorage.setItem('add_done', true);
    is.value = true;
    toggleLoading();
    showHideDialogWindow();
    deleteFile();
  }
};
const checkTypeInputFile = (type) => {
  console.log(type);
  switch (from.value) {
    case 'pdf':
      if (
        type !== 'application/msword' &&
        type !==
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ) {
        return false;
      }
      return true;
    default:
      return false;
  }
};
const setMessage = (
  text = `Прикрепите недостающий документ в формате PDF`,
) => {
  message.value = text;
};
const getFileExtension = () => {
  return uploaderFile.value.name.split('.').pop();
};
const deleteFile = () => {
  uploaderFile.value = '';
};
</script>