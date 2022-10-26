import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

import styles from './Login.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import { registerUser} from "../../store/slices/authSlice";
import {Navigate} from "react-router-dom";
import Animation from "../../components/Animation";

export const Registration = () => {
    const dispatch = useDispatch();
    const isAuth = useSelector((state) => Boolean(state.auth.userData))

    const { register, handleSubmit, setError, formState: { errors, isValid } } = useForm({
        defaultValues: {
            fullName: '',
            email: '',
            password: '',
        },
        mode: "onChange"
    });

    const onSubmit = async (values) => {
        const data = await dispatch(registerUser(values))
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
                    Создание аккаунта
                </Typography>
                <div className={styles.avatar}>
                    <Avatar sx={{ width: 100, height: 100 }} />
                </div>
                <TextField
                    {...register('fullName', { required: 'Необходимо указать полное имя' })}
                    error={Boolean(errors.email?.message)}
                    helperText={errors.email?.message}
                    className={styles.field}
                    label="Полное имя"
                    fullWidth />
                <TextField
                    {...register('email', { required: 'Необходимо указать полное email' })}
                    error={Boolean(errors.email?.message)}
                    helperText={errors.email?.message}
                    className={styles.field}
                    label="E-Mail"
                    fullWidth />
                <TextField
                    {...register('password', { required: 'Необходимо указать пароль' })}
                    error={Boolean(errors.email?.message)}
                    helperText={errors.email?.message}
                    className={styles.field}
                    label="Пароль"
                    fullWidth />
                <Button
                    type="submit"
                    size="large"
                    variant="contained"
                    fullWidth>
                    Зарегистрироваться
                </Button>
            </form>
        </Paper>
    </Animation>
  );
};
