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
        popularSubs: [],//Can change this to ['Popular Subs'] and then use .push to add the fetched value as the second 
        //element of the array. Then can select the first element of the array to be the title of the panel section
        recentSubs: false,//Mimic comment above
        isLoading: false,
        hasError: false,
        test: [1, 2, 3]
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchPopularSubs.pending, (state) => {
            state.isLoading = true;
            state.hasError = false;
        })
        .addCase(fetchPopularSubs.fulfilled, (state, action) => {
            state.popularSubs = ['Popular Subs', action.payload];//This is probably a sloppy way to do it. Make the initial state an object with first key/value 'name: 'Popular Subs', popularSubs: []'?
            state.isLoading = false;
            state.hasError = false;
        })
        .addCase(fetchPopularSubs.rejected, (state) => {
            state.isLoading = false;
            state.hasError = true;
        })
    }
});


export const selectPopularSubs = (state) => state.panel.popularSubs;

export const isLoading = (state) => state.panel.isLoading;

export const hasError = (state) => state.panel.hasError;

export const selectTest = (state) => state.panel.test;

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