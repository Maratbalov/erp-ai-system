# ERP AI System

Современная ERP система с интегрированным ИИ-помощником, построенная на React + TypeScript + Supabase + Claude AI.

## 🚀 Возможности

- **Управление товарами** - добавление, редактирование, поиск товаров
- **Заказы и клиенты** - ведение заказов и базы клиентов
- **Складские операции** - контроль остатков и движения товаров
- **ИИ-помощник** - голосовые команды и анализ данных с помощью Claude
- **Отчеты и аналитика** - графики продаж и ключевые метрики
- **Темная тема** - поддержка светлой/темной темы
- **Адаптивный дизайн** - оптимизировано для всех устройств

## 🛠 Технологический стек

- **Frontend**: React 18, TypeScript, Vite
- **Стилизация**: Tailwind CSS, Headless UI
- **База данных**: Supabase (PostgreSQL)
- **ИИ**: Claude/OpenAI API
- **Графики**: Recharts
- **Роутинг**: React Router
- **Формы**: React Hook Form
- **Иконки**: Heroicons

## 📦 Установка

1. **Клонируйте репозиторий**
   ```bash
   git clone <repository-url>
   cd erp-ai
   ```

2. **Установите зависимости**
   ```bash
   npm install
   ```

3. **Настройте переменные окружения**
   
   Создайте файл `.env` в корне проекта:
   ```env
   VITE_SUPABASE_URL=your_supabase_url_here
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
   VITE_OPENAI_API_KEY=your_openai_api_key_here
   ```

4. **Настройте базу данных Supabase**
   
   Выполните SQL скрипт для создания таблиц:
   ```sql
   -- Создание таблиц
   CREATE TABLE warehouse (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     name TEXT NOT NULL,
     address TEXT NOT NULL,
     created_at TIMESTAMP DEFAULT NOW(),
     updated_at TIMESTAMP DEFAULT NOW()
   );

   CREATE TABLE product (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     name TEXT NOT NULL,
     sku TEXT UNIQUE NOT NULL,
     category TEXT NOT NULL,
     price DECIMAL(10,2) NOT NULL,
     description TEXT,
     image_url TEXT,
     created_at TIMESTAMP DEFAULT NOW(),
     updated_at TIMESTAMP DEFAULT NOW()
   );

   CREATE TABLE stock (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     product_id UUID REFERENCES product(id) ON DELETE CASCADE,
     warehouse_id UUID REFERENCES warehouse(id) ON DELETE CASCADE,
     quantity INTEGER NOT NULL DEFAULT 0,
     min_quantity INTEGER,
     max_quantity INTEGER
   );

   CREATE TABLE client (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     name TEXT NOT NULL,
     phone TEXT NOT NULL,
     email TEXT UNIQUE NOT NULL,
     balance DECIMAL(10,2) DEFAULT 0,
     address TEXT,
     created_at TIMESTAMP DEFAULT NOW(),
     updated_at TIMESTAMP DEFAULT NOW()
   );

   CREATE TABLE "order" (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     client_id UUID REFERENCES client(id) ON DELETE CASCADE,
     created_at TIMESTAMP DEFAULT NOW(),
     status TEXT CHECK (status IN ('draft', 'confirmed', 'shipped', 'delivered', 'cancelled')) DEFAULT 'draft',
     total_amount DECIMAL(10,2),
     notes TEXT
   );

   CREATE TABLE order_item (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     order_id UUID REFERENCES "order"(id) ON DELETE CASCADE,
     product_id UUID REFERENCES product(id) ON DELETE CASCADE,
     quantity INTEGER NOT NULL,
     price DECIMAL(10,2) NOT NULL
   );

   CREATE TABLE transaction (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     product_id UUID REFERENCES product(id) ON DELETE CASCADE,
     warehouse_id UUID REFERENCES warehouse(id) ON DELETE CASCADE,
     type TEXT CHECK (type IN ('income', 'outcome', 'transfer', 'inventory')) NOT NULL,
     quantity INTEGER NOT NULL,
     date TIMESTAMP DEFAULT NOW(),
     comment TEXT,
     order_id UUID REFERENCES "order"(id)
   );
   ```

5. **Запустите проект**
   ```bash
   npm run dev
   ```

## 🤖 Настройка ИИ-помощника

Для работы ИИ-помощника необходимо:

1. Получить API ключ от OpenAI или настроить Claude API
2. Добавить ключ в переменные окружения
3. ИИ поддерживает команды:
   - "Показать товары с остатком меньше 10"
   - "Создать заказ для клиента Иванов"
   - "Отчет по продажам за месяц"
   - "Добавить товар iPhone 15, цена 80000"

## 🔑 Демо доступ

Для быстрого тестирования используйте:
- **Email**: demo@erp-ai.com
- **Пароль**: demo123

## 🚀 Деплой на Netlify

1. **Подключите репозиторий к Netlify**
2. **Настройте переменные окружения** в Netlify:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_OPENAI_API_KEY`
3. **Деплой произойдет автоматически**

Конфигурация Netlify уже настроена в файле `netlify.toml`.

## 📱 Использование

### Дашборд
- Ключевые метрики продаж
- График продаж за период
- Уведомления о низких остатках
- Последние заказы

### ИИ-помощник
- Кнопка чата в правом верхнем углу
- Голосовое управление (кнопка микрофона)
- Быстрые команды для частых операций
- Анализ данных и генерация отчетов

### Навигация
- **Товары** - управление каталогом
- **Заказы** - ведение заказов
- **Клиенты** - база клиентов
- **Склады** - операции со складами
- **Отчеты** - аналитика и отчеты

## 🔧 Разработка

### Структура проекта
```
src/
├── components/
│   ├── ui/           # Базовые UI компоненты
│   ├── layout/       # Header, Sidebar, Layout
│   ├── forms/        # Формы создания/редактирования
│   ├── tables/       # Таблицы с данными
│   └── ai/           # ИИ чат и компоненты
├── pages/            # Страницы приложения
├── hooks/            # Custom hooks для API
├── services/         # API сервисы
├── types/            # TypeScript типы
├── contexts/         # React контексты
└── utils/            # Утилиты
```

### Команды разработки
```bash
npm run dev      # Запуск в режиме разработки
npm run build    # Сборка для продакшена
npm run preview  # Предварительный просмотр сборки
npm run lint     # Проверка линтером
```

## 🤝 Участие в разработке

1. Форкните репозиторий
2. Создайте ветку для новой функции
3. Внесите изменения
4. Создайте Pull Request

## 📄 Лицензия

MIT License

## 🆘 Поддержка

При возникновении вопросов:
1. Проверьте документацию
2. Создайте Issue в репозитории
3. Свяжитесь с командой разработки

---

**Разработано с ❤️ для современного бизнеса**
