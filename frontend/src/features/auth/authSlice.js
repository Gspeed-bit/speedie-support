import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';

// createSlice used to create Redux "slices"
//createAsyncThunk create "thunks" that handle asynchronous actions in Redux

//get user from global storage

const user = JSON.parse(localStorage.getItem("user"))
const initialState = {
  user: user? user : null,
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
};


// Register a new user
export const register = createAsyncThunk(
  'auth/register', // action type for registering a user
  async (user, thunkAPI) => {
    // thunk function for user registration
    try {
      // attempt to register the user using the authService
       return await authService.register(user)
    } catch (error) {
      // catch any errors that occur during registration
      // construct a meaningful error message to return
      const message =
        (error.response && // if the error has a response
          error.response.data && // and the response has data
          error.response.data.message) || // use the message from the response data
        error.message || // otherwise, use the error message itself
        error.toString(); // or a string representation of the error
      // reject the thunk with the error message
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//login user
export const login = createAsyncThunk('auth/login', 
async (user, thunkAPI) => {
  // thunk function for user login
  try {
    // attempt to login the user using the authService
    return await authService.login(user);
  } catch (error) {
    // catch any errors that occur during login
    // construct a meaningful error message to return
    const message =
      (error.response && // if the error has a response
        error.response.data && // and the response has data
        error.response.data.message) || // use the message from the response data
      error.message || // otherwise, use the error message itself
      error.toString(); // or a string representation of the error
    // reject the thunk with the error message
    return thunkAPI.rejectWithValue(message);
  }
});


//logout user
export const logout = createAsyncThunk(
  'auth/logout',
  async () => {
   await authService.logout();
  }
);

//createSlice to
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    //reducers are functions that define how the state changes in response to actions
    // use to reset the state
    reset: (state) => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.message = '';
    
    },

  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user=null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user=null;
      })
    //  .addCase(forgotPassword.pending, (state) => {  
    //     state.isLoading = true;
    //   }
    // )
  },
});

export const {reset} = authSlice.actions
export default authSlice.reducer;