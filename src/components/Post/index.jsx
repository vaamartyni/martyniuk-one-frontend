import React, {useState} from 'react';
import clsx from 'clsx';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import EyeIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import CommentIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';

import styles from './Post.module.scss';
import { UserInfo } from '../UserInfo';
import { PostSkeleton } from './Skeleton';
import {Link} from "react-router-dom";
import Modal from "../Modal";
import {useDispatch} from "react-redux";
import {removePost} from "../../store/slices/postsSlice";
import Animation from "../Animation";

export const Post = ({
  _id,
  title,
  createdAt,
  imageUrl,
  user,
  viewsCount,
  commentsCount,
  tags,
  children,
  isFullPost,
  isLoading,
  isEditable,
}) => {
  const dispatch = useDispatch();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  if (isLoading) {
    return <PostSkeleton />;
  }

  const onClickRemove = () => {
    dispatch(removePost(_id))
  };

  return (
      // <Animation>
        <div className={clsx(styles.root, { [styles.rootFull]: isFullPost })}>
      {isEditable && (
        <div className={styles.editButtons}>
          <Link to={`/posts/${_id}/edit`} state={{editMode: true, postId: _id}}>
            <IconButton color="primary">
              <EditIcon />
            </IconButton>
          </Link>
          <IconButton onClick={()=>setModalIsOpen(true)} color="primary">
            <DeleteIcon />
          </IconButton>
        </div>
      )}
      {imageUrl && (
        <img
          className={clsx(styles.image, { [styles.imageFull]: isFullPost })}
          src={imageUrl}
          alt={title}
        />
      )}
      <div className={styles.wrapper}>
        <UserInfo {...user} additionalText={createdAt} />
        <div className={styles.indention}>
          <h2 className={clsx(styles.title, { [styles.titleFull]: isFullPost })}>
            {isFullPost ? title : <Link to={`/posts/${_id}`}>{title}</Link>}
          </h2>
          <ul className={styles.tags}>
            {tags && tags.length > 0 && tags.map((name) => (
              <li key={name}>
                <Link to={`/tag/${name}`}>#{name}</Link>
              </li>
            ))}
          </ul>
          {children && <div className={styles.content}>{children}</div>}
          <ul className={styles.postDetails}>
            <li>
              <EyeIcon />
              <span>{viewsCount}</span>
            </li>
            {/*<li>*/}
            {/*  <CommentIcon />*/}
            {/*  <span>{commentsCount}</span>*/}
            {/*</li>*/}
          </ul>
        </div>
      </div>
      <Modal handleClose={()=>setModalIsOpen(false)} title={"Удалить запись ?"} cancelTitle={"Отмена"} confirmTitle={"Удалить"} handleConfirmAction={onClickRemove} isOpen={modalIsOpen} />
    </div>
      // </Animation>
  );
};
