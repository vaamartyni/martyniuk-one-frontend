import React, {useEffect, useState} from "react";
import { useParams } from 'react-router-dom';
import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import instance from "../services";
import Animation from "../components/Animation";
import ReactMarkdown from "react-markdown";

export const FullPost = () => {
    const { id } = useParams();
    const [state, setState] = useState();
    const [loading, setLoading] = useState(true);
    useEffect( ()=>{
        setLoading(true)
        instance.get(`/posts/${id}`).then((res)=> {
            setState(res.data)
            setLoading(false)
        }).catch((err)=>{
            setState(null)
            setLoading(false)
            console.log(err)
            alert('An error occurred while getting data from server')
        })
    },[id])
    console.log(state)
  return (
    <Animation>
        {loading ? <Post isLoading isFullPost /> : <Post
            id={state._id}
            title={state.title}
            imageUrl={state.imageUrl && `http://localhost:4444${state.imageUrl}`}
            user={state.user}
            createdAt={state.createdAt}
            viewsCount={state.viewsCount}
            commentsCount={3}
            tags={state.tags}
            isFullPost
        >
            <ReactMarkdown>{state.text}</ReactMarkdown>
        </Post>}
      {/*<CommentsBlock*/}
      {/*  items={[*/}
      {/*    {*/}
      {/*      user: {*/}
      {/*        fullName: "Вася Пупкин",*/}
      {/*        avatarUrl: "https://mui.com/static/images/avatar/1.jpg",*/}
      {/*      },*/}
      {/*      text: "Это тестовый комментарий 555555",*/}
      {/*    },*/}
      {/*    {*/}
      {/*      user: {*/}
      {/*        fullName: "Иван Иванов",*/}
      {/*        avatarUrl: "https://mui.com/static/images/avatar/2.jpg",*/}
      {/*      },*/}
      {/*      text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",*/}
      {/*    },*/}
      {/*  ]}*/}
      {/*  isLoading={false}*/}
      {/*>*/}
      {/*  <Index />*/}
      {/*</CommentsBlock>*/}
    </Animation>
  );
};
