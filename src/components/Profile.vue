<template>
  <div class="profile">
    <h1 class="profileTitle">Профиль пользователя</h1>
    <table>
      <thead>
        <tr>
          <th>Поле</th>
          <th>Значение</th>
          <th>Действия</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Имя</td>
          <td>{{ user.name }}</td>
          <td>
            <button class="btnChange" @click="edit('name')">Изменить</button>
          </td>
        </tr>
        <tr>
          <td>Email</td>
          <td>{{ user.email }}</td>
          <td>
            <button class="btnChange" @click="edit('email')">Изменить</button>
          </td>
        </tr>
        <tr>
          <td>Аватар</td>
          <td>
            <img :src="user.avatar" alt="Аватар" class="avatar" />
          </td>
          <td>
            <button class="btnChange" @click="edit('avatar')">Изменить</button>
          </td>
        </tr>
        <tr>
          <td>Адрес</td>
          <td>{{ user.address }}</td>
          <td>
            <button class="btnChange" @click="edit('address')">Изменить</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Диалоговое окно для редактирования -->
    <div v-if="isEditing" class="modal">
      <div class="modal-content">
        <h3 class="modalTitle">Редактировать {{ fieldLabel }}</h3>

        <div v-if="editingField === 'avatar'">
          <input type="file" @change="handleAvatarChange" />
        </div>

        <div v-else-if="editingField === 'address'">
          <input
            v-model="newValue"
            placeholder="Введите новый адрес"
            @input="updateAddress"
          />
          <div id="map" class="map-container"></div>
        </div>

        <div v-else>
          <input v-model="newValue" :placeholder="fieldLabel" />
        </div>
        <div class="btnWrapper">
          <button class="btnChange" @click="saveChanges">Сохранить</button>
          <button class="btnChange" @click="cancelEdit">Отменить</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const user = ref({
  name: '',
  email: '',
  avatar: 'https://via.placeholder.com/150',
  address: ''
})

const isEditing = ref(false)
const editingField = ref('')
const newValue = ref('')
const map = ref(null)
const marker = ref(null)

onMounted(() => {
  const storedUser = JSON.parse(localStorage.getItem('user'))
  if (storedUser) {
    user.value.name = storedUser.name || ''
    user.value.email = storedUser.email || ''
    user.value.avatar = storedUser.avatar || 'https://via.placeholder.com/150'
    user.value.address = storedUser.address || ''
  }
  loadMap()
})

const fieldLabel = computed(() => {
  return {
    name: 'Имя',
    email: 'Email',
    avatar: 'Аватар',
    address: 'Адрес'
  }[editingField.value]
})

const edit = field => {
  editingField.value = field
  newValue.value = user.value[field]
  isEditing.value = true

  if (field === 'address') {
    setTimeout(() => {
      loadMap()
    }, 100)
  }
}

const saveChanges = () => {
  if (editingField.value === 'avatar') return

  if (!newValue.value.trim()) return

  user.value[editingField.value] = newValue.value
  localStorage.setItem('user', JSON.stringify(user.value))
  isEditing.value = false
}

const handleAvatarChange = event => {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = () => {
      user.value.avatar = reader.result
      localStorage.setItem('user', JSON.stringify(user.value))
      isEditing.value = false
    }
    reader.readAsDataURL(file)
  }
}

const cancelEdit = () => {
  isEditing.value = false
}

const loadMap = () => {
  const mapContainer = document.getElementById('map')
  if (!mapContainer) {
    console.error('Map container not found!')
    return
  }

  map.value = L.map(mapContainer).setView([51.505, -0.09], 13)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(
    map.value
  )
  marker.value = L.marker([51.505, -0.09]).addTo(map.value)
}

const updateAddress = async () => {
  if (!newValue.value.trim()) return

  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        newValue.value
      )}`
    )
    const data = await response.json()

    if (data && data[0]) {
      const lat = parseFloat(data[0].lat)
      const lon = parseFloat(data[0].lon)

      map.value.setView([lat, lon], 13)
      marker.value.setLatLng([lat, lon])

      user.value.address = newValue.value
    } else {
      console.error('Адрес не найден.')
    }
  } catch (error) {
    console.error('Ошибка при поиске адреса:', error)
  }
}
</script>

<style scoped>
.profile {
  padding: 20px;
  height: 100vh;
  width: 100%;
}

.profileTitle {
  text-align: center;
  color: #2c7b5f;
  font-size: 32px;
  font-weight: bold;
  margin: 20px 0 80px 0;
}

table {
  max-width: 700px;
  width: 100%;
  margin: 0 auto;
  margin-bottom: 20px;
  border-collapse: collapse;
}

th,
td {
  text-align: center;
  padding: 10px;
  border: 1px solid #ddd;
}

.btnChange {
  padding: 8px 15px;
  margin: 0 auto;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  width: 300px;
}

.modalTitle {
  font-size: 20px;
  margin-bottom: 20px;
}

.modal-content input {
  padding: 8px;
  margin-bottom: 15px;
  border-radius: 4px;
  border: 1px solid #ccc;
  width: 100%;
}

.btnWrapper {
  display: flex;
  justify-content: space-around;
}

.avatar {
  width: 100px;
  height: 100px;
  object-fit: cover;
  overflow: hidden;
  border-radius: 50%;
}

.map-container {
  width: 100%;
  height: 200px;
  margin-top: 20px;
}

/* Адаптивные стили для экрана 320px */
@media (max-width: 320px) {
  .profileTitle {
    font-size: 24px;
  }

  table {
    width: 100%;
    font-size: 14px;
  }

  th,
  td {
    padding: 8px;
  }

  .btnChange {
    padding: 6px 12px;
  }

  .modal-content {
    width: 80%;
  }

  .avatar {
    width: 80px;
    height: 80px;
  }

  .map-container {
    height: 150px;
  }
}
</style>
