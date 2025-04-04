<template>
  <div class="stat-card">
    <component :is="icon" class="icon" />
    <div class="content">
      <h3>{{ title }}</h3>
      <p>{{ value }}</p>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  title: String,
  value: [String, Number],
  icon: Object
})
</script>

<style scoped>
.stat-card {
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, #43a047, #388e3c);
  color: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  transition: transform 0.2s, box-shadow 0.2s;
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}

.icon {
  font-size: 40px;
  margin-right: 15px;
}

.content h3 {
  font-size: 18px;
  margin: 0;
  opacity: 0.8;
}

.content p {
  font-size: 28px;
  margin: 5px 0 0;
  font-weight: bold;
}
</style>
