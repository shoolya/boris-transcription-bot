#!/bin/bash

echo "🔄 Полное обновление BORIS Frontend..."

# Останавливаем все процессы
echo "🛑 Останавливаю все процессы..."
pkill -f "npm run dev" || true
pkill -f "vite" || true
sleep 2

# Очищаем кэш
echo "🧹 Очищаю кэш..."
rm -rf node_modules/.vite
rm -rf .vite
rm -rf dist
sleep 1

# Проверяем файлы
echo "📁 Проверяю ключевые файлы..."
echo "App.tsx:"
head -5 src/App.tsx
echo ""

# Пересобираем
echo "🔨 Пересобираю проект..."
npm run build
sleep 2

# Запускаем в фоне
echo "🚀 Запускаю Vite в фоне..."
nohup npm run dev > vite.log 2>&1 &
sleep 5

# Проверяем статус
echo "📊 Статус:"
ps aux | grep "npm run dev" | grep -v grep || echo "❌ Vite не запущен"
echo ""

# Проверяем порт
echo "🌐 Проверяю порт 3000:"
ss -tlnp | grep :3000 || echo "❌ Порт 3000 не занят"
echo ""

echo "✅ Обновление завершено!"
echo "📝 Логи: tail -f vite.log"
echo "🌐 Приложение: http://89.169.183.205:3000"
