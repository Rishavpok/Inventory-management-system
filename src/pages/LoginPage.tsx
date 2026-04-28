import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { ADMIN_CREDENTIALS } from '../data/authData';
import styles from './LoginPage.module.css';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string; form?: string }>({});
  
  const { isLoggedIn, login } = useAuthStore();
  const navigate = useNavigate();

  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = 'Enter a valid email';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
        login();
        navigate('/');
      } else {
        setErrors({ form: 'Invalid email or password' });
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h2>ElectroManage</h2>
          <p>Login to access your inventory</p>
        </div>
        
        {errors.form && <div className={styles.formError}>{errors.form}</div>}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors({ ...errors, email: undefined });
              }}
              className={errors.email ? styles.inputError : ''}
              placeholder="admin@inventory.com"
            />
            {errors.email && <span className={styles.errorText}>{errors.email}</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) setErrors({ ...errors, password: undefined });
              }}
              className={errors.password ? styles.inputError : ''}
              placeholder="••••••••"
            />
            {errors.password && <span className={styles.errorText}>{errors.password}</span>}
          </div>

          <button type="submit" className={styles.submitBtn}>Sign In</button>
        </form>

        <div className={styles.hint}>
          Default login: {ADMIN_CREDENTIALS.email} / {ADMIN_CREDENTIALS.password}
        </div>
      </div>
    </div>
  );
};
