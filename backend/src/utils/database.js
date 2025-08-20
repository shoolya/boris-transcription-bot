const { PrismaClient } = require('@prisma/client');
const { logger } = require('./logger');

// Создаем экземпляр Prisma
const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'info', 'warn', 'error'] : ['error']
});

// Логирование запросов в режиме разработки
if (process.env.NODE_ENV === 'development') {
  prisma.$on('query', (e) => {
    logger.info('SQL Query:', { 
      query: e.query, 
      params: e.params, 
      duration: `${e.duration}ms` 
    });
  });
}

// Обработка ошибок Prisma
prisma.$on('error', (e) => {
  logger.error('Prisma Error:', e);
});

// Функция подключения к базе данных
async function connectDatabase() {
  try {
    await prisma.$connect();
    logger.info('✅ Подключение к PostgreSQL установлено');
    
    // Проверяем доступность базы данных
    await prisma.$queryRaw`SELECT 1`;
    logger.info('✅ База данных доступна для запросов');
    
    return prisma;
  } catch (error) {
    logger.error('❌ Ошибка подключения к базе данных:', error);
    throw error;
  }
}

// Функция отключения от базы данных
async function disconnectDatabase() {
  try {
    await prisma.$disconnect();
    logger.info('✅ Отключение от PostgreSQL выполнено');
  } catch (error) {
    logger.error('❌ Ошибка отключения от базы данных:', error);
  }
}

// Обработка завершения процесса
process.on('beforeExit', async () => {
  await disconnectDatabase();
});

module.exports = { 
  prisma, 
  connectDatabase, 
  disconnectDatabase 
};
