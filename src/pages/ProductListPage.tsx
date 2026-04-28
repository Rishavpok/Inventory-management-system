import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInventoryStore } from '../store/inventoryStore';
import { ProductTable } from '../components/ProductTable';
import { Pagination } from '../components/Pagination';
import type { Category } from '../types';
import styles from './ProductListPage.module.css';

export const ProductListPage: React.FC = () => {
  const { products, deleteProduct } = useInventoryStore();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const categories: (Category | 'All')[] = [
    'All', 'Smartphones', 'Laptops', 'Audio', 'Tablets', 
    'Televisions', 'Accessories', 'Cameras', 'Gaming'
  ];

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            product.sku.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, selectedCategory]);

  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, pageSize]);

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredProducts.slice(start, start + pageSize);
  }, [filteredProducts, currentPage, pageSize]);

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(id);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.filters}>
          <input 
            type="text" 
            placeholder="Search products..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
          <select 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value as Category | 'All')}
            className={styles.categorySelect}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <button 
          className={styles.addBtn}
          onClick={() => navigate('/products/add')}
        >
          Add Product
        </button>
      </div>

      <ProductTable products={paginatedProducts} onDelete={handleDelete} />
      <Pagination 
        currentPage={currentPage} totalItems={filteredProducts.length} pageSize={pageSize}
        onPageChange={setCurrentPage} onPageSizeChange={setPageSize}
      />
    </div>
  );
};
