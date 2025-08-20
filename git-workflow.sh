#!/bin/bash

echo "🔄 GitHub Workflow для BORIS"

# Проверяем статус
echo "📊 Статус Git:"
git status --porcelain

# Добавляем все изменения
echo "📁 Добавляю изменения..."
git add .

# Проверяем, есть ли изменения для коммита
if [[ -n $(git status --porcelain) ]]; then
    echo "❌ Есть незакоммиченные изменения!"
    git status
    exit 1
fi

# Если нет изменений
if [[ -z $(git diff --cached) ]]; then
    echo "✅ Нет изменений для коммита"
    exit 0
fi

# Запрашиваем сообщение коммита
echo "💬 Введите сообщение коммита:"
read commit_message

# Создаем коммит
echo "📝 Создаю коммит..."
git commit -m "$commit_message"

# Отправляем на GitHub
echo "🚀 Отправляю на GitHub..."
git push origin main

echo "✅ Изменения отправлены на GitHub!"
echo "🌐 Репозиторий: https://github.com/shoolya/boris-transcription-bot"
