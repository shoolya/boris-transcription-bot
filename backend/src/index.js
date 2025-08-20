const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;
const HOST = '0.0.0.0';

// Middleware безопасности
app.use(helmet());

// CORS настройки
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://10.129.0.31:3000',
  credentials: true
}));

// Парсинг JSON
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    service: 'BORIS Backend API',
    version: '1.0.0'
  });
});

// Тестовый API endpoint
app.get('/api/test', (req, res) => {
  res.status(200).json({
    message: 'BORIS Backend API работает!',
    timestamp: new Date().toISOString(),
    endpoints: [
      '/health',
      '/api/test',
      '/api/auth/* (в разработке)',
      '/api/audio/* (в разработке)',
      '/api/transcribe/* (в разработке)',
      '/api/summary/* (в разработке)',
      '/api/export/* (в разработке)',
      '/api/history/* (в разработке)'
    ]
  });
});

// Заглушки для API endpoints (в разработке)
app.get('/api/auth/test', (req, res) => {
  res.json({ message: 'Auth API в разработке' });
});

app.get('/api/audio/test', (req, res) => {
  res.json({ message: 'Audio API в разработке' });
});

app.get('/api/transcribe/test', (req, res) => {
  res.json({ message: 'Transcribe API в разработке' });
});

app.get('/api/summary/test', (req, res) => {
  res.json({ message: 'Summary API в разработке' });
});

app.get('/api/export/test', (req, res) => {
  res.json({ message: 'Export API в разработке' });
});

app.get('/api/history/test', (req, res) => {
  res.json({ message: 'History API в разработке' });
});

// Обработка 404
app.use('*', (req, res) => {
  res.status(404).json({ 
    error: 'Маршрут не найден',
    path: req.originalUrl
  });
});

// Глобальная обработка ошибок
app.use((error, req, res, next) => {
  console.error('Глобальная ошибка:', error);
  
  res.status(error.status || 500).json({
    error: process.env.NODE_ENV === 'production' 
      ? 'Внутренняя ошибка сервера' 
      : error.message
  });
});

// Запуск сервера
app.listen(PORT, HOST, () => {
  console.log(`🚀 BORIS Backend API запущен на ${HOST}:${PORT}`);
  console.log(`📊 Режим: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 Health check: http://10.129.0.31:${PORT}/health`);
  console.log(`🧪 Тестовый endpoint: http://10.129.0.31:${PORT}/api/test`);
  console.log(`🌐 Доступен по адресу: http://10.129.0.31:${PORT}`);
  console.log(`⚠️  Полные API endpoints в разработке`);
});
