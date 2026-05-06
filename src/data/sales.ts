import type { Sale } from '../types';

export const dummySales: Sale[] = [
  { id: 's1', productId: '1', productName: 'iPhone 15 Pro', quantity: 2, pricePerUnit: 999, costPrice: 799, total: 1998, date: new Date(Date.now() - 86400000 * 5).toISOString(), branch: 'Main Branch', paymentMethod: 'Digital' },
  { id: 's2', productId: '6', productName: 'AirPods Pro 2', quantity: 5, pricePerUnit: 249, costPrice: 120, total: 1245, date: new Date(Date.now() - 86400000 * 4).toISOString(), branch: 'Main Branch', paymentMethod: 'Cash' },
  { id: 's3', productId: '10', productName: 'PlayStation 5', quantity: 1, pricePerUnit: 499, costPrice: 400, total: 499, date: new Date(Date.now() - 86400000 * 3).toISOString(), branch: 'Main Branch', paymentMethod: 'Digital' },
  { id: 's4', productId: '3', productName: 'MacBook Pro 14" M3', quantity: 1, pricePerUnit: 1999, costPrice: 1500, total: 1999, date: new Date(Date.now() - 86400000 * 2.5).toISOString(), branch: 'Downtown', paymentMethod: 'Cash' },
  { id: 's5', productId: '11', productName: 'Logitech MX Master 3', quantity: 3, pricePerUnit: 99, costPrice: 50, total: 297, date: new Date(Date.now() - 86400000 * 2).toISOString(), branch: 'Main Branch', paymentMethod: 'Digital' },
  { id: 's6', productId: '2', productName: 'Samsung Galaxy S24 Ultra', quantity: 1, pricePerUnit: 1199, costPrice: 900, total: 1199, date: new Date(Date.now() - 86400000 * 1.5).toISOString(), branch: 'Main Branch', paymentMethod: 'Digital' },
  { id: 's7', productId: '5', productName: 'Sony WH-1000XM5', quantity: 2, pricePerUnit: 349, costPrice: 200, total: 698, date: new Date(Date.now() - 86400000 * 1.2).toISOString(), branch: 'Downtown', paymentMethod: 'Cash' },
  { id: 's8', productId: '8', productName: 'Samsung 65" QLED TV', quantity: 1, pricePerUnit: 1299, costPrice: 900, total: 1299, date: new Date(Date.now() - 86400000 * 1).toISOString(), branch: 'Warehouse', paymentMethod: 'Digital' },
  { id: 's9', productId: '1', productName: 'iPhone 15 Pro', quantity: 1, pricePerUnit: 999, costPrice: 799, total: 999, date: new Date(Date.now() - 43200000).toISOString(), branch: 'Main Branch', paymentMethod: 'Cash' },
  { id: 's10', productId: '4', productName: 'Dell XPS 15', quantity: 1, pricePerUnit: 1749, costPrice: 1300, total: 1749, date: new Date().toISOString(), branch: 'Main Branch', paymentMethod: 'Digital' },
];
