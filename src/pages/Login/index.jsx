import React, {useEffect, useState} from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import styles from "./Login.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {loginUser} from "../../store/slices/authSlice";
import {Navigate, useLocation} from "react-router-dom";
import Divider from "@mui/material/Divider";
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import IconButton from "@mui/material/IconButton";
import Animation from "../../components/Animation";
import Modal from "../../components/Modal";

export const Login = () => {
    const location = useLocation();
    const [isHintExpanded, setIsHintExpanded] = useState(false);
    const dispatch = useDispatch();
    const isAuth = useSelector((state) => Boolean(state.auth.userData))
    useEffect(()=>{
        if (location.state && location.state.unAuthAddAttempt){

        }
    },[location])
    const { register, handleSubmit, setError, formState: { errors, isValid } } = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
        mode: "onChange"
    });

    const onSubmit = async (values) => {
        const data = await dispatch(loginUser(values))
        if ('token' in data.payload){
            window.localStorage.setItem('token', data.payload.token)
        }
    };
    if (isAuth){
        return <Navigate to="/" />
    }

  return (
      <Animation>
          <Paper classes={{ root: styles.root }}>
              <form onSubmit={handleSubmit(onSubmit)}>
                  <Typography classes={{ root: styles.title }} variant="h5">
                      Вход в аккаунт
                  </Typography>
                  <TextField
                      {...register('email', { required: 'Необходимо указать email' })}
                      className={styles.field}
                      label="E-Mail"
                      error={Boolean(errors.email?.message)}
                      helperText={errors.email?.message}
                      fullWidth
                  />
                  <TextField
                      {...register('password', { required: 'Необходимо ввести пароль' })}
                      className={styles.field}
                      label="Пароль"
                      error={Boolean(errors.password?.message)}
                      helperText={errors.password?.message}
                      type="password"
                      fullWidth />
                  <Button type="submit" size="large" variant="contained" fullWidth>
                      Войти
                  </Button>
              </form>
              <Divider sx={{margin: '15px 0'}} variant="middle" />
              <div style={{display: 'flex', alignItems: 'center', gap: '5px'}}>
                  <IconButton onClick={()=>setIsHintExpanded(!isHintExpanded)} aria-label="delete">
                      <QuestionMarkIcon />
                  </IconButton>
                  <Typography sx={{marginBottom: 0}} variant="caption" display="block" gutterBottom>
                      Безопасность ваших учетных данных
                  </Typography>
              </div>
              {location.state && location.state.unAuthAddAttempt && <div
                  style={{
                      display: 'flex',
                      flexDirection: 'column'
                  }}
              >
                  <Divider sx={{margin: '15px 0'}} variant="middle"/>
                  <Typography color="red" align="center" variant="caption" gutterBottom>
                      Необходимо авторизоваться для создания новой статьи
                  </Typography>
              </div>}
          </Paper>
          <Modal cancelTitle={"Понятно"} title={"Безопасность ваших учетных данных"} handleClose={()=>setIsHintExpanded(false)} isOpen={isHintExpanded} body={"Ваш пароль будет захеширован в базе и к нему не будет прямого доступа, но\n" +
              "                      я не рекомендую использовать реальные учетные данные, т.к. на текущий момент проект используется для\n" +
              "                      тестовой площадки"} />
      </Animation>
  );
};
