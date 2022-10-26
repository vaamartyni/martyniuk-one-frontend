import React from 'react';
import styles from './UserInfo.module.scss';
import {onImageLoadingError} from "../../utils";
import monsterUser from '../../assets/monsterUser.svg'

export const UserInfo = ({ avatarUrl, fullName, additionalText }) => {
  return (
    <div className={styles.root}>
      <img onError={onImageLoadingError} className={styles.avatar} src={avatarUrl || monsterUser} alt={fullName} />
      <div className={styles.userDetails}>
        <span className={styles.userName}>{fullName}</span>
        <span className={styles.additional}>{additionalText}</span>
      </div>
    </div>
  );
};
