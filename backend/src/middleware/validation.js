const Joi = require('joi');
const { logger } = require('../utils/logger');

// Схема валидации регистрации
const registrationSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Некорректный email адрес',
    'any.required': 'Email обязателен'
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': 'Пароль должен содержать минимум 6 символов',
    'any.required': 'Пароль обязателен'
  }),
  name: Joi.string().min(2).max(100).optional().messages({
    'string.min': 'Имя должно содержать минимум 2 символа',
    'string.max': 'Имя не должно превышать 100 символов'
  })
});

// Схема валидации входа
const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Некорректный email адрес',
    'any.required': 'Email обязателен'
  }),
  password: Joi.string().required().messages({
    'any.required': 'Пароль обязателен'
  })
});

// Middleware валидации регистрации
const validateRegistration = (req, res, next) => {
  try {
    const { error, value } = registrationSchema.validate(req.body);
    
    if (error) {
      logger.warn('Ошибка валидации регистрации:', error.details[0].message);
      return res.status(400).json({
        error: 'Ошибка валидации',
        details: error.details[0].message
      });
    }
    
    req.validatedData = value;
    next();
  } catch (error) {
    logger.error('Ошибка валидации:', error);
    res.status(500).json({ error: 'Внутренняя ошибка сервера' });
  }
};

// Middleware валидации входа
const validateLogin = (req, res, next) => {
  try {
    const { error, value } = loginSchema.validate(req.body);
    
    if (error) {
      logger.warn('Ошибка валидации входа:', error.details[0].message);
      return res.status(400).json({
        error: 'Ошибка валидации',
        details: error.details[0].message
      });
    }
    
    req.validatedData = value;
    next();
  } catch (error) {
    logger.error('Ошибка валидации:', error);
    res.status(500).json({ error: 'Внутренняя ошибка сервера' });
  }
};

// Middleware валидации JWT токена
const validateToken = (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ error: 'Токен не предоставлен' });
    }
    
    // Здесь будет проверка JWT токена
    req.token = token;
    next();
  } catch (error) {
    logger.error('Ошибка валидации токена:', error);
    res.status(401).json({ error: 'Недействительный токен' });
  }
};

// Middleware аутентификации
const authenticate = async (req, res, next) => {
  try {
    await validateToken(req, res, () => {});
    
    // Здесь будет проверка пользователя в базе данных
    // Пока что просто пропускаем
    req.user = { id: 'temp-user-id' };
    next();
  } catch (error) {
    logger.error('Ошибка аутентификации:', error);
    res.status(401).json({ error: 'Ошибка аутентификации' });
  }
};

module.exports = { 
  validateRegistration, 
  validateLogin, 
  validateToken, 
  authenticate 
};
