import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import axiosClient from '../../api/axiosClient';

export const fetchAuthLogin = createAsyncThunk('auth/login', async (authInfo, { rejectWithValue }) => {
    try {
        const response = await axios.post('/api/auth/login', authInfo);
        return {...response.data.user, accessToken: response.data.accessToken};
    } catch (error) {
        const message = (error.response.data.msg) || error.message;
        return rejectWithValue(message)
    }
})

export const fetchAuthRegister = createAsyncThunk('auth/register', async(payload) => {
    const { userData, toast, navigate } = payload;
    try {
        const response = await axios.post('/api/auth/register', userData);
        toast.success(response.data.msg);
        navigate('/login');
    } catch (error) {
        const message = (error.response.data.msg) || error.message;
        toast.error(message);
    }
})

export const logout = createAsyncThunk('auth/logout', async (payload, { rejectWithValue, getState }) => {
    try {
        const state = getState();
        const { toast, navigate } = payload;
        const response = await axiosClient.post('/api/auth/logout', {_id: state.authReducer.auth._id}, {
            headers: {
                'Authorization': `Bearer ${state.authReducer.auth.accessToken}`
            }
        })
        toast.success(response.data.msg)
        navigate('/login');
    } catch (error) {
        const message = (error.response.data.msg) || error.message;
        return rejectWithValue(message)
    }
})

export const forgotPassword = createAsyncThunk('auth/forgotpassword', async (payload) => {
    const { userData, toast, navigate } = payload;
    try {
        const response = await axios.post('/api/auth/forgot_password', userData);
        toast.success(response.data.msg);
        navigate('/login');
    } catch (error) {
        const message = (error.response.data.msg) || error.message;
        toast.error(message);
    }
})