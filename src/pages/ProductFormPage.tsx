import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useInventoryStore } from '../store/inventoryStore';
import { useBranchStore } from '../store/branchStore';
import type { Category, Product } from '../types';
import styles from './ProductFormPage.module.css';

export const ProductFormPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);
  
  const { products, addProduct, updateProduct } = useInventoryStore();
  const { branches } = useBranchStore();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    category: 'Smartphones' as Category,
    brand: '',
    price: '',
    costPrice: '',
    stock: '',
    sku: '',
    branch: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isEdit && id) {
      const product = products.find(p => p.id === id);
      if (product) {
        setFormData({
          name: product.name,
          category: product.category,
          brand: product.brand,
          price: product.price.toString(),
          costPrice: product.costPrice?.toString() || '',
          stock: product.stock.toString(),
          sku: product.sku,
          branch: product.branch || ''
        });
      }
    }
  }, [id, isEdit, products]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.brand.trim()) newErrors.brand = 'Brand is required';
    if (!formData.sku.trim()) newErrors.sku = 'SKU is required';
    
    // Check SKU uniqueness (if adding or if editing and SKU changed)
    const duplicateSku = products.find(p => p.sku === formData.sku && p.id !== id);
    if (duplicateSku) {
      newErrors.sku = 'SKU already exists';
    }

    const priceVal = parseFloat(formData.price);
    if (!formData.price) {
      newErrors.price = 'Price is required';
    } else if (isNaN(priceVal) || priceVal <= 0) {
      newErrors.price = 'Price must be greater than 0';
    }

    if (formData.costPrice) {
      const costVal = parseFloat(formData.costPrice);
      if (isNaN(costVal) || costVal < 0) {
        newErrors.costPrice = 'Cost price cannot be negative';
      }
    }

    const stockVal = parseInt(formData.stock, 10);
    if (!formData.stock) {
      newErrors.stock = 'Stock is required';
    } else if (isNaN(stockVal) || stockVal < 0) {
      newErrors.stock = 'Stock cannot be negative';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validate()) {
      const productData: Product = {
        id: isEdit ? id! : Date.now().toString(),
        name: formData.name,
        category: formData.category,
        brand: formData.brand,
        price: parseFloat(formData.price),
        costPrice: formData.costPrice ? parseFloat(formData.costPrice) : undefined,
        stock: parseInt(formData.stock, 10),
        sku: formData.sku,
        branch: formData.branch || undefined,
        createdAt: isEdit ? products.find(p => p.id === id)!.createdAt : new Date().toISOString()
      };

      if (isEdit) {
        updateProduct(productData);
      } else {
        addProduct(productData);
      }

      navigate('/products');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formCard}>
        <h2>{isEdit ? 'Edit Product' : 'Add New Product'}</h2>
        
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Product Name</label>
            <input id="name" name="name" value={formData.name} onChange={handleChange} />
            {errors.name && <span className={styles.error}>{errors.name}</span>}
          </div>

          <div className={styles.row}>
            <div className={styles.formGroup}>
              <label htmlFor="category">Category</label>
              <select id="category" name="category" value={formData.category} onChange={handleChange}>
                {['Smartphones', 'Laptops', 'Audio', 'Tablets', 'Televisions', 'Accessories', 'Cameras', 'Gaming'].map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="brand">Brand</label>
              <input id="brand" name="brand" value={formData.brand} onChange={handleChange} />
              {errors.brand && <span className={styles.error}>{errors.brand}</span>}
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.formGroup}>
              <label htmlFor="price">Price (USD)</label>
              <input id="price" name="price" type="number" step="0.01" value={formData.price} onChange={handleChange} />
              {errors.price && <span className={styles.error}>{errors.price}</span>}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="costPrice">Cost Price (USD)</label>
              <input id="costPrice" name="costPrice" type="number" step="0.01" value={formData.costPrice} onChange={handleChange} />
              {errors.costPrice && <span className={styles.error}>{errors.costPrice}</span>}
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.formGroup}>
              <label htmlFor="stock">Initial Stock</label>
              <input id="stock" name="stock" type="number" value={formData.stock} onChange={handleChange} disabled={isEdit} />
              {errors.stock && <span className={styles.error}>{errors.stock}</span>}
              {isEdit && <span className={styles.helpText}>To change stock, use the Stock Management page.</span>}
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.formGroup}>
              <label htmlFor="sku">SKU</label>
              <input id="sku" name="sku" value={formData.sku} onChange={handleChange} />
              {errors.sku && <span className={styles.error}>{errors.sku}</span>}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="branch">Store/Branch</label>
              <select id="branch" name="branch" value={formData.branch} onChange={handleChange}>
                <option value="">-- No Branch --</option>
                {branches.map(b => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>
          </div>

          <div className={styles.actions}>
            <button type="button" className={styles.cancelBtn} onClick={() => navigate('/products')}>
              Cancel
            </button>
            <button type="submit" className={styles.submitBtn}>
              {isEdit ? 'Save Changes' : 'Add Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
