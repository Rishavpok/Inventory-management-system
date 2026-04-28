import React, { useState, useMemo } from 'react';
import { useInventoryStore } from '../store/inventoryStore';
import { StockControl } from '../components/StockControl';
import { Badge } from '../components/Badge';
import { Pagination } from '../components/Pagination';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './StockPage.module.css';

export const StockPage: React.FC = () => {
  const { products, updateStock, stockHistory } = useInventoryStore();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [historyPage, setHistoryPage] = useState(1);
  const [historyPageSize, setHistoryPageSize] = useState(10);

  const paginatedHistory = useMemo(() => {
    const start = (historyPage - 1) * historyPageSize;
    return stockHistory.slice(start, start + historyPageSize);
  }, [stockHistory, historyPage, historyPageSize]);

  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <div className={styles.header}>
          <h2>Current Stock</h2>
          <input 
            type="text" 
            placeholder="Search products..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
        </div>
        
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Product</th>
                <th>SKU</th>
                <th>Current Stock</th>
                <th>Manage Stock</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map(product => (
                <tr key={product.id}>
                  <td className={styles.nameCell}>{product.name}</td>
                  <td className={styles.skuCell}>{product.sku}</td>
                  <td>
                    <Badge variant={product.stock < 10 ? 'danger' : 'success'}>
                      {product.stock}
                    </Badge>
                  </td>
                  <td>
                    <StockControl 
                      productId={product.id} 
                      currentStock={product.stock}
                      onUpdate={updateStock}
                    />
                  </td>
                </tr>
              ))}
              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan={4} className={styles.empty}>No products found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className={styles.section}>
        <h2>Stock History</h2>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Product</th>
                <th>Type</th>
                <th>Quantity</th>
                <th>Note</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {paginatedHistory.map((entry, index) => (
                  <motion.tr 
                    key={entry.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: index * 0.03 }}
                  >
                    <td>{entry.productName}</td>
                    <td>
                      <Badge variant={entry.type === 'increase' ? 'success' : 'warning'}>
                        {entry.type}
                      </Badge>
                    </td>
                    <td>{entry.quantity}</td>
                    <td>{entry.note}</td>
                    <td>{new Date(entry.date).toLocaleString()}</td>
                  </motion.tr>
                ))}
              </AnimatePresence>
              {paginatedHistory.length === 0 && (
                <tr>
                  <td colSpan={5} className={styles.empty}>No history found</td>
                </tr>
              )}
            </tbody>
          </table>
          <Pagination 
            currentPage={historyPage} totalItems={stockHistory.length} pageSize={historyPageSize}
            onPageChange={setHistoryPage} onPageSizeChange={setHistoryPageSize}
          />
        </div>
      </div>
    </div>
  );
};
