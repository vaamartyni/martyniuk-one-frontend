import React, {useEffect, useRef, useState} from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';

import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';
import Animation from "../../components/Animation";
import {Navigate, useLocation, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import FilePresentIcon from '@mui/icons-material/FilePresent';
import instance from "../../services";
import Typography from "@mui/material/Typography";


export const AddPost = () => {
  const uploadFileRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const [title, setTitle] = React.useState('');
  const [imageUrl, setImageUrl] = React.useState('');
  const [tags, setTags] = React.useState(null);
  const [text, setText] = React.useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
      const id = setTimeout(()=>{
          setSuccess(false)
      },3000)
      return () => {clearTimeout(id)}
  },[success])

    useEffect(()=>{
        if (location.state && location.state.editMode){
            const { postId } = location.state
            const getData = async () => {
                const { data } = await instance.get(`/posts/${postId}`)
                return data
            }
            try {
                getData()
                    .then((res) => {
                        setTitle(res.title)
                        setText(res.text)
                        setTags(res.tags)
                        setImageUrl(res.imageUrl)
                    })
            } catch (e) {
                console.log(e)
            }

        }
    },[location])

  const isAuth = useSelector((state) => Boolean(state.auth.userData))

  const handleChangeFile = async (event) => {
        try {
            const formData = new FormData();
            const file = event.target.files[0];
            formData.append('image', file)
            instance.post('/upload', formData)
                .then((res)=>{
                if (res.data.url){
                    setSuccess(true)
                    setImageUrl(res.data.url)
                }
            })
        } catch (e) {
            console.log(e)
        }
  };

  const onClickRemoveImage = () => {
      setImageUrl('');
  };

  const onSubmit = async () => {
      const fields = {
          title,
          imageUrl,
          text,
          tags
      }
      if (location.state && location.state.editMode) {
          const { postId } = location.state
          try {
              const { data } = await instance.patch(`/posts/${postId}`, fields)
              navigate(`/posts/${postId}`)
          } catch (e) {

          }
      } else {
          try {
              setLoading(true);
              const { data } = await instance.post('/posts',fields)
              navigate(`/posts/${data._id}`)
          } catch (e) {
              alert('An error has occurred while creating new post. Check log for more details.')
          }
      }
;  }

  const onChange = React.useCallback((value) => {
    setText(value);
  }, []);

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Введите текст...',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    [],
  );

    if (!isAuth){
        return <Navigate to="/login" state={{unAuthAddAttempt: true}} />
    }

  return (
      <Animation>
          <Paper style={{ padding: 30 }}>
              <div style={{gap: '20px',
                  display: 'flex',
                  alignItems: 'center',
              }}>
                  <Button variant="text" onClick={() => uploadFileRef.current.click()} size="large"  endIcon={<FilePresentIcon />}>
                      Загрузить превью
                  </Button>
                  {success && <Animation>
                      <Typography sx={{color: '#0d8511'}} variant="subtitle1" gutterBottom>
                          Файл успешно загружен на сервер
                      </Typography>
                  </Animation>}
              </div>
              <input ref={uploadFileRef} type="file" onChange={handleChangeFile} hidden />
              {imageUrl && (
                  <>
                      <Button variant="text" color="error" onClick={onClickRemoveImage}>
                          Удалить
                      </Button>
                      <img className={styles.image} src={${process.env.REACT_APP_API}}${imageUrl}`} alt="Uploaded" />
                  </>
              )}
              <br />
              <br />
              <TextField
                  classes={{ root: styles.title }}
                  variant="standard"
                  placeholder="Заголовок статьи..."
                  value={title}
                  onChange={(e)=>setTitle(e.currentTarget.value)}
                  fullWidth
              />
              <TextField classes={{ root: styles.tags }} value={tags} onChange={(e)=>setTags(e.currentTarget.value)} variant="standard" placeholder="Тэги" fullWidth />
              <SimpleMDE className={styles.editor} value={text} onChange={onChange} options={options} />
              <div className={styles.buttons}>
                  <Button onClick={onSubmit} size="large" variant="contained">
                      {(location.state && location.state.editMode) ? 'Сохранить изменения' :  'Опубликовать'}
                  </Button>
                  <a href="/">
                      <Button size="large">Отмена</Button>
                  </a>
              </div>
          </Paper>
      </Animation>
  );
};
