<template>
  <div class="dashboard">
    <h1 class="title">Дэшборд</h1>

    <div class="stats-grid">
      <StatCard v-for="stat in stats" :key="stat.title" v-bind="stat" />
    </div>

    <div class="charts-grid">
      <ChartCard title="Распределение Статистики">
        <PieChart :data="pieData" />
      </ChartCard>

      <ChartCard title="Статистика по категориям">
        <BarChart :data="barData" :options="barOptions" />
      </ChartCard>

      <ChartCard title="Продажи по месяцам">
        <LineChart :data="lineData" :options="lineOptions" />
      </ChartCard>

      <ChartCard title="Доходы и затраты">
        <AreaChart :data="areaData" :options="areaOptions" />
      </ChartCard>
    </div>

    <div class="news-section">
      <h2>Последние события</h2>
      <ul>
        <li v-for="news in latestNews" :key="news.id">
          {{ news.title }} <span class="date">{{ news.date }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { Users, ShoppingBag, DollarSign, Package } from 'lucide-vue-next'
import StatCard from './StatCard.vue'
import ChartCard from './ChartCard.vue'
import PieChart from './PieChart.vue'
import BarChart from './BarChart.vue'
import LineChart from './LineChart.vue'
import AreaChart from './AreaChart.vue'

const stats = [
  { title: 'Пользователи', value: 1200, icon: Users },
  { title: 'Заказы', value: 800, icon: ShoppingBag },
  { title: 'Доход', value: '150,000$', icon: DollarSign },
  { title: 'Товары', value: 5000, icon: Package }
]

const pieData = {
  labels: [
    'Пользователи',
    'Заказы',
    'Доход',
    'Товары',
    'Активные пользователи'
  ],
  datasets: [
    {
      data: [20, 30, 25, 15, 10],
      backgroundColor: ['#4CAF50', '#66BB6A', '#81C784', '#A5D6A7', '#C8E6C9']
    }
  ]
}

const barData = {
  labels: [
    'Пользователи',
    'Заказы',
    'Доход',
    'Товары',
    'Активные пользователи'
  ],
  datasets: [
    {
      label: 'Количество',
      data: [1200, 800, 150000, 5000, 980],
      backgroundColor: '#4CAF50'
    }
  ]
}

const lineData = {
  labels: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май'],
  datasets: [
    {
      label: 'Продажи',
      data: [1000, 1500, 1200, 1300, 1600],
      borderColor: '#4CAF50',
      fill: false
    }
  ]
}

const areaData = {
  labels: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май'],
  datasets: [
    {
      label: 'Доход',
      data: [1000, 1500, 1200, 1300, 1600],
      backgroundColor: 'rgba(76, 175, 80, 0.5)'
    },
    {
      label: 'Затраты',
      data: [400, 800, 600, 700, 900],
      backgroundColor: 'rgba(76, 175, 80, 0.3)'
    }
  ]
}

const latestNews = [
  { id: 1, title: 'Добавлена новая аналитика', date: '03.04.2025' },
  { id: 2, title: 'Обновлены отчеты по продажам', date: '02.04.2025' },
  { id: 3, title: 'Обновление системы безопасности', date: '01.04.2025' }
]
</script>

<style scoped>
.dashboard {
  width: 100%;
  height: 100vh;
  padding: 20px;
  font-family: 'Roboto', sans-serif;
}

.title {
  text-align: center;
  color: #2c7b5f;
  font-size: 32px;
  font-weight: bold;
  margin: 20px 20px 50px 20px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.charts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 30px;
}

.news-section {
  margin-top: 30px;
  background: #e8f5e9;
  padding: 15px;
  border-radius: 10px;
}

.news-section h2 {
  margin-bottom: 10px;
}

.news-section ul {
  list-style: none;
  padding: 0;
}

.news-section li {
  font-size: 16px;
  margin-bottom: 5px;
}

.date {
  font-size: 14px;
  color: gray;
}
</style>
