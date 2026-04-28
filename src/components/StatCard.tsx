import styles from './StatCard.module.css';

interface StatCardProps {
  title: string;
  value: string | number;
  highlight?: string;
  isNegative?: boolean;
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, highlight, isNegative }) => {
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.valueContainer}>
        <span className={`${styles.value} ${isNegative ? styles.negative : ''}`}>{value}</span>
        {highlight && <span className={styles.highlight}>{highlight}</span>}
      </div>
    </div>
  );
};
