import { createSlice } from '@reduxjs/toolkit';

//Situation to apply a test?
const searchTermSlice = createSlice({
    name: 'searchTerm',
    initialState: '',
    reducers: {
        editTerm: (state, action) => {
            return state = action.payload;
        }
    }
});

export const selectSearchTerm = (state) => state.searchTerm;

export const { editTerm } = searchTermSlice.actions;

export default searchTermSlice.reducer;