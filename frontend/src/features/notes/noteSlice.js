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

// Async thunk for creating a new note
export const getNotes = createAsyncThunk(
  'notes/getAll', // Action type for creating a ticket
  async (ticketId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      // Attempt to create the ticket using the ticketService
      return await noteService.getNotes(ticketId, token);
    } catch (error) {
      // Construct a meaningful error message
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      // Reject the thunk with the error message
      return thunkAPI.rejectWithValue(message);
    }
  }
);


// Slice for the ticket
export const noteSlice = createSlice({
  name: 'note',
  initialState,
  reducers: {
    // Reducer to reset the state
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
     builder
       .addCase(getNotes.pending, (state) => {
         state.isLoading = true;
       })
       .addCase(getNotes.fulfilled, (state, action) => {
         state.isLoading = false;
         state.isSuccess = true;
         state.notes = action.payload;
       })
       .addCase(getNotes.rejected, (state, action) => {
         state.isLoading = false;
         state.isError = true;
         state.message = action.payload;
       });
     
  },
});

export const { reset } = noteSlice.actions;
export default noteSlice.reducer;
