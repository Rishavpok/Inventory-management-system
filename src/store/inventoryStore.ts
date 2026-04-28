import { create } from 'zustand';
import type { Product, StockHistory, Sale } from '../types';
import { dummyProducts } from '../data/products';
import { dummyStockHistory } from '../data/stockHistory';
import { dummySales } from '../data/sales';

interface InventoryStore {
  products: Product[];
  stockHistory: StockHistory[];
  sales: Sale[];

  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  updateStock: (productId: string, type: "increase" | "decrease", qty: number, note: string) => void;
  recordSale: (sale: Sale) => void;
}

export const useInventoryStore = create<InventoryStore>((set, get) => ({
  products: dummyProducts,
  stockHistory: dummyStockHistory,
  sales: dummySales,

  addProduct: (product) => set((state) => ({ products: [...state.products, product] })),
  
  updateProduct: (product) => set((state) => ({
    products: state.products.map(p => p.id === product.id ? product : p)
  })),
  
  deleteProduct: (id) => set((state) => ({
    products: state.products.filter(p => p.id !== id)
  })),
  
  updateStock: (productId, type, qty, note) => {
    const state = get();
    const product = state.products.find(p => p.id === productId);
    if (!product) return;

    const newStock = type === 'increase' ? product.stock + qty : product.stock - qty;
    
    // Create new stock history entry
    const historyEntry: StockHistory = {
      id: Date.now().toString(),
      productId,
      productName: product.name,
      type,
      quantity: qty,
      note,
      date: new Date().toISOString()
    };

    set((state) => ({
      products: state.products.map(p => p.id === productId ? { ...p, stock: newStock } : p),
      stockHistory: [historyEntry, ...state.stockHistory]
    }));
  },
  
  recordSale: (sale) => {
    const state = get();
    const product = state.products.find(p => p.id === sale.productId);
    if (!product) return;

    const newStock = product.stock - sale.quantity;

    // Create a stock history entry for the sale
    const historyEntry: StockHistory = {
      id: Date.now().toString() + "_sale",
      productId: sale.productId,
      productName: sale.productName,
      type: 'decrease',
      quantity: sale.quantity,
      note: 'Sale',
      date: sale.date
    };

    set((state) => ({
      products: state.products.map(p => p.id === sale.productId ? { ...p, stock: newStock } : p),
      stockHistory: [historyEntry, ...state.stockHistory],
      sales: [sale, ...state.sales]
    }));
  }
}));
