import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import instance from "../../services";

const initialState = {
    userData: null,
    status: "loading",
}

export const loginUser = createAsyncThunk('auth/loginUser', async (params) => {
    const { data } = await instance.post('/auth/login', params);
    return data;
});

export const registerUser = createAsyncThunk('auth/registerUser', async (params) => {
    const { data } = await instance.post('/auth/register', params);
    return data;
});

export const authMe = createAsyncThunk('auth/me', async (params) => {
    const { data } = await instance.get('/auth/me', params);
    return data;
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logOutUser: (state) => {
            state.userData = null;
            window.localStorage.removeItem('token');
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginUser.pending, (state, action) => {
            state.status = "loading";
        });
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.status = "loaded";
            state.userData = action.payload
        });
        builder.addCase(loginUser.rejected, (state, action) => {
            state.status = "error";
            state.userData = null;
        });
        builder.addCase(authMe.pending, (state, action) => {
            state.status = "loading";
        });
        builder.addCase(authMe.fulfilled, (state, action) => {
            state.status = "loaded";
            state.userData = action.payload
        });
        builder.addCase(authMe.rejected, (state, action) => {
            state.status = "error";
            state.userData = null;
        });
        builder.addCase(registerUser.pending, (state, action) => {
            state.status = "loading";
        });
        builder.addCase(registerUser.fulfilled, (state, action) => {
            state.status = "loaded";
            state.userData = action.payload
        });
        builder.addCase(registerUser.rejected, (state, action) => {
            state.status = "error";
            state.userData = null;
        });
    }
})

export const authReducer = authSlice.reducer;
export const { logOutUser } = authSlice.actions;