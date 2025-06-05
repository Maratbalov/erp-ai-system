-- ERP AI System Database Schema
-- Выполните этот скрипт в Supabase SQL Editor

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
  min_quantity INTEGER DEFAULT 5,
  max_quantity INTEGER DEFAULT 100,
  UNIQUE(product_id, warehouse_id)
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

-- Функции для автоматического обновления timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Триггеры для автоматического обновления updated_at
CREATE TRIGGER update_warehouse_updated_at BEFORE UPDATE ON warehouse
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_product_updated_at BEFORE UPDATE ON product
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_client_updated_at BEFORE UPDATE ON client
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Индексы для производительности
CREATE INDEX idx_product_sku ON product(sku);
CREATE INDEX idx_product_category ON product(category);
CREATE INDEX idx_stock_product_id ON stock(product_id);
CREATE INDEX idx_stock_warehouse_id ON stock(warehouse_id);
CREATE INDEX idx_order_client_id ON "order"(client_id);
CREATE INDEX idx_order_created_at ON "order"(created_at);
CREATE INDEX idx_order_status ON "order"(status);
CREATE INDEX idx_order_item_order_id ON order_item(order_id);
CREATE INDEX idx_order_item_product_id ON order_item(product_id);
CREATE INDEX idx_transaction_product_id ON transaction(product_id);
CREATE INDEX idx_transaction_warehouse_id ON transaction(warehouse_id);
CREATE INDEX idx_transaction_date ON transaction(date);
CREATE INDEX idx_transaction_type ON transaction(type);

-- Создание тестовых данных
INSERT INTO warehouse (name, address) VALUES
('Главный склад', 'г. Москва, ул. Складская, 1'),
('Филиал СПб', 'г. Санкт-Петербург, пр. Невский, 100'),
('Розничный склад', 'г. Москва, ул. Торговая, 5');

INSERT INTO product (name, sku, category, price, description) VALUES
('iPhone 15 Pro', 'IP15P-256-BLK', 'Смартфоны', 89990.00, 'Apple iPhone 15 Pro 256GB Black'),
('Samsung Galaxy S24', 'SGS24-128-WHT', 'Смартфоны', 74990.00, 'Samsung Galaxy S24 128GB White'),
('MacBook Air M3', 'MBA-M3-512-SLV', 'Ноутбуки', 149990.00, 'MacBook Air 13" M3 512GB Silver'),
('iPad Pro 12.9', 'IPP-129-256-GRY', 'Планшеты', 109990.00, 'iPad Pro 12.9" 256GB Space Gray'),
('AirPods Pro 2', 'APP2-WHT', 'Аудио', 24990.00, 'Apple AirPods Pro 2nd Generation'),
('Apple Watch Ultra 2', 'AWU2-49-TIT', 'Часы', 89990.00, 'Apple Watch Ultra 2 49mm Titanium'),
('Dell XPS 13', 'DXPS13-512-BLK', 'Ноутбуки', 119990.00, 'Dell XPS 13 i7 512GB Black'),
('Sony WH-1000XM5', 'SWH1000XM5-BLK', 'Аудио', 29990.00, 'Sony WH-1000XM5 Wireless Headphones');

INSERT INTO client (name, phone, email, address) VALUES
('ООО "Техносвязь"', '+7 495 123-45-67', 'info@technosvyaz.ru', 'г. Москва, ул. Деловая, 10'),
('ИП Иванов Алексей Александрович', '+7 921 234-56-78', 'ivanov@mail.ru', 'г. СПб, пр. Мира, 25'),
('ООО "Дигитал Солюшенс"', '+7 495 987-65-43', 'sales@digital-sol.com', 'г. Москва, ул. IT-парк, 1'),
('Петрова Мария Сергеевна', '+7 916 345-67-89', 'petrova.ms@gmail.com', 'г. Москва, ул. Ленина, 50'),
('ООО "Мобильные технологии"', '+7 812 456-78-90', 'orders@mobile-tech.spb.ru', 'г. СПб, наб. Фонтанки, 15');

-- Создание остатков на складах
INSERT INTO stock (product_id, warehouse_id, quantity, min_quantity, max_quantity)
SELECT 
  p.id, 
  w.id, 
  FLOOR(RANDOM() * 50 + 5)::INTEGER as quantity,
  5 as min_quantity,
  100 as max_quantity
FROM product p CROSS JOIN warehouse w;

-- Обновляем некоторые остатки для демонстрации низких остатков
UPDATE stock SET quantity = 3 WHERE product_id = (SELECT id FROM product WHERE sku = 'IP15P-256-BLK') AND warehouse_id = (SELECT id FROM warehouse WHERE name = 'Главный склад');
UPDATE stock SET quantity = 1 WHERE product_id = (SELECT id FROM product WHERE sku = 'SGS24-128-WHT') AND warehouse_id = (SELECT id FROM warehouse WHERE name = 'Главный склад');
UPDATE stock SET quantity = 2 WHERE product_id = (SELECT id FROM product WHERE sku = 'MBA-M3-512-SLV') AND warehouse_id = (SELECT id FROM warehouse WHERE name = 'Главный склад');

-- Создание демо-пользователя (для тестирования auth)
-- Этот пользователь будет создан через Supabase Auth UI
-- Email: demo@erp-ai.com
-- Password: demo123

COMMENT ON TABLE warehouse IS 'Склады компании';
COMMENT ON TABLE product IS 'Каталог товаров';
COMMENT ON TABLE stock IS 'Остатки товаров на складах';
COMMENT ON TABLE client IS 'База клиентов';
COMMENT ON TABLE "order" IS 'Заказы клиентов';
COMMENT ON TABLE order_item IS 'Позиции заказов';
COMMENT ON TABLE transaction IS 'Движения товаров'; 