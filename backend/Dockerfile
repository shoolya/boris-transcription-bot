FROM node:18-alpine

WORKDIR /app

# Копируем файлы зависимостей
COPY package*.json ./

# Устанавливаем ВСЕ зависимости (включая dev)
RUN npm install

# Копируем исходный код
COPY . .

# Создаем пользователя для безопасности
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001
USER nodejs

# Открываем порт
EXPOSE 3001

# Запускаем приложение
CMD ["npm", "start"]
