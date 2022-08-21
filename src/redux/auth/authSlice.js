import { createSlice } from '@reduxjs/toolkit';
import { fetchAuthLogin, fetchAuthRegister,logout, forgotPassword } from './authActions';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        auth: null,
        loading: false,
        error: ''
    },
    reducers: {
    },
    extraReducers: builder => {
        builder
        // LOGIN
        .addCase(fetchAuthLogin.pending, (state) => {
            state.loading = true;
            state.error = '';
        })
        .addCase(fetchAuthLogin.fulfilled, (state, action)=> {
            state.auth = action.payload;
            state.loading = false;
            state.error = '';
        })
        .addCase(fetchAuthLogin.rejected, (state, action)=> {
            state.loading = false;
            state.error = action.payload;
        })
        //LOGOUT
        .addCase(logout.pending, (state) => {
            state.loading = true;
            state.error = '';
        })
        .addCase(logout.fulfilled, (state)=> {
            state.auth = null;
            state.loading = false;
            state.error = '';
        })
        .addCase(logout.rejected, (state, action)=> {
            state.loading = false;
            state.error = action.payload;
        })
        // REGISTER
        .addCase(fetchAuthRegister.pending, (state) => {
            state.loading = true;
            state.error = '';
        })
        .addCase(fetchAuthRegister.fulfilled, (state) => {
            state.loading = false;
            state.error = '';
        })
        // FORGOT PASSWORD
        .addCase(forgotPassword.pending, (state) => {
            state.loading = true;
            state.error = '';
        })
        .addCase(forgotPassword.fulfilled, (state) => {
            state.loading = false;
            state.error = '';
        })
        
    }
})

export default authSlice.reducer;