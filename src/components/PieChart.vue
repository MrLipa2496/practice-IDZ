<template>
  <Doughnut :data="data" />
</template>

<script setup>
import { Doughnut } from 'vue-chartjs'
defineProps({ data: Object })
</script>
