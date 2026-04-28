import React from 'react';
import styles from './Pagination.module.css';

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalItems,
  pageSize,
  onPageChange,
  onPageSizeChange
}) => {
  const totalPages = Math.ceil(totalItems / pageSize) || 1;
  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  const getPageNumbers = () => {
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + 4);

    if (endPage - startPage < 4) {
      startPage = Math.max(1, endPage - 4);
    }

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
    }
    return pages;
  };

  return (
    <div className={styles.paginationContainer}>
      <div className={styles.info}>
        {totalItems > 0 ? (
          <>Showing {startItem} to {endItem} of {totalItems} entries</>
        ) : (
          <>No entries found</>
        )}
      </div>
      <div className={styles.controls}>
        <div className={styles.pageSizeControl}>
          <select 
            value={pageSize} 
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className={styles.select}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
        <div className={styles.buttons}>
          <button 
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
            className={styles.btn}
          >
            Previous
          </button>
          
          {getPageNumbers().map(p => (
            <button 
              key={p}
              onClick={() => onPageChange(p)}
              className={`${styles.btn} ${p === currentPage ? styles.active : ''}`}
            >
              {p}
            </button>
          ))}

          <button 
            disabled={currentPage === totalPages}
            onClick={() => onPageChange(currentPage + 1)}
            className={styles.btn}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};
