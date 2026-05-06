import React, { useState } from 'react';
import { useBranchStore } from '../store/branchStore';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './BranchManagementPage.module.css';

export const BranchManagementPage: React.FC = () => {
  const { branches, addBranch, removeBranch } = useBranchStore();
  const [newBranch, setNewBranch] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (newBranch.trim()) {
      addBranch(newBranch.trim());
      setNewBranch('');
    }
  };

  const handleDelete = (branch: string) => {
    if (window.confirm(`Are you sure you want to delete the branch "${branch}"?`)) {
      removeBranch(branch);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Branch Management</h2>
      </div>

      <div className={styles.card}>
        <form onSubmit={handleAdd} className={styles.form}>
          <input
            type="text"
            placeholder="Enter new branch name..."
            value={newBranch}
            onChange={(e) => setNewBranch(e.target.value)}
            className={styles.input}
          />
          <motion.button 
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={styles.btnAdd}
            disabled={!newBranch.trim()}
          >
            + Add Branch
          </motion.button>
        </form>

        <div className={styles.branchList}>
          <AnimatePresence>
            {branches.map((branch) => (
              <motion.div
                key={branch}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className={styles.branchItem}
              >
                <span className={styles.branchName}>{branch}</span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleDelete(branch)}
                  className={styles.btnDelete}
                >
                  Delete
                </motion.button>
              </motion.div>
            ))}
          </AnimatePresence>
          {branches.length === 0 && (
            <div className={styles.emptyState}>No branches found. Add one above.</div>
          )}
        </div>
      </div>
    </div>
  );
};
