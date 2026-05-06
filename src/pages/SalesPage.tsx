import React, { useState, useMemo } from 'react';
import { useInventoryStore } from '../store/inventoryStore';
import { useBranchStore } from '../store/branchStore';
import { SaleForm } from '../components/SaleForm';
import { Pagination } from '../components/Pagination';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './SalesPage.module.css';

export const SalesPage: React.FC = () => {
  const { sales } = useInventoryStore();
  const { branches } = useBranchStore();

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedBranch, setSelectedBranch] = useState<string>('All');

  const filteredSales = useMemo(() => {
    if (selectedBranch === 'All') return sales;
    return sales.filter(s => s.branch === selectedBranch);
  }, [sales, selectedBranch]);

  React.useEffect(() => {
    setCurrentPage(1);
  }, [selectedBranch, pageSize]);

  const paginatedSales = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredSales.slice(start, start + pageSize);
  }, [filteredSales, currentPage, pageSize]);

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        <div className={styles.formSection}>
          <SaleForm />
        </div>

        <div className={styles.historySection}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                <h2>Sales History</h2>
                <select 
                  value={selectedBranch} 
                  onChange={(e) => setSelectedBranch(e.target.value)}
                  style={{ padding: '0.5rem', borderRadius: '6px', border: '1px solid #d1d5db' }}
                >
                  <option value="All">All Branches</option>
                  {branches.map(b => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Qty</th>
                    <th>Unit Price</th>
                    <th>Total</th>
                    <th>Pay Method</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence>
                    {paginatedSales.map((sale, index) => (
                      <motion.tr 
                        key={sale.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ delay: index * 0.03 }}
                      >
                        <td className={styles.nameCell}>{sale.productName}</td>
                        <td>{sale.quantity}</td>
                        <td>${sale.pricePerUnit.toFixed(2)}</td>
                        <td className={styles.totalCell}>${sale.total.toFixed(2)}</td>
                        <td>
                          {sale.paymentMethod ? (
                            <span style={{
                              padding: '0.25rem 0.5rem', 
                              borderRadius: '9999px', 
                              fontSize: '0.75rem', 
                              fontWeight: 500,
                              backgroundColor: sale.paymentMethod === 'Cash' ? '#dcfce7' : '#e0e7ff',
                              color: sale.paymentMethod === 'Cash' ? '#166534' : '#3730a3'
                            }}>
                              {sale.paymentMethod}
                            </span>
                          ) : '-'}
                        </td>
                        <td>{new Date(sale.date).toLocaleString()}</td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                  {paginatedSales.length === 0 && (
                    <tr>
                      <td colSpan={6} className={styles.empty}>No sales recorded yet</td>
                    </tr>
                  )}
                </tbody>
              </table>
              <Pagination 
                currentPage={currentPage} totalItems={filteredSales.length} pageSize={pageSize}
                onPageChange={setCurrentPage} onPageSizeChange={setPageSize}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
