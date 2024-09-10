import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPopularSubs = createAsyncThunk(
    'panel/fetchFeed',
    async () => {
        const response = await fetch('https://www.reddit.com/subreddits/popular.json');
        const json = await response.json();
        return json.data.children;
    }
)

const panelSlice = createSlice({
    name: 'panel',
    initialState: {
        popularSubs: [],
        recentSubs: false,
        isLoading: false,
        hasError: false
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchPopularSubs.pending, (state) => {
            state.isLoading = true;
            state.hasError = false;
        })
        .addCase(fetchPopularSubs.fulfilled, (state, action) => {
            state.popularSubs = action.payload;
            state.isLoading = false;
            state.hasError = true;
        })
        .addCase(fetchPopularSubs.rejected, (state) => {
            state.isLoading = false;
            state.hasError = true;
        })
    }
});


export const selectPopularSubs = (state) => state.panel.popularSubs;

export const isLoading = (state) => state.panel.isLoading;

export default panelSlice.reducer;

//testFunc

/*
const testCall = async () => {
    const response = await fetch('https://www.reddit.com/subreddits/popular.json');
    const json = await response.json();
    console.log(json);
    return json;
}

console.log(testCall());
*/