import { useState } from 'react';
import styles from './StockControl.module.css';

interface StockControlProps {
  productId: string;
  currentStock: number;
  onUpdate: (productId: string, type: 'increase' | 'decrease', qty: number, note: string) => void;
}

export const StockControl: React.FC<StockControlProps> = ({ productId, currentStock, onUpdate }) => {
  const [qty, setQty] = useState('');
  const [note, setNote] = useState('');
  const [error, setError] = useState('');

  const handleUpdate = (type: 'increase' | 'decrease') => {
    const amount = parseInt(qty, 10);
    if (!qty || isNaN(amount) || amount <= 0) {
      setError('Enter a valid quantity');
      return;
    }

    if (type === 'decrease' && amount > currentStock) {
      setError('Cannot remove more than current stock');
      return;
    }

    onUpdate(productId, type, amount, note || (type === 'increase' ? 'Stock Added' : 'Stock Removed'));
    setQty('');
    setNote('');
    setError('');
  };

  return (
    <div className={styles.container}>
      <div className={styles.inputs}>
        <input 
          type="number" 
          value={qty} 
          onChange={e => { setQty(e.target.value); setError(''); }} 
          placeholder="Qty" 
          className={styles.qtyInput}
        />
        <input 
          type="text" 
          value={note} 
          onChange={e => setNote(e.target.value)} 
          placeholder="Note (optional)" 
          className={styles.noteInput}
        />
      </div>
      {error && <div className={styles.error}>{error}</div>}
      <div className={styles.actions}>
        <button onClick={() => handleUpdate('increase')} className={styles.addBtn}>+ Add</button>
        <button onClick={() => handleUpdate('decrease')} className={styles.removeBtn}>- Remove</button>
      </div>
    </div>
  );
};
