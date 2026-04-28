import type { BillingRecord } from '../types';

export const dummyBillingRecords: BillingRecord[] = [
  {
    id: "INV-001001",
    customerName: "Alice Smith",
    customerEmail: "alice@example.com",
    productId: "1",
    productName: "iPhone 15 Pro",
    quantity: 1,
    pricePerUnit: 999,
    total: 999,
    status: "Paid",
    date: new Date(Date.now() - 86400000 * 2).toISOString(),
    notes: "Express delivery"
  },
  {
    id: "INV-001002",
    customerName: "Bob Johnson",
    customerEmail: "bob@example.com",
    productId: "2",
    productName: "MacBook Pro M3",
    quantity: 1,
    pricePerUnit: 1599,
    total: 1599,
    status: "Unpaid",
    date: new Date(Date.now() - 86400000 * 1).toISOString(),
    notes: "Pending corporate approval"
  },
  {
    id: "INV-001003",
    customerName: "Carol Williams",
    customerEmail: "carol@example.com",
    productId: "3",
    productName: "AirPods Pro",
    quantity: 2,
    pricePerUnit: 249,
    total: 498,
    status: "Cancelled",
    date: new Date(Date.now() - 86400000 * 3).toISOString()
  },
  {
    id: "INV-001004",
    customerName: "David Brown",
    customerEmail: "david@example.com",
    productId: "1",
    productName: "iPhone 15 Pro",
    quantity: 3,
    pricePerUnit: 999,
    total: 2997,
    status: "Paid",
    date: new Date(Date.now() - 86400000 * 5).toISOString()
  },
  {
    id: "INV-001005",
    customerName: "Eve Davis",
    customerEmail: "eve@example.com",
    productId: "4",
    productName: "iPad Air",
    quantity: 1,
    pricePerUnit: 599,
    total: 599,
    status: "Unpaid",
    date: new Date(Date.now() - 86400000 * 0).toISOString()
  },
  {
    id: "INV-001006",
    customerName: "Frank Miller",
    customerEmail: "frank@example.com",
    productId: "5",
    productName: "Samsung TV 65\"",
    quantity: 2,
    pricePerUnit: 899,
    total: 1798,
    status: "Paid",
    date: new Date(Date.now() - 86400000 * 7).toISOString(),
    notes: "VIP customer"
  },
  {
    id: "INV-001007",
    customerName: "Grace Wilson",
    customerEmail: "grace@example.com",
    productId: "2",
    productName: "MacBook Pro M3",
    quantity: 1,
    pricePerUnit: 1599,
    total: 1599,
    status: "Cancelled",
    date: new Date(Date.now() - 86400000 * 8).toISOString(),
    notes: "Changed mind"
  },
  {
    id: "INV-001008",
    customerName: "Harry Taylor",
    customerEmail: "harry@example.com",
    productId: "3",
    productName: "AirPods Pro",
    quantity: 5,
    pricePerUnit: 249,
    total: 1245,
    status: "Paid",
    date: new Date(Date.now() - 86400000 * 10).toISOString()
  }
];
