<template>
  <transition name="modal-animation">
    <div v-show="props.modalActive" class="modal">
      <transition name="modal-animation-inner">
        <div v-show="props.modalActive" class="modal-inner">
          <h2 class="modal-inner-h">Версии</h2>
          <div class="modal-inner-c">
            <div v-for="el in versions" :key="el.id" 
            class="modal-inner-el"
            :class="[el.id == selected ? 'modal-inner-el-selected' : '']"
            @click="changeSelect(el.id)"
            >
              {{el.version}} - {{ el.id }} | {{ el.date.slice(0,10) }}
            </div>
          </div>
            
          <button @click="close" type="button" class="modal-inner-btn">ОК</button>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script setup>
import { ref,defineEmits, defineProps,reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router';

const selected = ref([])
const router = useRouter();
const queryParams = router.currentRoute.value.params


const emit = defineEmits(['close'])
const props = defineProps(['modalActive'])
const close = () => {
      emit("close", selected.value);
    };
const changeSelect = (versionId) => {
  selected.value = versionId
}
const versions = ref([]);
//const versions = reactive([{id: 1, version: 0.1, date: '20.23.1022'}, {id: 2, version: 0.2, date: '20.23.1022'}, {id: 3, version: 0.3, date: '20.23.1022'}])

const getVersions = async () => {
  const requestURL =
    process.env.VUE_APP_BASE_URL + `/documents/vers?id=${queryParams.id}`;

  try {
    const response = await fetch(requestURL, {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
    });

    if (response.ok) {
      versions.value = await response.json();
      //totalPages.value = Math.ceil(response.headers['x-total-count'] / limit)
    } else {
      console.log('Error HTTP: ' + response.status);
    }
  } catch (error) {
    console.log('Request execution error: ' + error.message);
  }
};

onMounted(async () => {
  await getVersions();
  selected.value = queryParams.versionId
});

</script>

<style lang="scss" scoped>
.modal-inner{
  max-height: 70vh;
  &-c{
    overflow-y: scroll;
  }
  &-btn{
    cursor: pointer;
  }
}
</style>