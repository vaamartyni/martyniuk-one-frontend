import React, {useEffect} from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';

import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, fetchTags } from "../store/slices/postsSlice";
import Animation from "../components/Animation";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {Link} from "react-router-dom";

export const Home = () => {
    const dispatch = useDispatch();
    const { posts, tags } = useSelector((state) => state.posts)
    const { userData } = useSelector((state) => state.auth)
    const isPostsLoading = posts.status === "loading";
    const isTagsLoading = tags.status === "loading";

    useEffect(()=>{
        dispatch(fetchPosts())
        dispatch(fetchTags())
    },[])
  return (
    <Animation>
      {/*<Tabs style={{ marginBottom: 15 }} value={0} aria-label="basic tabs example">*/}
      {/*  <Tab label="Лента" />*/}
      {/*  <Tab label="Популярные" />*/}
      {/*</Tabs>*/}
      <Grid
          container
          flexDirection="row"
          spacing={1}
      >
          {(isPostsLoading ? [...Array(5)] : posts.items).map((post) => (
              isPostsLoading ? <Grid xs={4} item><Post isLoading /></Grid> :
                  (<Grid xs={4} item>
                      <Post
              _id={post._id}
              title={post.title}
              imageUrl={post.imageUrl && `${process.env.REACT_APP_API}${post.imageUrl}`}
              user={post.user}
              createdAt={post.createdAt}
              viewsCount={post.viewsCount}
              commentsCount={3}
              tags={post.tags}
              isLoading={isPostsLoading}
              isEditable={post.user._id === userData?._id}
            /></Grid>)
          ))}
          {posts.items && !posts.items.length &&
              <div
                  style={{
                      display: 'flex',
                      flexDirection: 'column',
                      height: '400px',
                      alignItems: 'center',
                      justifyContent: 'center',
                  }}
              >
                  <Typography variant="h4" gutterBottom>Кажется здесь ничего нет</Typography>
                  <Link style={{textDecoration: "none"}} to="/create">
                      <Button variant="text">Написать статью</Button>
                  </Link>
              </div>
          }
        {/*<Grid xs={4} item>*/}
        {/*  <TagsBlock items={isTagsLoading ? [''] : tags.items} isLoading={isTagsLoading} />*/}
        {/*  <CommentsBlock*/}
        {/*    items={[*/}
        {/*      {*/}
        {/*        user: {*/}
        {/*          fullName: 'Test user',*/}
        {/*          avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',*/}
        {/*        },*/}
        {/*        text: 'Это тестовый комментарий',*/}
        {/*      },*/}
        {/*      {*/}
        {/*        user: {*/}
        {/*          fullName: 'Test Admin',*/}
        {/*          avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',*/}
        {/*        },*/}
        {/*        text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',*/}
        {/*      },*/}
        {/*    ]}*/}
        {/*    isLoading={false}*/}
        {/*  />*/}
        {/*</Grid>*/}
      </Grid>
    </Animation>
  );
};
