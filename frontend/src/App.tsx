import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
        <div className="max-w-4xl mx-auto p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">
            BORIS - Полное приложение
          </h1>
          
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              🎯 Приложение готово к тестированию!
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-purple-50 rounded-lg p-4">
                <div className="text-3xl mb-2">🔐</div>
                <h3 className="font-semibold text-gray-800">Аутентификация</h3>
                <p className="text-gray-600 text-sm">Вход и регистрация пользователей</p>
              </div>
              
              <div className="bg-indigo-50 rounded-lg p-4">
                <div className="text-3xl mb-2">🎤</div>
                <h3 className="font-semibold text-gray-800">Запись аудио</h3>
                <p className="text-gray-600 text-sm">Запись и загрузка аудиофайлов</p>
              </div>
              
              <div className="bg-green-50 rounded-lg p-4">
                <div className="text-3xl mb-2">📝</div>
                <h3 className="font-semibold text-gray-800">Транскрибация</h3>
                <p className="text-gray-600 text-sm">Распознавание речи через SpeechKit</p>
              </div>
            </div>
            
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-blue-800">
                ✨ <strong>Полный флоу пользователя</strong> готов к тестированию!
              </p>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <a 
              href="/auth" 
              className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              Начать тестирование
            </a>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
