import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const { data } = await axios.get('/posts');
    return data;
});

export const fetchPopular = createAsyncThunk(
    'popular/fetchPopular',
    async () => {
        const { data } = await axios.get('/popular');
        return data;
    },
);

export const fetchTags = createAsyncThunk('posts/fetchTags', async () => {
    const { data } = await axios.get('/tags');
    return data;
});

export const fetchRemovePosts = createAsyncThunk(
    'posts/fetchRemovePosts',
    async (id) => {
        await axios.delete(`/posts/${id}`);
    },
);

const initialState = {
    posts: {
        items: [],
        status: 'loading',
    },
    popular: {
        items: [],
        status: 'loading',
    },
    tags: {
        items: [],
        status: 'loading',
    },
};

const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchPosts.pending]: (state) => {
            state.posts.items = [];
            state.posts.status = 'loading';
        },
        [fetchPosts.fulfilled]: (state, action) => {
            state.posts.items = action.payload;
            state.posts.status = 'loaded';
        },
        [fetchPosts.rejected]: (state) => {
            state.posts.items = [];
            state.posts.status = 'error';
        },

        [fetchPopular.pending]: (state) => {
            state.popular.items = [];
            state.popular.status = 'loading';
        },
        [fetchPopular.fulfilled]: (state, action) => {
            state.popular.items = action.payload;
            state.popular.status = 'loaded';
        },
        [fetchPopular.rejected]: (state) => {
            state.popular.items = [];
            state.popular.status = 'error';
        },

        [fetchTags.pending]: (state) => {
            state.tags.items = [];
            state.tags.status = 'loading';
        },
        [fetchTags.fulfilled]: (state, action) => {
            state.tags.items = action.payload;
            state.tags.status = 'loaded';
        },
        [fetchTags.rejected]: (state) => {
            state.tags.items = [];
            state.tags.status = 'error';
        },

        [fetchRemovePosts.pending]: (state, action) => {
            state.posts.items = state.posts.items.filter(
                (obj) => obj._id !== action.meta.arg,
            );
        },
    },
});

export const postsReducer = postSlice.reducer;
