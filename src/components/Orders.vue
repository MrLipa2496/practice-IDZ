<template class="orders">
  <div class="orders-page">
    <h1 class="title">Список заказов</h1>
    <div class="orders-container">
      <div
        v-for="order in orders"
        :key="order.id"
        class="order-card"
        @click="openPopup(order)"
      >
        <h2 class="orderTitle">{{ order.title }}</h2>
        <p>{{ order.shortDescription }}</p>
        <p class="price">{{ order.price }}$</p>
      </div>
    </div>

    <div v-if="selectedOrder" class="popup-overlay" @click="closePopup">
      <div class="popup-content" @click.stop>
        <h2 class="orderTitle">{{ selectedOrder.title }}</h2>
        <p class="popupInfo">{{ selectedOrder.description }}</p>
        <span class="price">{{ selectedOrder.price }}$</span>
        <button class="close-btn" @click="closePopup">Закрыть</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const orders = ref([
  {
    id: 1,
    title: 'Разработка сайта',
    shortDescription: 'Создание лендинга',
    description:
      'Полный цикл разработки лендинга для бизнеса. Мы создаём уникальный дизайн и интегрируем необходимые функции.',
    price: 500
  },
  {
    id: 2,
    title: 'SEO-продвижение',
    shortDescription: 'Оптимизация сайта',
    description:
      'Комплексное SEO для улучшения видимости сайта в поисковых системах и привлечения целевой аудитории.',
    price: 300
  },
  {
    id: 3,
    title: 'Мобильное приложение',
    shortDescription: 'Разработка приложения',
    description:
      'Создание мобильного приложения под iOS и Android с индивидуальными функциями для вашего бизнеса.',
    price: 1000
  },
  {
    id: 4,
    title: 'Редизайн сайта',
    shortDescription: 'Обновление дизайна',
    description:
      'Полный редизайн сайта для улучшения визуальной привлекательности и юзабилити.',
    price: 750
  },
  {
    id: 5,
    title: 'Разработка интернет-магазина',
    shortDescription: 'Создание e-commerce платформы',
    description:
      'Разработка платформы для интернет-магазина с интеграцией платёжных систем и обработки заказов.',
    price: 1200
  },
  {
    id: 6,
    title: 'Логотип и фирменный стиль',
    shortDescription: 'Дизайн логотипа и фирменных элементов',
    description:
      'Создание уникального логотипа и фирменного стиля для компании или продукта.',
    price: 400
  },
  {
    id: 7,
    title: 'Разработка CRM-системы',
    shortDescription: 'Интеграция CRM-системы',
    description:
      'Разработка и внедрение CRM-системы для управления клиентами и продажами.',
    price: 1500
  },
  {
    id: 8,
    title: 'Создание блога',
    shortDescription: 'Блог-платформа',
    description:
      'Разработка блога с удобной системой управления контентом, SEO-оптимизацией и аналитикой.',
    price: 350
  },
  {
    id: 9,
    title: 'Веб-аналитика',
    shortDescription: 'Анализ трафика сайта',
    description:
      'Настройка веб-аналитики и создание отчетности для оценки трафика и эффективности маркетинговых кампаний.',
    price: 200
  },
  {
    id: 10,
    title: 'Модернизация сайта',
    shortDescription: 'Обновление функционала сайта',
    description:
      'Модернизация существующего сайта с добавлением новых функций и улучшением производительности.',
    price: 600
  },
  {
    id: 11,
    title: 'Обучение сотрудников',
    shortDescription: 'Курсы по маркетингу',
    description:
      'Обучение сотрудников основам маркетинга и продвижения в интернете.',
    price: 800
  },
  {
    id: 12,
    title: 'Разработка API',
    shortDescription: 'Создание API для сайта',
    description:
      'Разработка и интеграция API для подключения различных сервисов и улучшения функционала сайта.',
    price: 1000
  },
  {
    id: 13,
    title: 'Разработка чат-бота',
    shortDescription: 'Интеграция чат-бота',
    description:
      'Создание и настройка чат-бота для автоматизации общения с клиентами на сайте.',
    price: 500
  },
  {
    id: 14,
    title: 'Копирайтинг',
    shortDescription: 'Написание текстов',
    description:
      'Создание уникальных текстов для сайта, рекламы, блогов и других нужд.',
    price: 250
  },
  {
    id: 15,
    title: 'Видео-продакшн',
    shortDescription: 'Создание рекламных видео',
    description:
      'Разработка рекламных видео и роликов для продвижения бизнеса или продукта.',
    price: 900
  }
])

const selectedOrder = ref(null)

const openPopup = order => {
  selectedOrder.value = order
}

const closePopup = () => {
  selectedOrder.value = null
}
</script>

<style scoped>
.orders {
  width: 100%;
}
.orders-page {
  width: 100%;
  padding: 20px;
  background-color: #f4f8f6;
  color: #2c3e50;
  font-family: Arial, sans-serif;
}

.title {
  font-weight: bold;
  font-size: 30px;
  margin: 20px 20px 50px 20px;
  text-align: center;
  color: #2c7b5f;
}

.orders-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.order-card {
  background: #fff;
  text-align: center;
  padding: 45px 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  position: relative;
  overflow: hidden;

  transition: transform 0.2s ease;
}

.orderTitle {
  font-weight: 700;
  font-size: 18px;
  margin: 0 20px 20px 20px;
}

.order-card:hover {
  transform: translateY(-5px);
}

.price {
  font-weight: bold;
  font-size: 16px;
  padding: 10px 20px;
  background-color: #27ae60;
  color: white;
  position: absolute;
  right: 0;
  top: 0;
}

.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup-content {
  background: #fff;
  padding: 40px 20px 20px 20px;
  border-radius: 8px;
  max-width: 400px;
  position: relative;
  overflow: hidden;
  text-align: center;
}

.popupInfo {
  line-height: 1.4;
}

.close-btn {
  margin-top: 30px;
  padding: 10px;
  background: #2c7b5f;
  color: white;
  border: none;
  cursor: pointer;
}
</style>
