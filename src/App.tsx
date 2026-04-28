import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { ProtectedRoute } from './components/ProtectedRoute';
import { PageTransition } from './components/PageTransition';
import { AnimatePresence } from 'framer-motion';

import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { ProductListPage } from './pages/ProductListPage';
import { ProductFormPage } from './pages/ProductFormPage';
import { StockPage } from './pages/StockPage';
import { SalesPage } from './pages/SalesPage';
import { UserProfilePage } from './pages/UserProfilePage';
import { BillingPage } from './pages/BillingPage';

import styles from './App.module.css';

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  // Map route path to header title
  let headerTitle = 'Dashboard';
  if (location.pathname.startsWith('/products')) headerTitle = 'Products';
  if (location.pathname === '/stock') headerTitle = 'Stock Management';
  if (location.pathname === '/sales') headerTitle = 'Sales';
  if (location.pathname === '/profile') headerTitle = 'User Profile';
  if (location.pathname === '/billing') headerTitle = 'Billing';

  return (
    <div className={styles.appContainer}>
      <Sidebar />
      <div className={styles.mainContent}>
        <Header title={headerTitle} />
        <main className={styles.pageContent}>
          <AnimatePresence mode="sync">
            <PageTransition key={location.pathname}>
              {children}
            </PageTransition>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={
          <PageTransition>
            <LoginPage />
          </PageTransition>
        } />
        
        {/* Protected Routes */}
        <Route 
          path="/*" 
          element={
            <ProtectedRoute>
              <AppLayout>
                <Routes>
                  <Route path="/" element={<DashboardPage />} />
                  <Route path="/products" element={<ProductListPage />} />
                  <Route path="/products/add" element={<ProductFormPage />} />
                  <Route path="/products/edit/:id" element={<ProductFormPage />} />
                  <Route path="/stock" element={<StockPage />} />
                  <Route path="/sales" element={<SalesPage />} />
                  <Route path="/profile" element={<UserProfilePage />} />
                  <Route path="/billing" element={<BillingPage />} />
                </Routes>
              </AppLayout>
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
