import { useState } from 'react';
import { useInventoryStore } from '../store/inventoryStore';
import type { Sale } from '../types';
import styles from './SaleForm.module.css';

export const SaleForm: React.FC = () => {
  const { products, recordSale } = useInventoryStore();

  const [productId, setProductId] = useState('');
  const [qty, setQty] = useState('');
  const [error, setError] = useState('');

  const selectedProduct = products.find(p => p.id === productId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!productId) {
      setError('Please select a product');
      return;
    }

    const amount = parseInt(qty, 10);
    if (!qty || isNaN(amount) || amount <= 0) {
      setError('Enter a valid quantity');
      return;
    }

    if (!selectedProduct) {
      setError('Product not found');
      return;
    }

    if (amount > selectedProduct.stock) {
      setError('Insufficient stock');
      return;
    }

    const sale: Sale = {
      id: Date.now().toString() + "_s",
      productId: selectedProduct.id,
      productName: selectedProduct.name,
      quantity: amount,
      pricePerUnit: selectedProduct.price,
      total: amount * selectedProduct.price,
      date: new Date().toISOString()
    };

    recordSale(sale);
    setProductId('');
    setQty('');
  };

  return (
    <div className={styles.formCard}>
      <h3>Record New Sale</h3>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="product">Product</label>
          <select 
            id="product" 
            value={productId} 
            onChange={e => {
              setProductId(e.target.value);
              setError('');
            }}
          >
            <option value="">-- Select Product --</option>
            {products.map(p => (
              <option key={p.id} value={p.id}>
                {p.name} (Stock: {p.stock}) - ${p.price}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="qty">Quantity</label>
          <input 
            id="qty" 
            type="number" 
            value={qty} 
            onChange={e => {
              setQty(e.target.value);
              setError('');
            }} 
            placeholder="e.g. 2"
          />
        </div>

        {selectedProduct && qty && !error && (
            <div className={styles.summary}>
                Total: <strong>${(parseInt(qty) * selectedProduct.price).toFixed(2)}</strong>
            </div>
        )}

        {error && <div className={styles.error}>{error}</div>}

        <button type="submit" className={styles.submitBtn}>
          Submit Sale
        </button>
      </form>
    </div>
  );
};
