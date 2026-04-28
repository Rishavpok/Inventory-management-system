import { create } from 'zustand';
import type { BillingRecord, BillingStatus } from '../types';
import { dummyBillingRecords } from '../data/billingData';

interface BillingStore {
  billingRecords: BillingRecord[];
  addBillingRecord: (record: BillingRecord) => void;
  updateBillingStatus: (id: string, status: BillingStatus) => void;
  deleteBillingRecord: (id: string) => void;
}

export const useBillingStore = create<BillingStore>((set) => ({
  billingRecords: dummyBillingRecords,
  addBillingRecord: (record) => 
    set((state) => ({ billingRecords: [record, ...state.billingRecords] })),
  updateBillingStatus: (id, status) => 
    set((state) => ({
      billingRecords: state.billingRecords.map((r) => 
        r.id === id ? { ...r, status } : r
      )
    })),
  deleteBillingRecord: (id) => 
    set((state) => ({
      billingRecords: state.billingRecords.filter((r) => r.id !== id)
    }))
}));
