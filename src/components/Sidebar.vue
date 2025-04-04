<template>
  <div>
    <button class="burger-button" @click="toggleSidebar" v-if="isMobile">
      <X class="icon" :class="{ rotate: isSidebarVisible }" />
    </button>

    <aside
      :class="[
        'sidebar',
        {
          'sidebar--collapsed': isCollapsed,
          'sidebar--visible': isSidebarVisible || !isMobile
        }
      ]"
    >
      <nav class="sidebar__menu">
        <router-link to="/dashboard" class="sidebar__item">
          <i class="bx bx-line-chart"></i>
          <span>Дэшборд</span>
        </router-link>

        <router-link to="/profile" class="sidebar__item">
          <i class="bx bx-user"></i>
          <span>Профиль</span>
        </router-link>

        <router-link to="/orders" class="sidebar__item">
          <i class="bx bx-cart"></i>
          <span>Заказы</span>
        </router-link>

        <button @click="logout" class="sidebar__item sidebar__logout">
          <i class="bx bx-exit"></i>
          <span>Выйти</span>
        </button>
      </nav>
    </aside>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { Menu, X } from 'lucide-vue-next'

const isCollapsed = ref(false)
const isSidebarVisible = ref(false)
const windowWidth = ref(window.innerWidth)

const isMobile = computed(() => windowWidth.value <= 768)

const toggleSidebar = () => {
  if (isMobile.value) {
    isSidebarVisible.value = !isSidebarVisible.value
  }
}

const handleClickOutside = event => {
  if (
    isSidebarVisible.value &&
    !event.target.closest('.sidebar') &&
    !event.target.closest('.burger-button')
  ) {
    isSidebarVisible.value = false
  }
}

// Оновлення `isMobile` при зміні розміру екрану
const updateWindowSize = () => {
  windowWidth.value = window.innerWidth
  if (!isMobile.value) {
    isSidebarVisible.value = true
  } else {
    isSidebarVisible.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  window.addEventListener('resize', updateWindowSize)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  window.removeEventListener('resize', updateWindowSize)
})

const logout = () => {
  localStorage.removeItem('user')
  window.location.href = '/login'
}
</script>

<style scoped>
.burger-button {
  position: fixed;
  top: 15px;
  left: 0;
  width: 50px;
  height: 50px;
  background: none;
  border: none;
  cursor: pointer;
  color: black;
  z-index: 11000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border-radius: 8px;
  transition: background 0.3s ease-in-out;
}

.icon {
  width: 32px;
  height: 32px;
  transition: transform 0.3s ease-in-out;
}

.rotate {
  transform: rotate(90deg);
}

.sidebar {
  width: 260px;
  height: 100%;
  background-color: #2e7d32;
  color: white;
  top: 0;
  left: 0;
  padding: 20px;
  display: flex;
  flex-direction: column;
  transition: left 0.3s ease-in-out;
  z-index: 1000;
}

.sidebar__menu {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.sidebar__item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 12px 15px;
  border-radius: 8px;
  color: white;
  text-decoration: none;
  font-size: 16px;
  transition: background 0.3s ease-in-out, transform 0.2s;
}

.sidebar__item:hover {
  background: #1b5e20;
  transform: scale(1.05);
}

.sidebar__logout {
  margin-top: auto;
  background: none;
  border: none;
  width: 100%;
  text-align: left;
  cursor: pointer;
}

.sidebar__logout:hover {
  background: #c62828;
}

/* Прихований сайдбар на мобільних */
@media (max-width: 768px) {
  .sidebar {
    left: -300px;
    position: fixed;
  }
  .sidebar--visible {
    left: 0;
    position: fixed;
  }
}
</style>
