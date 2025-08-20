const express = require('express');
const { logger } = require('../utils/logger');
const { authenticate } = require('../middleware/validation');

const router = express.Router();

// Запуск транскрибации
router.post('/:audioId', authenticate, async (req, res) => {
  try {
    const { audioId } = req.params;
    const { language = 'ru' } = req.body;
    const userId = req.user.id;
    
    logger.info('Запуск транскрибации:', { audioId, language, userId });
    
    // Здесь будет логика интеграции с Yandex SpeechKit
    // Пока что возвращаем заглушку
    
    res.status(200).json({
      message: 'Транскрибация запущена',
      transcription: {
        id: 'temp-transcription-id',
        audioFileId: audioId,
        status: 'pending',
        progress: 0,
        language,
        createdAt: new Date().toISOString()
      }
    });
  } catch (error) {
    logger.error('Ошибка запуска транскрибации:', error);
    res.status(500).json({ error: 'Ошибка запуска транскрибации' });
  }
});

// Получение статуса транскрибации
router.get('/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    
    logger.info('Получение статуса транскрибации:', { id, userId });
    
    // Здесь будет логика получения из базы данных
    // Пока что возвращаем заглушку
    
    res.json({
      message: 'Статус транскрибации',
      transcription: {
        id,
        status: 'processing',
        progress: 45,
        language: 'ru',
        createdAt: new Date().toISOString()
      }
    });
  } catch (error) {
    logger.error('Ошибка получения статуса транскрибации:', error);
    res.status(500).json({ error: 'Ошибка получения статуса' });
  }
});

// Получение результата транскрибации
router.get('/:id/result', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    
    logger.info('Получение результата транскрибации:', { id, userId });
    
    // Здесь будет логика получения из базы данных
    // Пока что возвращаем заглушку
    
    res.json({
      message: 'Результат транскрибации',
      transcription: {
        id,
        status: 'completed',
        progress: 100,
        text: 'Это пример текста транскрибации для тестирования API.',
        speakers: [
          { id: 1, name: 'Спикер 1' },
          { id: 2, name: 'Спикер 2' }
        ],
        language: 'ru',
        duration: 120,
        completedAt: new Date().toISOString()
      }
    });
  } catch (error) {
    logger.error('Ошибка получения результата транскрибации:', error);
    res.status(500).json({ error: 'Ошибка получения результата' });
  }
});

module.exports = router;
