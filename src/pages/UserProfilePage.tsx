import React, { useState } from 'react';
import { useProfileStore } from '../store/profileStore';
import { useAuthStore } from '../store/authStore';
import { motion } from 'framer-motion';
import styles from './UserProfilePage.module.css';

export const UserProfilePage: React.FC = () => {
  const profile = useProfileStore();
  const authStore = useAuthStore();
  
  const [formData, setFormData] = useState({
    fullName: profile.fullName,
    email: profile.email,
    phone: profile.phone || '',
    department: profile.department || '',
    location: profile.location || '',
    bio: profile.bio || ''
  });
  const [profileMessage, setProfileMessage] = useState('');
  const [profileErrors, setProfileErrors] = useState<Record<string, string>>({});

  const [pwdData, setPwdData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [pwdMessage, setPwdMessage] = useState('');
  const [pwdErrors, setPwdErrors] = useState<Record<string, string>>({});

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  };

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};
    if (!formData.fullName.trim()) errors.fullName = "Full name is required";
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) errors.email = "Valid email is required";
    
    if (Object.keys(errors).length > 0) {
      setProfileErrors(errors);
      return;
    }
    setProfileErrors({});
    profile.updateProfile(formData);
    setProfileMessage("Profile updated successfully");
    setTimeout(() => setProfileMessage(''), 3000);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};
    if (!pwdData.currentPassword) errors.currentPassword = "Required";
    else if (pwdData.currentPassword !== authStore.currentPassword) {
      errors.currentPassword = "Current password is incorrect";
    }
    if (pwdData.newPassword.length < 6) errors.newPassword = "Password must be at least 6 characters";
    if (pwdData.newPassword !== pwdData.confirmPassword) errors.confirmPassword = "Passwords do not match";

    if (Object.keys(errors).length > 0) {
      setPwdErrors(errors);
      return;
    }
    setPwdErrors({});
    authStore.updatePassword(pwdData.newPassword);
    setPwdData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setPwdMessage("Password updated successfully");
    setTimeout(() => setPwdMessage(''), 3000);
  };

  const shakeAnimation = {
    x: [0, -6, 6, -4, 4, 0],
    transition: { duration: 0.4 }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.avatarLarge}>
            {getInitials(profile.fullName)}
          </div>
          <div className={styles.headerInfo}>
            <h2>{profile.fullName}</h2>
            <span className={styles.roleBadge}>Administrator</span>
          </div>
        </div>
        
        {profileMessage && <div className={styles.successMessage}>{profileMessage}</div>}

        <form onSubmit={handleProfileSubmit} className={styles.formContainer}>
          <h3>Profile Details</h3>
          <div className={styles.formGrid}>
            <motion.div animate={profileErrors.fullName ? shakeAnimation : false} className={styles.formGroup}>
              <label>Full Name *</label>
              <input 
                type="text" 
                value={formData.fullName} 
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                className={profileErrors.fullName ? styles.errorInput : ''}
              />
              {profileErrors.fullName && <span className={styles.errorText}>{profileErrors.fullName}</span>}
            </motion.div>

            <motion.div animate={profileErrors.email ? shakeAnimation : false} className={styles.formGroup}>
              <label>Email *</label>
              <input 
                type="email" 
                value={formData.email} 
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className={profileErrors.email ? styles.errorInput : ''}
              />
              {profileErrors.email && <span className={styles.errorText}>{profileErrors.email}</span>}
            </motion.div>

            <div className={styles.formGroup}>
              <label>Phone Number</label>
              <input type="text" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
            </div>

            <div className={styles.formGroup}>
              <label>Role</label>
              <input type="text" value="Administrator" disabled className={styles.disabledInput} />
            </div>

            <div className={styles.formGroup}>
              <label>Department</label>
              <input type="text" value={formData.department} onChange={(e) => setFormData({...formData, department: e.target.value})} />
            </div>

            <div className={styles.formGroup}>
              <label>Location</label>
              <input type="text" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} />
            </div>
          </div>
          
          <div className={styles.formGroupFull}>
            <label>Bio (max 200 chars)</label>
            <textarea 
              maxLength={200} 
              rows={3} 
              value={formData.bio} 
              onChange={(e) => setFormData({...formData, bio: e.target.value})}
            />
          </div>

          <motion.button 
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit" 
            className={styles.submitBtn}
          >
            Save Profile
          </motion.button>
        </form>
      </div>

      <div className={styles.card}>
        <h3>Change Password</h3>
        {pwdMessage && <div className={styles.successMessage}>{pwdMessage}</div>}
        
        <form onSubmit={handlePasswordSubmit} className={styles.pwdForm}>
          <motion.div animate={pwdErrors.currentPassword ? shakeAnimation : false} className={styles.formGroup}>
            <label>Current Password *</label>
            <input 
              type="password" 
              value={pwdData.currentPassword} 
              onChange={(e) => setPwdData({...pwdData, currentPassword: e.target.value})} 
              className={pwdErrors.currentPassword ? styles.errorInput : ''}
            />
            {pwdErrors.currentPassword && <span className={styles.errorText}>{pwdErrors.currentPassword}</span>}
          </motion.div>

          <motion.div animate={pwdErrors.newPassword ? shakeAnimation : false} className={styles.formGroup}>
            <label>New Password *</label>
            <input 
              type="password" 
              value={pwdData.newPassword} 
              onChange={(e) => setPwdData({...pwdData, newPassword: e.target.value})} 
              className={pwdErrors.newPassword ? styles.errorInput : ''}
            />
            {pwdErrors.newPassword && <span className={styles.errorText}>{pwdErrors.newPassword}</span>}
          </motion.div>

          <motion.div animate={pwdErrors.confirmPassword ? shakeAnimation : false} className={styles.formGroup}>
            <label>Confirm New Password *</label>
            <input 
              type="password" 
              value={pwdData.confirmPassword} 
              onChange={(e) => setPwdData({...pwdData, confirmPassword: e.target.value})} 
              className={pwdErrors.confirmPassword ? styles.errorInput : ''}
            />
            {pwdErrors.confirmPassword && <span className={styles.errorText}>{pwdErrors.confirmPassword}</span>}
          </motion.div>

          <motion.button 
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit" 
            className={styles.submitBtn}
          >
            Update Password
          </motion.button>
        </form>
      </div>
    </div>
  );
};
