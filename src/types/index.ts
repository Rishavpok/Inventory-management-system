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
  costPrice?: number;
  stock: number;
  sku: string;
  branch?: string;
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
  costPrice?: number;
  total: number;
  date: string;
  branch?: string;
  paymentMethod?: "Cash" | "Digital";
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
  branch?: string;
  paymentMethod?: "Cash" | "Digital";
}

export interface ProfileData {
  fullName: string;
  email: string;
  phone: string;
  department: string;
  location: string;
  bio: string;
}
