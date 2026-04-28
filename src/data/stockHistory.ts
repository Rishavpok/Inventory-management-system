import type { StockHistory } from '../types';

export const dummyStockHistory: StockHistory[] = [
  { id: 'sh1', productId: '1', productName: 'iPhone 15 Pro', type: 'increase', quantity: 50, note: 'Initial stock', date: new Date(Date.now() - 86400000 * 10).toISOString() },
  { id: 'sh2', productId: '2', productName: 'Samsung Galaxy S24 Ultra', type: 'increase', quantity: 10, note: 'Initial shipment', date: new Date(Date.now() - 86400000 * 9).toISOString() },
  { id: 'sh3', productId: '10', productName: 'PlayStation 5', type: 'increase', quantity: 5, note: 'Restock', date: new Date(Date.now() - 86400000 * 8).toISOString() },
  { id: 'sh4', productId: '1', productName: 'iPhone 15 Pro', type: 'decrease', quantity: 2, note: 'Sale', date: new Date(Date.now() - 86400000 * 7).toISOString() },
  { id: 'sh5', productId: '5', productName: 'Sony WH-1000XM5', type: 'increase', quantity: 10, note: 'Restock', date: new Date(Date.now() - 86400000 * 6).toISOString() },
  { id: 'sh6', productId: '8', productName: 'Samsung 65" QLED TV', type: 'increase', quantity: 5, note: 'New arrival', date: new Date(Date.now() - 86400000 * 5).toISOString() },
  { id: 'sh7', productId: '4', productName: 'Dell XPS 15', type: 'increase', quantity: 8, note: 'Restock', date: new Date(Date.now() - 86400000 * 4).toISOString() },
  { id: 'sh8', productId: '3', productName: 'MacBook Pro 14" M3', type: 'increase', quantity: 20, note: 'Bulk shipment', date: new Date(Date.now() - 86400000 * 3).toISOString() },
  { id: 'sh9', productId: '11', productName: 'Logitech MX Master 3', type: 'increase', quantity: 60, note: 'Initial stock', date: new Date(Date.now() - 86400000 * 2).toISOString() },
  { id: 'sh10', productId: '6', productName: 'AirPods Pro 2', type: 'decrease', quantity: 5, note: 'Corporate order', date: new Date(Date.now() - 86400000 * 1).toISOString() }
];
