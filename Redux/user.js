import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState:{searchWord:{}},
    reducers:{
        search: (state,action) => {
            state.searchWord = action.payload.searchWord
        },
    }
})
export const {search} = userSlice.actions;
export default userSlice.reducer;

