import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../services";

const initialState = {
    posts: {
        items: [],
        status: 'idle'
    },
    tags: {
        items: [],
        status: 'idle'
    },
};

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await instance.get('/posts');
    return response.data;
});

export const removePost = createAsyncThunk('posts/remove', async (id) => {
    const response = await instance.delete(`/posts/${id}`);
    return response.data;
});

export const fetchTags = createAsyncThunk('posts/fetchTags', async () => {
    const response = await instance.get('/tags');
    return response.data;
});


const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchPosts.pending, (state, action) => {
            state.posts.status = 'loading';
            state.posts.items = [];
        });
        builder.addCase(fetchPosts.fulfilled, (state, action) => {
            state.posts.status = 'loaded';
            state.posts.items = action.payload;
        });
        builder.addCase(fetchPosts.rejected, (state, action) => {
            state.posts.status = 'error';
            state.posts.items = [];
        });
        builder.addCase(fetchTags.pending, (state, action) => {
            state.tags.status = 'loading';
            state.tags.items = [];
        });
        builder.addCase(fetchTags.fulfilled, (state, action) => {
            state.tags.status = 'loaded';
            state.tags.items = action.payload;
        });
        builder.addCase(fetchTags.rejected, (state, action) => {
            state.tags.status = 'error';
            state.tags.items = [];
        });
        builder.addCase(removePost.fulfilled, (state, action) => {
            state.posts.items = state.posts.items.filter((post) => post._id !== action.meta.arg)
        });
    }
});

export const postsReducer = postsSlice.reducer;