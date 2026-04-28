import React, { useMemo } from 'react';
import { useInventoryStore } from '../store/inventoryStore';
import { motion } from 'framer-motion';
import { 
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  LineChart, Line
} from 'recharts';
import styles from './DashboardPage.module.css';

export const DashboardPage: React.FC = () => {
  const { products, sales } = useInventoryStore();

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#ed64a6', '#4fd1c5', '#6366f1', '#10b981'];

  // 1. Pie Chart: Stock by Category
  const stockByCategory = useMemo(() => {
    const data: Record<string, number> = {};
    products.forEach(p => {
      data[p.category] = (data[p.category] || 0) + p.stock;
    });
    return Object.entries(data).map(([name, value]) => ({ name, value }));
  }, [products]);

  // 2. Bar Chart: Top 5 Products by Stock
  const topProductsByStock = useMemo(() => {
    return [...products].sort((a, b) => b.stock - a.stock).slice(0, 5).map(p => ({
      name: p.name.substring(0, 15) + (p.name.length > 15 ? '...' : ''),
      stock: p.stock
    }));
  }, [products]);

  // 3. Line Chart: Sales Trend
  const salesTrend = useMemo(() => {
    const data: Record<string, number> = {};
    sales.forEach(s => {
      const d = new Date(s.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
      data[d] = (data[d] || 0) + s.total;
    });
    return Object.entries(data).map(([date, total]) => ({ date, total }));
  }, [sales]);

  // 4. Donut Chart: Revenue by Category
  const revenueByCategory = useMemo(() => {
    const data: Record<string, number> = {};
    sales.forEach(s => {
      const p = products.find(prod => prod.id === s.productId);
      const cat = p ? p.category : 'Unknown';
      data[cat] = (data[cat] || 0) + s.total;
    });
    return Object.entries(data).map(([name, value]) => ({ name, value }));
  }, [sales, products]);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Analytics Dashboard</h2>
      </div>

      <motion.div 
        className={styles.chartsGrid}
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={itemVariants} className={styles.chartCard}>
          <h3>Stock by Category</h3>
          <div className={styles.chartWrapper}>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={stockByCategory} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                  {stockByCategory.map((_, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className={styles.chartCard}>
          <h3>Revenue by Category</h3>
          <div className={styles.chartWrapper}>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={revenueByCategory} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={100} label>
                  {revenueByCategory.map((_, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                </Pie>
                <Tooltip formatter={(value) => `$${Number(value).toFixed(2)}`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className={styles.chartCard}>
          <h3>Top 5 Products by Stock</h3>
          <div className={styles.chartWrapper}>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topProductsByStock} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{fontSize: 12}} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="stock" fill="#8884d8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className={styles.chartCard}>
          <h3>Sales Trend</h3>
          <div className={styles.chartWrapper}>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesTrend} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip formatter={(value) => `$${Number(value).toFixed(2)}`} />
                <Line type="monotone" dataKey="total" stroke="#ed64a6" strokeWidth={3} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

      </motion.div>
    </div>
  );
};
