import {createSlice,  createAsyncThunk} from "@reduxjs/toolkit"

// createSlice used to create Redux "slices"
//createAsyncThunk create "thunks" that handle asynchronous actions in Redux
const initialState ={
  user:null,
  isError:false,
  isLoading:false,
  isSuccess:false,
  message:""
}
// Register a new user 
export const register = createAsyncThunk(
  'auth/register',
  async (user, { rejectWithValue }) => {
    // try {
    //   const response = await fetch('http://localhost:4000/api/users', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(user),
    //   })
    //   const data = await response.json()
    //   if (response.ok) {
    //     return data
    //   }
    //   return rejectWithValue(data.message)
    // } catch (error) {
    //   return rejectWithValue(error.message)
    // }
    console.log(user)
  }
)
//createSlice to 
export const authSlice = createSlice({
  name:"auth",
  initialState,
  reducers:{
    // loginStart:(state)=>{
    //   state.isLoading = true
    // },
    // loginSuccess:(state, action)=>{
    //   state.isLoading = false
    //   state.isSuccess = true
    //   state.user = action.payload
    // },
    // loginFail:(state, action)=>{
    //   state.isLoading = false
    //   state.isError = true
    //   state.message = action.payload
    // }
  },
  extraReducers:(builder)=>{
    // [login.pending]:(state)=>{
    //   state.isLoading = true
    // },
    // [login.fulfilled]:(state, action)=>{
    //   state.isLoading = false
    //   state.isSuccess = true
    //   state.user = action.payload
    // },
    // [login.rejected]:(state, action)=>{
    //   state.isLoading = false
    //   state.isError = true
    //   state.message = action.payload
    // }
  }
})

export default authSlice.reducer
