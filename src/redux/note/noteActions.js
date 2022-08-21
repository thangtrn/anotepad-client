import axiosClient from '../../api/axiosClient';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchNotesApi = createAsyncThunk('note/getnotes',async (_, {rejectWithValue, getState}) => {
    try {
        const state = getState();
        
        const response = await axiosClient.get('/api/notes', {
            headers: {
                'Authorization': `Bearer ${state.authReducer.auth.accessToken}`
            }
        });
        
        return response.data.data 
    } catch (error) {
        const message = (error.response.data.msg) || error.message;
        return rejectWithValue(message)
    }
})

export const createNote = createAsyncThunk('note/createnote', async (payload, {rejectWithValue})=>{
    const { noteData, navigate } = payload;
    try {
        const response = await axiosClient.post('/api/note', noteData);
        navigate(`/note/${response.data.data._id}`)
        return response.data.data
    } catch (error) {
        const message = (error.response.data.msg) || error.message;
        return rejectWithValue(message)
    }
})

export const deleteNote = createAsyncThunk('note/delete', async (payload, { getState }) => {
    const { _id: id, toast, navigate } = payload;  
    try {
        const state = getState();
        const response = await axiosClient.delete(`/api/note/${id}`, {
            headers: {
                'Authorization': `Bearer ${state.authReducer.auth.accessToken}`
            }
        })
        toast.success(response.data.msg);
        navigate('/');
        return response.data.note._id
    } catch (error) {
        const message = (error.response.data.msg) || error.message;
        toast.error(message);
    }
})

export const getNote = createAsyncThunk('note/getnote', async(payload) => {
    const { id, toast, setFormData } = payload;  
    try {
        const response = await axios.get(`/api/note/${id}`);
        const { title, content } = response.data;
        setFormData({title, content});
    } catch (error) {
        const message = (error.response.data.msg) || error.message;
        toast.error(message);
    }
})

export const editNote = createAsyncThunk('note/editnote', async(payload, {getState}) => {
    const { id, formData, toast } = payload;
    const state = getState();
    try {
        const response = await axiosClient.put(`/api/note/${id}`, formData, {
            headers: {
                'Authorization': `Bearer ${state.authReducer.auth.accessToken}`
            }
        })
        toast.success(response.data.msg);
    } catch (error) {
        console.log(error);
        const message = (error.response.data.msg) || error.message;
        toast.error(message);
    }
})
