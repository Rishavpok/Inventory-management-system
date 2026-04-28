import type { Product } from '../types';

export const dummyProducts: Product[] = [
  { id: '1', name: 'iPhone 15 Pro', category: 'Smartphones', brand: 'Apple', price: 999, stock: 42, sku: 'APL-IP15P', createdAt: new Date('2023-09-15T10:00:00Z').toISOString() },
  { id: '2', name: 'Samsung Galaxy S24 Ultra', category: 'Smartphones', brand: 'Samsung', price: 1199, stock: 8, sku: 'SAM-S24U', createdAt: new Date('2024-01-20T10:00:00Z').toISOString() },
  { id: '3', name: 'MacBook Pro 14" M3', category: 'Laptops', brand: 'Apple', price: 1999, stock: 15, sku: 'APL-MBP14', createdAt: new Date('2023-11-01T10:00:00Z').toISOString() },
  { id: '4', name: 'Dell XPS 15', category: 'Laptops', brand: 'Dell', price: 1749, stock: 6, sku: 'DEL-XPS15', createdAt: new Date('2023-06-15T10:00:00Z').toISOString() },
  { id: '5', name: 'Sony WH-1000XM5', category: 'Audio', brand: 'Sony', price: 349, stock: 5, sku: 'SNY-WH1000', createdAt: new Date('2022-05-12T10:00:00Z').toISOString() },
  { id: '6', name: 'AirPods Pro 2', category: 'Audio', brand: 'Apple', price: 249, stock: 30, sku: 'APL-APP2', createdAt: new Date('2022-09-07T10:00:00Z').toISOString() },
  { id: '7', name: 'iPad Pro 12.9"', category: 'Tablets', brand: 'Apple', price: 1099, stock: 20, sku: 'APL-IPP129', createdAt: new Date('2022-10-18T10:00:00Z').toISOString() },
  { id: '8', name: 'Samsung 65" QLED TV', category: 'Televisions', brand: 'Samsung', price: 1299, stock: 4, sku: 'SAM-TV65Q', createdAt: new Date('2023-04-05T10:00:00Z').toISOString() },
  { id: '9', name: 'Canon EOS R6', category: 'Cameras', brand: 'Canon', price: 2499, stock: 9, sku: 'CAN-EOSR6', createdAt: new Date('2020-07-09T10:00:00Z').toISOString() },
  { id: '10', name: 'PlayStation 5', category: 'Gaming', brand: 'Sony', price: 499, stock: 3, sku: 'SNY-PS5', createdAt: new Date('2020-11-12T10:00:00Z').toISOString() },
  { id: '11', name: 'Logitech MX Master 3', category: 'Accessories', brand: 'Logitech', price: 99, stock: 55, sku: 'LOG-MXM3', createdAt: new Date('2019-09-04T10:00:00Z').toISOString() },
  { id: '12', name: 'LG 27" 4K Monitor', category: 'Accessories', brand: 'LG', price: 699, stock: 12, sku: 'LG-27M4K', createdAt: new Date('2021-08-20T10:00:00Z').toISOString() }
];
