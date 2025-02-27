<template>
  <div v-if="docs.length > 0">
    <transition-group name="user-list">
      <doc-item
        v-for="doc in docs"
        :doc="doc"
        :key="doc.id"
      />
    </transition-group>
  </div>
  <h2 v-else class="empty">
    Список пуст
  </h2>
</template>

<script>
import DocItem from "@/components/DocItem";
export default {
  components: {DocItem},
  props: {
    docs: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
.empty{
  padding: 300px 100px;
  text-align: center;
}
.user-list-item {
  display: inline-block;
  margin-right: 10px;
}
.user-list-enter-active,
.user-list-leave-active {
  transition: all 0.4s ease;
}
.user-list-enter-from,
.user-list-leave-to {
  opacity: 0;
  transform: translateX(130px);
}
.user-list-move {
  transition: transform 0.4s ease;
}
</style>