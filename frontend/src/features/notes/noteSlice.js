import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import noteService from './noteService';

// Initial state for the note slice
const initialState = {
  notes: [], // List of multiple notes
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
};




// Slice for the ticket
export const noteSlice = createSlice({
  name: 'note',
  initialState,
  reducers: {
    // Reducer to reset the state
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    
     
  },
});

export const { reset } = noteSlice.actions;
export default noteSlice.reducer;
