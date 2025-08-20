#!/bin/bash

echo "🚀 Запуск проекта BORIS..."

# Проверяем наличие Docker
if ! command -v docker &> /dev/null; then
    echo "❌ Docker не установлен. Установите Docker и попробуйте снова."
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose не установлен. Установите Docker Compose и попробуйте снова."
    exit 1
fi

# Проверяем наличие .env файла
if [ ! -f .env ]; then
    echo "⚠️  Файл .env не найден. Копирую из примера..."
    cp env.example .env
    echo "📝 Отредактируйте файл .env с вашими настройками Yandex Cloud"
    echo "🔑 Не забудьте указать:"
    echo "   - YANDEX_CLOUD_ACCESS_KEY"
    echo "   - YANDEX_CLOUD_SECRET_KEY"
    echo "   - SPEECHKIT_API_KEY"
    echo "   - JWT_SECRET"
    read -p "Нажмите Enter после настройки .env файла..."
fi

# Останавливаем существующие контейнеры
echo "🛑 Останавливаю существующие контейнеры..."
docker-compose down

# Собираем и запускаем проект
echo "🔨 Собираю и запускаю проект..."
docker-compose up --build -d

# Ждем запуска сервисов
echo "⏳ Жду запуска сервисов..."
sleep 10

# Проверяем статус
echo "📊 Статус сервисов:"
docker-compose ps

echo ""
echo "✅ Проект BORIS запущен!"
echo "🌐 Frontend: http://localhost"
echo "🔧 Backend API: http://localhost:3001"
echo "🗄️  PostgreSQL: localhost:5432"
echo "🔴 Redis: localhost:6379"
echo ""
echo "📝 Логи можно посмотреть командой: docker-compose logs -f"
echo "🛑 Остановить проект: docker-compose down"
