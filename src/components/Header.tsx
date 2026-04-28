import React from 'react';
import { useAuthStore } from '../store/authStore';
import { useProfileStore } from '../store/profileStore';
import { useNavigate } from 'react-router-dom';
import styles from './Header.module.css';

interface HeaderProps {
  title: string;
}

export const Header: React.FC<HeaderProps> = ({ title }) => {
  const { isLoggedIn } = useAuthStore();
  const { fullName } = useProfileStore();
  const navigate = useNavigate();

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  };

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.actions}>
        {isLoggedIn && (
          <div className={styles.userSection} onClick={() => navigate('/profile')}>
            <div className={styles.avatar}>
              {getInitials(fullName)}
            </div>
            <span className={styles.userName}>{fullName}</span>
          </div>
        )}
      </div>
    </header>
  );
};
