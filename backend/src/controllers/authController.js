const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { prisma } = require('../utils/database');
const { logger } = require('../utils/logger');
const { validateRegistration, validateLogin } = require('../middleware/validation');

const router = express.Router();

// Регистрация пользователя
router.post('/register', validateRegistration, async (req, res) => {
  try {
    const { email, password, name } = req.validatedData;
    
    // Проверяем, существует ли пользователь
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });
    
    if (existingUser) {
      return res.status(409).json({ error: 'Пользователь с таким email уже существует' });
    }
    
    // Хешируем пароль
    const hashedPassword = await bcrypt.hash(password, 12);
    
    // Создаем пользователя
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name
      },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true
      }
    });
    
    logger.info('Пользователь зарегистрирован:', user.email);
    
    res.status(201).json({
      message: 'Пользователь успешно зарегистрирован',
      user
    });
  } catch (error) {
    logger.error('Ошибка регистрации:', error);
    res.status(500).json({ error: 'Ошибка регистрации пользователя' });
  }
});

// Вход пользователя
router.post('/login', validateLogin, async (req, res) => {
  try {
    const { email, password } = req.validatedData;
    
    // Ищем пользователя
    const user = await prisma.user.findUnique({
      where: { email }
    });
    
    if (!user) {
      return res.status(401).json({ error: 'Неверный email или пароль' });
    }
    
    // Проверяем пароль
    const isValidPassword = await bcrypt.compare(password, user.password);
    
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Неверный email или пароль' });
    }
    
    // Генерируем JWT токен
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    logger.info('Пользователь вошел в систему:', user.email);
    
    res.json({
      message: 'Вход выполнен успешно',
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      }
    });
  } catch (error) {
    logger.error('Ошибка входа:', error);
    res.status(500).json({ error: 'Ошибка входа в систему' });
  }
});

// Обновление токена
router.post('/refresh', async (req, res) => {
  try {
    const { token } = req.body;
    
    if (!token) {
      return res.status(400).json({ error: 'Токен не предоставлен' });
    }
    
    // Проверяем токен
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Генерируем новый токен
    const newToken = jwt.sign(
      { userId: decoded.userId, email: decoded.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    res.json({
      message: 'Токен обновлен',
      token: newToken
    });
  } catch (error) {
    logger.error('Ошибка обновления токена:', error);
    res.status(401).json({ error: 'Недействительный токен' });
  }
});

// Получение профиля пользователя
router.get('/profile', async (req, res) => {
  try {
    // Здесь будет проверка токена и получение пользователя
    // Пока что возвращаем заглушку
    res.json({
      message: 'Профиль пользователя',
      user: {
        id: 'temp-user-id',
        email: 'user@example.com',
        name: 'Тестовый пользователь'
      }
    });
  } catch (error) {
    logger.error('Ошибка получения профиля:', error);
    res.status(500).json({ error: 'Ошибка получения профиля' });
  }
});

module.exports = router;
