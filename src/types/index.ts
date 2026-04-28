export type Category =
  | "Smartphones" | "Laptops" | "Audio"
  | "Tablets" | "Televisions" | "Accessories"
  | "Cameras" | "Gaming";

export interface Product {
  id: string;
  name: string;
  category: Category;
  brand: string;
  price: number;
  stock: number;
  sku: string;
  createdAt: string;
}

export interface StockHistory {
  id: string;
  productId: string;
  productName: string;
  type: "increase" | "decrease";
  quantity: number;
  note: string;
  date: string;
}

export interface Sale {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  pricePerUnit: number;
  total: number;
  date: string;
}

export type BillingStatus = "Paid" | "Unpaid" | "Cancelled";

export interface BillingRecord {
  id: string;
  customerName: string;
  customerEmail: string;
  productId: string;
  productName: string;
  quantity: number;
  pricePerUnit: number;
  total: number;
  status: BillingStatus;
  notes?: string;
  date: string;
}

export interface ProfileData {
  fullName: string;
  email: string;
  phone: string;
  department: string;
  location: string;
  bio: string;
}
