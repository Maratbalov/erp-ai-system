# 🚀 Инструкции по деплою ERP AI System

## Подготовка к деплою

### 1. Настройка Supabase

1. Создайте аккаунт на [Supabase](https://supabase.com)
2. Создайте новый проект
3. В разделе **SQL Editor** выполните скрипт из файла `database.sql`
4. В разделе **Settings → API** скопируйте:
   - Project URL
   - anon public key

### 2. Настройка OpenAI (опционально)

1. Создайте аккаунт на [OpenAI](https://platform.openai.com)
2. Создайте API ключ в разделе API Keys
3. Убедитесь что у вас есть кредиты на аккаунте

### 3. Подготовка кода

1. Убедитесь что проект собирается локально:
   ```bash
   npm run build
   ```

2. Проверьте что все зависимости установлены:
   ```bash
   npm install
   ```

## Деплой на Netlify

### Вариант 1: Через Git (рекомендуется)

1. **Загрузите код в Git репозиторий**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/username/erp-ai.git
   git push -u origin main
   ```

2. **Подключите репозиторий к Netlify**
   - Войдите в [Netlify](https://netlify.com)
   - Нажмите "New site from Git"
   - Выберите GitHub/GitLab/Bitbucket
   - Выберите ваш репозиторий `erp-ai`

3. **Настройте билд**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: `18`

4. **Добавьте переменные окружения**
   В разделе Site settings → Environment variables добавьте:
   ```
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   VITE_OPENAI_API_KEY=sk-your-openai-api-key-here
   ```

5. **Деплой**
   - Нажмите "Deploy site"
   - Дождитесь завершения деплоя (2-3 минуты)

### Вариант 2: Ручная загрузка

1. **Соберите проект**
   ```bash
   npm run build
   ```

2. **Загрузите файлы**
   - Войдите в Netlify
   - Перетащите папку `dist` в раздел "Manual deploys"

## Настройка после деплоя

### 1. Настройка домена

1. В разделе **Domain management** можете:
   - Использовать предоставленный .netlify.app домен
   - Подключить свой домен

### 2. Настройка HTTPS

- HTTPS включается автоматически
- Сертификат Let's Encrypt выдается автоматически

### 3. Настройка функций (опционально)

Если добавите серверные функции в будущем:

1. Создайте папку `netlify/functions`
2. Добавьте функции в TypeScript/JavaScript
3. Netlify автоматически их задеплоит

## Проверка работоспособности

После деплоя проверьте:

1. **✅ Сайт открывается** - перейдите по URL
2. **✅ Аутентификация работает** - попробуйте войти с демо данными:
   - Email: `demo@erp-ai.com`
   - Password: `demo123`
3. **✅ База данных подключена** - проверьте загрузку дашборда
4. **✅ ИИ-чат работает** - нажмите кнопку чата (если настроили OpenAI)

## Мониторинг и аналитика

### Netlify Analytics

В разделе **Analytics** можете отслеживать:
- Посещения сайта
- Производительность загрузки
- Географию пользователей

### Supabase Analytics

В Supabase Dashboard можете мониторить:
- Количество запросов к API
- Использование базы данных
- Аутентификацию пользователей

## Обновления

### Автоматические обновления

При использовании Git деплоя:
- Каждый push в main ветку запускает новый деплой
- Можете настроить deploy previews для PR

### Ручные обновления

1. Соберите новую версию локально
2. Загрузите новую папку `dist` в Netlify

## Решение проблем

### Проблема: Сайт не открывается

1. Проверьте статус деплоя в Netlify
2. Посмотрите логи билда на наличие ошибок
3. Убедитесь что переменные окружения настроены

### Проблема: Ошибка подключения к базе

1. Проверьте правильность VITE_SUPABASE_URL и VITE_SUPABASE_ANON_KEY
2. Убедитесь что выполнили SQL скрипт в Supabase
3. Проверьте Row Level Security настройки в Supabase

### Проблема: ИИ-чат не работает

1. Проверьте правильность VITE_OPENAI_API_KEY
2. Убедитесь что у вас есть кредиты на OpenAI аккаунте
3. Проверьте лимиты API в OpenAI Dashboard

## Безопасность

### Environment Variables

- Никогда не коммитьте .env файлы в Git
- Используйте только VITE_ префикс для клиентских переменных
- Серверные ключи храните в Netlify Environment Variables

### Supabase Security

1. Включите Row Level Security (RLS) для всех таблиц
2. Создайте правила доступа для аутентифицированных пользователей
3. Регулярно проверяйте логи доступа

## Масштабирование

### При росте нагрузки:

1. **Supabase**: обновите план при необходимости
2. **Netlify**: используйте CDN для статических файлов
3. **OpenAI**: мониторьте использование API

### Оптимизация производительности:

1. Используйте lazy loading для больших компонентов
2. Оптимизируйте изображения
3. Настройте кеширование для API запросов

---

**💡 Совет**: Сохраните ссылки на все сервисы и учетные данные в безопасном месте для удобства управления. 