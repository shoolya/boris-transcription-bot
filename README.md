# BORIS - Бот Обработки Разговоров Интеллектуального Суммирования

PWA приложение для автоматической транскрибации голосовых разговоров с формированием структурированных тезисов.

## Возможности

- 🎤 Запись голоса в реальном времени
- 📁 Загрузка аудиофайлов (до 8 часов)
- 🗣️ Транскрибация через Яндекс SpeechKit
- 📝 Автоматическое формирование тезисов
- 📄 Экспорт в DOCX, PDF, TXT
- 📚 История всех транскрибаций
- 🔐 Аутентификация по email

## Технологии

- **Backend**: Node.js + Express.js
- **Frontend**: React + TypeScript
- **База данных**: PostgreSQL
- **Очереди**: Redis + Bull
- **Облако**: Yandex Cloud (SpeechKit, Object Storage)
- **Контейнеризация**: Docker

## Быстрый старт

### Предварительные требования

- Docker и Docker Compose
- Node.js 18+
- Доступ к Yandex Cloud

### Установка

1. Клонируйте репозиторий:
```bash
git clone <repository-url>
cd BORIS
```

2. Создайте файл `.env` в корне проекта:
```bash
cp .env.example .env
# Отредактируйте переменные окружения
```

3. Запустите проект:
```bash
docker-compose up -d
```

4. Откройте в браузере: http://89.169.183.205:3000

### Переменные окружения

Создайте файл `.env` со следующими переменными:

```env
# База данных
DATABASE_URL=postgresql://boris_user:boris_password@localhost:5432/boris_db
REDIS_URL=redis://localhost:6379

# Yandex Cloud
YANDEX_CLOUD_ACCESS_KEY=your_access_key
YANDEX_CLOUD_SECRET_KEY=your_secret_key
SPEECHKIT_API_KEY=your_speechkit_key

# JWT
JWT_SECRET=your_jwt_secret

# Приложение
NODE_ENV=development
PORT=3001
```

## Структура проекта

```
BORIS/
├── frontend/          # React PWA приложение
├── backend/           # Node.js API сервер
├── docker/            # Docker конфигурация
├── docs/              # Документация
├── scripts/           # Скрипты развертывания
├── docker-compose.yml # Docker Compose
└── README.md          # Этот файл
```

## API Endpoints

- **Аутентификация**: `/api/auth/*`
- **Аудио**: `/api/audio/*`
- **Транскрибация**: `/api/transcribe/*`
- **Тезисы**: `/api/summary/*`
- **Экспорт**: `/api/export/*`
- **История**: `/api/history/*`

## Разработка

### Backend
```bash
cd backend
npm install
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm start
```

## Тестирование

```bash
# Backend тесты
cd backend
npm test

# Frontend тесты
cd frontend
npm test
```

## Развертывание

```bash
# Продакшн сборка
docker-compose -f docker-compose.prod.yml up -d

# Остановка
docker-compose down
```

## Документация

Подробная документация находится в папке `docs/`:
- [Техническое задание](docs/ТЗ_проекта_BORIS.md)
- [API документация](docs/API.md)
- [Руководство развертывания](docs/deployment.md)

## Лицензия

MIT License

## Поддержка

По вопросам обращайтесь к команде разработки.
