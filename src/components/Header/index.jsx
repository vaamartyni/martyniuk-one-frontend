import React, {useState} from 'react';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import styles from './Header.module.scss';
import Container from '@mui/material/Container';
import {useDispatch, useSelector} from "react-redux";
import {logOutUser} from "../../store/slices/authSlice";
import Modal from "../Modal";
import {UserInfo} from "../UserInfo";
export const Header = () => {

  const [logOutModalOpen, setLogOutModalOpen] = useState(false);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.userData)

  const onClickLogout = () => {
    setLogOutModalOpen(true)
  };

  const handleConfirmAction = () => {
    setLogOutModalOpen(false)
    dispatch(logOutUser())
  }

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link className={styles.logo} to="/">
            <div>MARTYNIUK</div>
          </Link>
          <div className={styles.buttons}>
            {Boolean(userData) && <UserInfo fullName={userData.fullName} avatarUrl={userData.avatarUrl}/>}
            <div className={styles.userActions}>
              {Boolean(userData) ? (
                  <>
                    <Link to="/create">
                      <Button variant="text">Написать статью</Button>
                    </Link>
                    <Button onClick={onClickLogout} variant="text" color="error">
                      Выйти
                    </Button>
                  </>
              ) : (
                  <>
                    <Link to="/login">
                      <Button variant="text">Войти</Button>
                    </Link>
                    <Link to="/register">
                      <Button variant="text">Создать аккаунт</Button>
                    </Link>
                  </>
              )}
            </div>
          </div>
        </div>
      </Container>
      <Modal title={"Вы действительно хотите выйти ?"} confirmTitle={"Выйти"} cancelTitle={"Отмена"} handleClose={()=>setLogOutModalOpen(false)} isOpen={logOutModalOpen} handleConfirmAction={handleConfirmAction} />
    </div>
  );
};
