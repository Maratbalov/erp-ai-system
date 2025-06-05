export interface Database {
  public: {
    Tables: {
      warehouse: {
        Row: {
          id: string;
          name: string;
          address: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          address: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          address?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      product: {
        Row: {
          id: string;
          name: string;
          sku: string;
          category: string;
          price: number;
          description: string | null;
          image_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          sku: string;
          category: string;
          price: number;
          description?: string | null;
          image_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          sku?: string;
          category?: string;
          price?: number;
          description?: string | null;
          image_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      stock: {
        Row: {
          id: string;
          product_id: string;
          warehouse_id: string;
          quantity: number;
          min_quantity: number | null;
          max_quantity: number | null;
        };
        Insert: {
          id?: string;
          product_id: string;
          warehouse_id: string;
          quantity: number;
          min_quantity?: number | null;
          max_quantity?: number | null;
        };
        Update: {
          id?: string;
          product_id?: string;
          warehouse_id?: string;
          quantity?: number;
          min_quantity?: number | null;
          max_quantity?: number | null;
        };
      };
      client: {
        Row: {
          id: string;
          name: string;
          phone: string;
          email: string;
          balance: number;
          address: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          phone: string;
          email: string;
          balance?: number;
          address?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          phone?: string;
          email?: string;
          balance?: number;
          address?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      order: {
        Row: {
          id: string;
          client_id: string;
          created_at: string;
          status: 'draft' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
          total_amount: number | null;
          notes: string | null;
        };
        Insert: {
          id?: string;
          client_id: string;
          created_at?: string;
          status?: 'draft' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
          total_amount?: number | null;
          notes?: string | null;
        };
        Update: {
          id?: string;
          client_id?: string;
          created_at?: string;
          status?: 'draft' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
          total_amount?: number | null;
          notes?: string | null;
        };
      };
      order_item: {
        Row: {
          id: string;
          order_id: string;
          product_id: string;
          quantity: number;
          price: number;
        };
        Insert: {
          id?: string;
          order_id: string;
          product_id: string;
          quantity: number;
          price: number;
        };
        Update: {
          id?: string;
          order_id?: string;
          product_id?: string;
          quantity?: number;
          price?: number;
        };
      };
      transaction: {
        Row: {
          id: string;
          product_id: string;
          warehouse_id: string;
          type: 'income' | 'outcome' | 'transfer' | 'inventory';
          quantity: number;
          date: string;
          comment: string | null;
          order_id: string | null;
        };
        Insert: {
          id?: string;
          product_id: string;
          warehouse_id: string;
          type: 'income' | 'outcome' | 'transfer' | 'inventory';
          quantity: number;
          date?: string;
          comment?: string | null;
          order_id?: string | null;
        };
        Update: {
          id?: string;
          product_id?: string;
          warehouse_id?: string;
          type?: 'income' | 'outcome' | 'transfer' | 'inventory';
          quantity?: number;
          date?: string;
          comment?: string | null;
          order_id?: string | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
} 