import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/database';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Auth helpers
export const auth = {
  signUp: (email: string, password: string) =>
    supabase.auth.signUp({ email, password }),
  
  signIn: (email: string, password: string) =>
    supabase.auth.signInWithPassword({ email, password }),
  
  signOut: () => supabase.auth.signOut(),
  
  getUser: () => supabase.auth.getUser(),
  
  onAuthStateChange: (callback: (event: any, session: any) => void) =>
    supabase.auth.onAuthStateChange(callback),
};

// Generic CRUD operations
export class SupabaseService<T> {
  constructor(private tableName: string) {}

  async getAll(options?: {
    select?: string;
    filters?: Record<string, any>;
    orderBy?: { column: string; ascending?: boolean };
    limit?: number;
    offset?: number;
  }) {
    let query = supabase.from(this.tableName).select(options?.select || '*');

    if (options?.filters) {
      Object.entries(options.filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          query = query.eq(key, value);
        }
      });
    }

    if (options?.orderBy) {
      query = query.order(options.orderBy.column, {
        ascending: options.orderBy.ascending !== false,
      });
    }

    if (options?.limit) {
      query = query.limit(options.limit);
    }

    if (options?.offset) {
      query = query.range(options.offset, options.offset + (options.limit || 10) - 1);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data as T[];
  }

  async getById(id: string, select?: string) {
    const { data, error } = await supabase
      .from(this.tableName)
      .select(select || '*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data as T;
  }

  async create(data: Omit<T, 'id' | 'created_at' | 'updated_at'>) {
    const { data: result, error } = await supabase
      .from(this.tableName)
      .insert(data)
      .select()
      .single();
    
    if (error) throw error;
    return result as T;
  }

  async update(id: string, data: Partial<T>) {
    const { data: result, error } = await supabase
      .from(this.tableName)
      .update(data)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return result as T;
  }

  async delete(id: string) {
    const { error } = await supabase
      .from(this.tableName)
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }

  async count(filters?: Record<string, any>) {
    let query = supabase.from(this.tableName).select('*', { count: 'exact', head: true });

    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          query = query.eq(key, value);
        }
      });
    }

    const { count, error } = await query;
    if (error) throw error;
    return count || 0;
  }

  async search(searchTerm: string, searchColumns: string[]) {
    let query = supabase.from(this.tableName).select('*');

    searchColumns.forEach((column, index) => {
      if (index === 0) {
        query = query.ilike(column, `%${searchTerm}%`);
      } else {
        query = query.or(`${column}.ilike.%${searchTerm}%`);
      }
    });

    const { data, error } = await query;
    if (error) throw error;
    return data as T[];
  }
}

// Analytics helpers
export const analytics = {
  async getDashboardMetrics() {
    // Get sales metrics
    const { data: salesData } = await supabase
      .from('order')
      .select(`
        id,
        created_at,
        status,
        order_item(quantity, price)
      `)
      .gte('created_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString());

    // Get low stock items
    const { data: lowStockData } = await supabase
      .from('stock')
      .select(`
        *,
        product(name, sku)
      `)
      .lt('quantity', 10);

    // Get clients with outstanding balance
    const { data: debtorsData } = await supabase
      .from('client')
      .select('*')
      .gt('balance', 0);

    return {
      sales: salesData || [],
      lowStock: lowStockData || [],
      debtors: debtorsData || [],
    };
  },

  async getSalesChart(days = 30) {
    const { data, error } = await supabase
      .from('order')
      .select(`
        created_at,
        order_item(quantity, price)
      `)
      .gte('created_at', new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString())
      .eq('status', 'confirmed');

    if (error) throw error;
    return data || [];
  },

  async getTopProducts(limit = 10) {
    const { data, error } = await supabase
      .from('order_item')
      .select(`
        product_id,
        quantity,
        price,
        product(name, sku)
      `)
      .limit(limit);

    if (error) throw error;
    return data || [];
  },
}; 