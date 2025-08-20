const express = require('express');
const multer = require('multer');
const { logger } = require('../utils/logger');
const { authenticate } = require('../middleware/validation');

const router = express.Router();

// Настройка multer для загрузки файлов
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE) || 2 * 1024 * 1024 * 1024, // 2GB
  },
  fileFilter: (req, file, cb) => {
    // Проверяем тип файла
    const allowedTypes = ['audio/mpeg', 'audio/wav', 'audio/mp4', 'audio/ogg'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Неподдерживаемый тип файла'), false);
    }
  }
});

// Загрузка аудиофайла
router.post('/upload', authenticate, upload.single('audio'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Файл не загружен' });
    }
    
    const { originalname, size, mimetype, buffer } = req.file;
    const userId = req.user.id;
    
    logger.info('Загрузка аудиофайла:', { 
      filename: originalname, 
      size, 
      userId 
    });
    
    // Здесь будет логика сохранения в Yandex Object Storage
    // Пока что возвращаем заглушку
    
    res.status(200).json({
      message: 'Аудиофайл успешно загружен',
      file: {
        id: 'temp-file-id',
        filename: originalname,
        size,
        mimetype,
        status: 'uploaded'
      }
    });
  } catch (error) {
    logger.error('Ошибка загрузки аудиофайла:', error);
    res.status(500).json({ error: 'Ошибка загрузки файла' });
  }
});

// Запись аудио в реальном времени
router.post('/record', authenticate, async (req, res) => {
  try {
    const { duration, format } = req.body;
    const userId = req.user.id;
    
    logger.info('Запись аудио:', { duration, format, userId });
    
    // Здесь будет логика записи аудио
    // Пока что возвращаем заглушку
    
    res.status(200).json({
      message: 'Запись аудио начата',
      recording: {
        id: 'temp-recording-id',
        status: 'recording',
        duration,
        format
      }
    });
  } catch (error) {
    logger.error('Ошибка записи аудио:', error);
    res.status(500).json({ error: 'Ошибка записи аудио' });
  }
});

// Получение информации об аудиофайле
router.get('/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    
    logger.info('Получение информации об аудиофайле:', { id, userId });
    
    // Здесь будет логика получения из базы данных
    // Пока что возвращаем заглушку
    
    res.json({
      message: 'Информация об аудиофайле',
      audio: {
        id,
        filename: 'test-audio.mp3',
        size: 1024000,
        duration: 60,
        format: 'mp3',
        status: 'uploaded',
        createdAt: new Date().toISOString()
      }
    });
  } catch (error) {
    logger.error('Ошибка получения информации об аудиофайле:', error);
    res.status(500).json({ error: 'Ошибка получения информации' });
  }
});

// Удаление аудиофайла
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    
    logger.info('Удаление аудиофайла:', { id, userId });
    
    // Здесь будет логика удаления из базы данных и хранилища
    // Пока что возвращаем заглушку
    
    res.json({
      message: 'Аудиофайл успешно удален',
      deletedId: id
    });
  } catch (error) {
    logger.error('Ошибка удаления аудиофайла:', error);
    res.status(500).json({ error: 'Ошибка удаления файла' });
  }
});

module.exports = router;
