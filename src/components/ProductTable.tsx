import type { Product } from '../types';
import { Badge } from './Badge';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './ProductTable.module.css';

interface ProductTableProps {
  products: Product[];
  onDelete: (id: string) => void;
}

export const ProductTable: React.FC<ProductTableProps> = ({ products, onDelete }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Brand</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <AnimatePresence>
          {products.map((product, index) => {
            const isLowStock = product.stock < 10;
            return (
              <motion.tr 
                key={product.id} 
                className={isLowStock ? styles.lowStockRow : ''}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: index * 0.03 }}
              >
                <td className={styles.nameCell}>
                  <div>{product.name}</div>
                  <div className={styles.sku}>{product.sku}</div>
                </td>
                <td>
                  <Badge variant="neutral">{product.category}</Badge>
                </td>
                <td>{product.brand}</td>
                <td>${product.price.toFixed(2)}</td>
                <td>
                  <Badge variant={isLowStock ? 'danger' : 'success'}>
                    {product.stock}
                  </Badge>
                </td>
                <td>
                  <div className={styles.actions}>
                    <button 
                      onClick={() => navigate(`/products/edit/${product.id}`)}
                      className={styles.editBtn}
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => onDelete(product.id)}
                      className={styles.deleteBtn}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </motion.tr>
            );
          })}
          </AnimatePresence>
          {products.length === 0 && (
             <tr>
               <td colSpan={6} className={styles.emptyState}>No products found</td>
             </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
