// Database types
export interface Warehouse {
  id: string;
  name: string;
  address: string;
  created_at?: string;
  updated_at?: string;
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  description?: string;
  image_url?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Stock {
  id: string;
  product_id: string;
  warehouse_id: string;
  quantity: number;
  min_quantity?: number;
  max_quantity?: number;
  product?: Product;
  warehouse?: Warehouse;
}

export interface Client {
  id: string;
  name: string;
  phone: string;
  email: string;
  balance: number;
  address?: string;
  created_at?: string;
  updated_at?: string;
}

export type OrderStatus = 'draft' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';

export interface Order {
  id: string;
  client_id: string;
  created_at: string;
  status: OrderStatus;
  total_amount?: number;
  notes?: string;
  client?: Client;
  items?: OrderItem[];
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  price: number;
  product?: Product;
}

export type TransactionType = 'income' | 'outcome' | 'transfer' | 'inventory';

export interface Transaction {
  id: string;
  product_id: string;
  warehouse_id: string;
  type: TransactionType;
  quantity: number;
  date: string;
  comment?: string;
  order_id?: string;
  product?: Product;
  warehouse?: Warehouse;
}

// UI types
export interface MenuItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  current?: boolean;
  badge?: number;
}

export interface DashboardMetric {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'increase' | 'decrease';
  icon: React.ComponentType<{ className?: string }>;
}

// AI types
export interface AIMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  metadata?: {
    action?: string;
    data?: any;
    chart?: {
      type: string;
      data: any;
    };
    table?: {
      headers: string[];
      rows: any[][];
    };
  };
}

export interface AICommand {
  action: 'query' | 'create' | 'update' | 'delete' | 'report' | 'analysis';
  entity?: 'product' | 'order' | 'client' | 'warehouse' | 'stock' | 'transaction';
  sql?: string;
  data?: any;
  response: string;
}

// Form types
export interface ProductFormData {
  name: string;
  sku: string;
  category: string;
  price: number;
  description?: string;
}

export interface OrderFormData {
  client_id: string;
  items: {
    product_id: string;
    quantity: number;
    price: number;
  }[];
  notes?: string;
}

export interface ClientFormData {
  name: string;
  phone: string;
  email: string;
  address?: string;
  balance?: number;
}

// Filter and pagination types
export interface FilterOptions {
  search?: string;
  category?: string;
  status?: string;
  dateFrom?: string;
  dateTo?: string;
  warehouse_id?: string;
}

export interface PaginationData {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface TableColumn<T = any> {
  key: keyof T | string;
  label: string;
  sortable?: boolean;
  render?: (value: any, row: T) => React.ReactNode;
  className?: string;
}

// Auth types
export interface User {
  id: string;
  email: string;
  name?: string;
  avatar_url?: string;
  role?: 'admin' | 'user' | 'viewer';
  created_at?: string;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

// Chart types
export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string | string[];
    borderWidth?: number;
  }[];
}

// Report types
export interface SalesReport {
  period: string;
  total_sales: number;
  total_orders: number;
  avg_order_value: number;
  top_products: {
    name: string;
    quantity: number;
    revenue: number;
  }[];
}

export interface StockReport {
  low_stock_items: {
    product: Product;
    current_stock: number;
    min_quantity: number;
  }[];
  out_of_stock_items: Product[];
  overstocked_items: {
    product: Product;
    current_stock: number;
    max_quantity: number;
  }[];
} 