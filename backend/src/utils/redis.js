const Redis = require('redis');
const { logger } = require('./logger');

let redisClient = null;

// Функция подключения к Redis
async function connectRedis() {
  try {
    const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';
    
    redisClient = Redis.createClient({
      url: redisUrl,
      retry_strategy: (options) => {
        if (options.error && options.error.code === 'ECONNREFUSED') {
          logger.error('❌ Redis сервер отказал в подключении');
          return new Error('Redis сервер недоступен');
        }
        if (options.total_retry_time > 1000 * 60 * 60) {
          logger.error('❌ Превышено время ожидания подключения к Redis');
          return new Error('Превышено время ожидания');
        }
        if (options.attempt > 10) {
          logger.error('❌ Превышено количество попыток подключения к Redis');
          return undefined;
        }
        return Math.min(options.attempt * 100, 3000);
      }
    });

    // Обработчики событий Redis
    redisClient.on('connect', () => {
      logger.info('✅ Подключение к Redis установлено');
    });

    redisClient.on('ready', () => {
      logger.info('✅ Redis готов к работе');
    });

    redisClient.on('error', (error) => {
      logger.error('❌ Redis ошибка:', error);
    });

    redisClient.on('end', () => {
      logger.warn('⚠️ Соединение с Redis закрыто');
    });

    redisClient.on('reconnecting', () => {
      logger.info('🔄 Переподключение к Redis...');
    });

    // Подключаемся к Redis
    await redisClient.connect();
    
    // Проверяем подключение
    await redisClient.ping();
    logger.info('✅ Redis ping успешен');
    
    return redisClient;
  } catch (error) {
    logger.error('❌ Ошибка подключения к Redis:', error);
    throw error;
  }
}

// Функция отключения от Redis
async function disconnectRedis() {
  try {
    if (redisClient) {
      await redisClient.quit();
      logger.info('✅ Отключение от Redis выполнено');
    }
  } catch (error) {
    logger.error('❌ Ошибка отключения от Redis:', error);
  }
}

// Функция получения клиента Redis
function getRedisClient() {
  if (!redisClient) {
    throw new Error('Redis клиент не инициализирован');
  }
  return redisClient;
}

// Обработка завершения процесса
process.on('beforeExit', async () => {
  await disconnectRedis();
});

module.exports = { 
  connectRedis, 
  disconnectRedis, 
  getRedisClient 
};
