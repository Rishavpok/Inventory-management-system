import React, { useState, useMemo } from 'react';
import { useInventoryStore } from '../store/inventoryStore';
import { SaleForm } from '../components/SaleForm';
import { Pagination } from '../components/Pagination';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './SalesPage.module.css';

export const SalesPage: React.FC = () => {
  const { sales } = useInventoryStore();

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const paginatedSales = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sales.slice(start, start + pageSize);
  }, [sales, currentPage, pageSize]);

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        <div className={styles.formSection}>
          <SaleForm />
        </div>

        <div className={styles.historySection}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h2>Sales History</h2>
            </div>
            
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Qty</th>
                    <th>Unit Price</th>
                    <th>Total</th>
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
                        <td>{new Date(sale.date).toLocaleString()}</td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                  {paginatedSales.length === 0 && (
                    <tr>
                      <td colSpan={5} className={styles.empty}>No sales recorded yet</td>
                    </tr>
                  )}
                </tbody>
              </table>
              <Pagination 
                currentPage={currentPage} totalItems={sales.length} pageSize={pageSize}
                onPageChange={setCurrentPage} onPageSizeChange={setPageSize}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
