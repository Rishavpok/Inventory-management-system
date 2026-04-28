import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Sidebar.module.css';

export const Sidebar: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems: { section: string, items: { label: string, to: string, icon: string, end?: boolean }[] }[] = [
    { section: "MAIN", items: [{ label: "Dashboard", to: "/", icon: "grid", end: true }] },
    { section: "INVENTORY", items: [
      { label: "Products", to: "/products", icon: "box" },
      { label: "Stock Management", to: "/stock", icon: "layers" }
    ]},
    { section: "COMMERCE", items: [
      { label: "Sales", to: "/sales", icon: "trending-up" },
      { label: "Billing", to: "/billing", icon: "file-text" }
    ]},
    { section: "ACCOUNT", items: [
      { label: "User Profile", to: "/profile", icon: "user" }
    ]}
  ];

  const getIcon = (name: string) => {
    switch (name) {
      case "grid": return "▦";
      case "box": return "📦";
      case "layers": return "📚";
      case "trending-up": return "📈";
      case "file-text": return "📄";
      case "user": return "👤";
      default: return "•";
    }
  };

  return (
    <aside className={`${styles.sidebar} ${isExpanded ? styles.expanded : styles.collapsed}`}>
      <div className={styles.logo}>
        <h2 className={styles.logoText}>
          {isExpanded ? "ElectroManage" : "EM"}
        </h2>
      </div>
      <nav className={styles.nav}>
        {navItems.map((group) => (
          <div key={group.section} className={styles.navGroup}>
            {isExpanded && <div className={styles.sectionLabel}>{group.section}</div>}
            {group.items.map(item => (
              <NavLink 
                key={item.to}
                to={item.to} 
                end={item.end}
                className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}
              >
                <span className={styles.icon}>{getIcon(item.icon)}</span>
                <AnimatePresence>
                  {isExpanded && (
                    <motion.span 
                      className={styles.label}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ delay: 0.15, duration: 0.1 }}
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </NavLink>
            ))}
          </div>
        ))}
      </nav>
      <div className={styles.bottomSection}>
        <div className={styles.logoutWrapper}>
          <button onClick={handleLogout} className={styles.logoutButton}>
            <span className={styles.icon}>🚪</span>
            <AnimatePresence>
              {isExpanded && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.15, duration: 0.1 }}
                >
                  Logout
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
        <div className={styles.toggleWrapper} onClick={() => setIsExpanded(!isExpanded)}>
          <button className={styles.toggleBtn}>
            {isExpanded ? "←" : "→"}
          </button>
        </div>
      </div>
    </aside>
  );
};
