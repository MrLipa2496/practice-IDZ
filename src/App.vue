<template>
  <div class="app2">
    <Sidebar v-if="showSidebar" />
    <router-view />
  </div>
</template>

<script>
import Sidebar from './components/Sidebar.vue'
import { useRoute } from 'vue-router'

export default {
  components: { Sidebar },
  computed: {
    showSidebar () {
      return this.$route.path !== '/login'
    }
  }
}
</script>

<style>
.app2 {
  display: flex;
}
</style>
