<template>
  <div class="main">
    <div class="main-content">
      <div class="main-content-filter">
        <!--<button
        class="main-content-filter-btn"
        @click="router.push('/add-document')"
      >
        Добавить
      </button>-->
      </div>
      
        <DocumentList
          :docs="sortedDocs"
          v-if="!isDocsLoading"
        />
        <div v-else>Идет загрузка...</div>
    </div>
  </div>
</template>

<script setup>

import DocumentList from '@/components/DocumentList';
import { ref, onMounted, computed } from 'vue';
import { userStore } from '@/main';
import { useRouter } from 'vue-router';

const totalPages = ref(0)
const isDocsLoading = ref(true)
const selectedSort = ref('')
const sortedDocs = computed(() => {
  return [...docs.value].sort((post1, post2) => post1[selectedSort.value]?.localeCompare(post2[selectedSort.value]))
})

const router = useRouter();

const docs = ref([]);

const getDocs = async () => {
  const requestURL =
    process.env.VUE_APP_BASE_URL + `/documents?id=${userStore.userId}`;

  try {
    const response = await fetch(requestURL, {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
    });

    if (response.ok) {
      docs.value = await response.json();
      console.log(docs.value)
      //totalPages.value = Math.ceil(response.headers['x-total-count'] / limit)
      totalPages.value = 10
    } else {
      console.log('Error HTTP: ' + response.status);
    }
  } catch (error) {
    console.log('Request execution error: ' + error.message);
  }finally {
    isDocsLoading.value = false;
  }
};

onMounted(async () => {
  await getDocs();
});
</script>

<style scoped>

</style>