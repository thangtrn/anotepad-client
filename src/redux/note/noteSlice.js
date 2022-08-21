import { createSlice } from '@reduxjs/toolkit';
import { fetchNotesApi, createNote, deleteNote, getNote, editNote } from './noteActions';


const noteSlice = createSlice({
    name: 'note',
    initialState: {
        notes: [],
        loading: false,
        error: ''
    },
    reducers: {

    },
    extraReducers: builder => {
        builder
        .addCase(fetchNotesApi.pending, (state)=> {
            state.loading = true;
            state.error = '';
        })
        .addCase(fetchNotesApi.fulfilled, (state, action)=> {
            state.loading = false;
            state.error = '';
            state.notes = action.payload;
        })
        .addCase(fetchNotesApi.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(createNote.pending, (state)=> {
            state.loading = true;
            state.error = '';
        })
        .addCase(createNote.fulfilled, (state, action)=> {
            state.loading = false;
            state.error = '';
            state.notes = [ ...state.notes, action.payload];
        })
        .addCase(createNote.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        //DELETE NOTE
        .addCase(deleteNote.pending, (state) => {
            state.loading = true;
            state.error = '';
        })
        .addCase(deleteNote.fulfilled, (state, action) => {
            state.notes = state.notes.filter(note => note._id !== action.payload);
            state.loading = false;
            state.error = '';
        })
        //GET A NOTE
        .addCase(getNote.pending, (state) => {
            state.loading = true;
            state.error = '';
        })
        .addCase(getNote.fulfilled, (state, action) => {
            state.notes = state.notes.filter(note => note._id !== action.payload);
            state.loading = false;
            state.error = '';
        })
        //EDIT NOTE
        .addCase(editNote.pending, (state) => {
            state.loading = true;
            state.error = '';
        })
        .addCase(editNote.fulfilled, (state) => {
            state.loading = false;
            state.error = '';
        })
    }
})

export default noteSlice.reducer;