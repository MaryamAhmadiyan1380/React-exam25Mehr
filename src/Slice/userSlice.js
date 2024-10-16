import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    username : ''
}
const userSlice = createSlice({
    name :"user",
    initialState,
    reducers:{
        setUserName :(state , action) => {
            state.username = action.payload;
        } , 
        clearUserName : (state) => {
            state.username = ''
        }
        }
    }
)
export const {setUserName , clearUserName} = userSlice.actions;
export default userSlice.reducer;