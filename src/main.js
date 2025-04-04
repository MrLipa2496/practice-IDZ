import { createApp } from 'vue'
import { Chart, registerables } from 'chart.js'
import './styles/reset.css'
import App from './App.vue'
import router from './router'

Chart.register(...registerables)

const app = createApp(App)
app.use(router)
app.mount('#app')
