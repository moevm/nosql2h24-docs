<template>
  <div class="doc">
    <router-link :to="'/document/' + doc.id + '/' + doc.version[0] + '/' + doc.title">
      <div class="doc-item">
        <p>{{ doc.title }} | {{ doc.version[0] }}</p>
        <p>Пользователь: {{ doc.author }}</p>
        <p>Дата посл. изменения: {{ doc.updated.slice(0,10) }}</p>
      </div>
    </router-link>
    
  </div>
</template>

<script>
export default {
  props: {
    doc: {
      type: Object,
      required: true,
    }
  }
}
</script>

<style scoped>
.doc {
  padding: 15px;
  border: 2px solid teal;
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  
}

</style>
