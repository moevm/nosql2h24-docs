<template lang="">
  <div class="document" v-if="!isDocLoading">
    <Modal @close="toggleModal" :modalActive="modalActive"/>
    <div>
      <div class="document-header">
      <h1>{{queryParams.title}}</h1>
      <div>Версия: {{queryParams.versionId}}</div>
    </div>
    <div class="document-body">
      <div class="document-body-pdf">
        <VuePdfEmbed  ref="pdfRef" :source="doc" @rendered="handleDocumentRender"/>
      </div>
      <div class="document-body-info">
        <h2 class="document-body-info-h">Статистика</h2>
        <p>Кол-во страниц: {{pageCount}}</p>
        <p>Тип документа: PDF</p>
        <button
        class="document-body-info-btn"
        @click="openModal"
      >
        Версии
      </button>
      </div>
    </div>
    </div>
    
  </div>
  <div v-else>Идет загрузка...</div>
</template>
<script setup>
import Modal from '@/components/Modal.vue';
import { ref, onMounted, computed } from 'vue';
import VuePdfEmbed from 'vue-pdf-embed'
import { useRouter } from 'vue-router';
import { Buffer } from 'buffer';
// either URL, Base64, binary, or document proxy
const isDocLoading = ref(true)
const router = useRouter();
const queryParams = router.currentRoute.value.params
const doc = ref([]);
const pageCount = ref(1)
const pdfRef = ref(null)
const modalActive = ref(false);
const openModal = () => {
      modalActive.value = !modalActive.value;
};
const toggleModal = (selected) => {
  console.log('selected',selected)
  modalActive.value = !modalActive.value;
  router.push('/document/' + queryParams.id + '/' + selected + '/' + queryParams.title)
};


const getDoc = async () => {
  const requestURL =
    process.env.VUE_APP_BASE_URL + `/documents/pdf?id=${queryParams.id}&version=${queryParams.versionId}`;

  try {
    const response = await fetch(requestURL, {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
    });

    if (response.ok) {
      doc.value = await response.arrayBuffer();
    } else {
      console.log('Error HTTP: ' + response.status);
    }
  } catch (error) {
    console.log('Request execution error: ' + error.message);
  }finally {
    isDocLoading.value = false;
  }
};

const handleDocumentRender = () => {
    //console.log(pdfRef.value.doc._pdfInfo.numPages)
      pageCount.value = pdfRef.value.doc._pdfInfo.numPages
};



onMounted(async () => {
  await getDoc();
});
</script>
<style lang="scss" scoped>

</style>