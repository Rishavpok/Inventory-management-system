import React, { useState, useMemo } from 'react';
import { useBillingStore } from '../store/billingStore';
import { useInventoryStore } from '../store/inventoryStore';
import { Pagination } from '../components/Pagination';
import { generateInvoicePDF, generateBillingReportPDF } from '../utils/pdfGenerator';
import { motion, AnimatePresence } from 'framer-motion';
import type { BillingStatus } from '../types';
import styles from './BillingPage.module.css';

export const BillingPage: React.FC = () => {
  const { billingRecords, updateBillingStatus, deleteBillingRecord, addBillingRecord } = useBillingStore();
  const { products, updateStock, recordSale } = useInventoryStore();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<BillingStatus | 'All'>('All');
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    customerName: '', customerEmail: '', productId: '', quantity: 1, status: 'Unpaid' as BillingStatus, notes: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // PDF Loading State
  const [pdfGenerating, setPdfGenerating] = useState<string | null>(null);

  // Filtering
  const filteredRecords = useMemo(() => {
    return billingRecords.filter(r => {
      const matchSearch = r.customerName.toLowerCase().includes(search.toLowerCase()) || r.id.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === 'All' || r.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [billingRecords, search, statusFilter]);

  // Pagination Logic
  const totalItems = filteredRecords.length;
  const paginatedRecords = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredRecords.slice(start, start + pageSize);
  }, [filteredRecords, currentPage, pageSize]);

  React.useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter, pageSize]);

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this invoice?")) {
      deleteBillingRecord(id);
    }
  };

  const handleDownloadSingle = (record: any) => {
    setPdfGenerating(record.id);
    setTimeout(() => {
      generateInvoicePDF(record);
      setPdfGenerating(null);
    }, 600);
  };

  const handleDownloadAll = () => {
    setPdfGenerating('all');
    setTimeout(() => {
      generateBillingReportPDF(filteredRecords);
      setPdfGenerating(null);
    }, 600);
  };

  const selectedProduct = products.find(p => p.id === formData.productId);

  const handleCreateInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    const currErrors: Record<string, string> = {};
    if (!formData.customerName.trim()) currErrors.customerName = "Customer name is required";
    if (!formData.customerEmail.trim() || !/^\S+@\S+\.\S+$/.test(formData.customerEmail)) currErrors.customerEmail = "Valid email is required";
    if (!formData.productId) currErrors.productId = "Select a product";
    else if (!selectedProduct) currErrors.productId = "Invalid product";
    
    if (selectedProduct) {
      if (formData.quantity <= 0) currErrors.quantity = "Quantity must be greater than 0";
      else if (formData.quantity > selectedProduct.stock) currErrors.quantity = "Insufficient stock";
    }

    if (Object.keys(currErrors).length > 0) {
      setErrors(currErrors);
      return;
    }

    const newId = `INV-${Math.floor(100000 + Math.random() * 900000)}`;
    const total = formData.quantity * selectedProduct!.price;
    const now = new Date().toISOString();

    const record = {
      id: newId,
      customerName: formData.customerName,
      customerEmail: formData.customerEmail,
      productId: formData.productId,
      productName: selectedProduct!.name,
      quantity: formData.quantity,
      pricePerUnit: selectedProduct!.price,
      total,
      status: formData.status,
      notes: formData.notes,
      date: now
    };

    updateStock(formData.productId, 'decrease', formData.quantity, `Invoice ${newId}`);
    recordSale({
      id: newId,
      productId: formData.productId,
      productName: selectedProduct!.name,
      quantity: formData.quantity,
      pricePerUnit: selectedProduct!.price,
      total,
      date: now
    });
    addBillingRecord(record);

    setIsModalOpen(false);
    setFormData({ customerName: '', customerEmail: '', productId: '', quantity: 1, status: 'Unpaid', notes: '' });
    setErrors({});
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.filters}>
          <input 
            type="text" 
            placeholder="Search by ID or Customer..." 
            value={search} 
            onChange={e => setSearch(e.target.value)} 
            className={styles.searchInput}
          />
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value as any)} className={styles.selectInput}>
            <option value="All">All Statuses</option>
            <option value="Paid">Paid</option>
            <option value="Unpaid">Unpaid</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
        <div className={styles.headerActions}>
          <motion.button 
            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.96 }}
            className={styles.btnSecondary}
            onClick={handleDownloadAll}
            disabled={filteredRecords.length === 0}
          >
            {pdfGenerating === 'all' ? "Generating..." : "↓ Export PDF"}
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.96 }}
            className={styles.btnPrimary}
            onClick={() => setIsModalOpen(true)}
          >
            + Create Invoice
          </motion.button>
        </div>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Invoice ID</th>
              <th>Customer</th>
              <th>Product</th>
              <th>Qty</th>
              <th>Total</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {paginatedRecords.map((r, i) => (
                <motion.tr 
                  key={r.id}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  transition={{ delay: i * 0.03 }}
                >
                  <td>{r.id}</td>
                  <td>{r.customerName}</td>
                  <td>{r.productName}</td>
                  <td>{r.quantity}</td>
                  <td>${r.total.toFixed(2)}</td>
                  <td>
                    <span className={`${styles.badge} ${styles[r.status.toLowerCase()]}`}>{r.status}</span>
                  </td>
                  <td>{new Date(r.date).toLocaleDateString()}</td>
                  <td className={styles.actionsCell}>
                    {r.status === 'Unpaid' && (
                      <>
                        <button className={styles.actionBtnText} onClick={() => updateBillingStatus(r.id, 'Paid')}>Mark Paid</button>
                        <button className={styles.actionBtnText} onClick={() => updateBillingStatus(r.id, 'Cancelled')}>Cancel</button>
                      </>
                    )}
                    <motion.button 
                      whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.96 }}
                      className={styles.pdfBtn} 
                      onClick={() => handleDownloadSingle(r)}
                    >
                      {pdfGenerating === r.id ? "Generating..." : "↓ PDF"}
                    </motion.button>
                    <button className={`${styles.actionBtnText} ${styles.deleteText}`} onClick={() => handleDelete(r.id)}>Delete</button>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
            {paginatedRecords.length === 0 && (
              <tr>
                <td colSpan={8} className={styles.emptyState}>No billing records found.</td>
              </tr>
            )}
          </tbody>
        </table>
        <Pagination 
          currentPage={currentPage} totalItems={totalItems} pageSize={pageSize}
          onPageChange={setCurrentPage} onPageSizeChange={setPageSize}
        />
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className={styles.modalOverlay}>
            <motion.div 
              className={styles.modal}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <h3>Create Invoice</h3>
              <form onSubmit={handleCreateInvoice} className={styles.form}>
                <div className={styles.formGroup}>
                  <label>Customer Name *</label>
                  <input type="text" value={formData.customerName} onChange={e => setFormData({...formData, customerName: e.target.value})} className={errors.customerName ? styles.errorInput : ''} />
                  {errors.customerName && <span className={styles.errorText}>{errors.customerName}</span>}
                </div>
                <div className={styles.formGroup}>
                  <label>Customer Email *</label>
                  <input type="email" value={formData.customerEmail} onChange={e => setFormData({...formData, customerEmail: e.target.value})} className={errors.customerEmail ? styles.errorInput : ''} />
                  {errors.customerEmail && <span className={styles.errorText}>{errors.customerEmail}</span>}
                </div>
                <div className={styles.formGroup}>
                  <label>Product *</label>
                  <select value={formData.productId} onChange={e => setFormData({...formData, productId: e.target.value})} className={errors.productId ? styles.errorInput : ''}>
                    <option value="">Select a product...</option>
                    {products.map(p => <option key={p.id} value={p.id}>{p.name} (${p.price} - Stock: {p.stock})</option>)}
                  </select>
                  {errors.productId && <span className={styles.errorText}>{errors.productId}</span>}
                </div>
                <div className={styles.formGroup}>
                  <label>Quantity *</label>
                  <input type="number" min="1" value={formData.quantity} onChange={e => setFormData({...formData, quantity: parseInt(e.target.value) || 0})} className={errors.quantity ? styles.errorInput : ''} />
                  {errors.quantity && <span className={styles.errorText}>{errors.quantity}</span>}
                </div>
                <div className={styles.formGroup}>
                  <label>Status</label>
                  <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value as BillingStatus})}>
                    <option value="Unpaid">Unpaid</option>
                    <option value="Paid">Paid</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
                <div className={styles.formGroupFull}>
                  <label>Notes</label>
                  <textarea rows={3} value={formData.notes} onChange={e => setFormData({...formData, notes: e.target.value})} />
                </div>
                <div className={styles.modalActions}>
                  <button type="button" onClick={() => setIsModalOpen(false)} className={styles.btnCancel}>Cancel</button>
                  <motion.button type="submit" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.96 }} className={styles.btnPrimary}>Create</motion.button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
