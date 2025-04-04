<template>
  <Line :data="data" :options="options" />
</template>

<script setup>
import { Line } from 'vue-chartjs'
defineProps({ data: Object, options: Object })
</script>
