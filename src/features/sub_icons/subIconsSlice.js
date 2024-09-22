import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchIcons = createAsyncThunk(
    'subIcons/fetchIcons',
    async (testArray) => { //Arg will be an array? Within this func, .map the array with a fetch within each loop? Seems like a horrible
        //solution to get this done.
        //testArray will look like [url1, url2, url3, ...]
        alert(testArray[0].subUrl);
        let testArrayTwo = [];
        testArray.map(async subAboutUrl => {
            const response = await fetch(subAboutUrl);
            const json = response.json();
            const subIcon = json.data.icon_img;
            const idAndIcon = {[json.data.id]: subIcon};
            testArrayTwo.push(idAndIcon);
        });
        return testArrayTwo;
    }
);


const subIconsSlice = createSlice({
    name: 'subIcons',
    initialState: {
        icons: [],
        isLoading: false,
        hasError: false
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase('fetchFeed/pending', (state) => {
            state.isLoading = true;
            state.hasError = false;
        })
        .addCase('fetchFeed/fulfilled', (state, action) => {
            state.icons = action.payload; //action.payload is already an array
            state.isLoading = false;
            state.hasError = false;
        })
        .addCase('fetchIcons/rejected', (state) => {
            state.isLoading = false;
            state.hasError = true;
        })
    }
});

export const iconsSelector = (state) => {
    return state.subIcons.icons;
}

export const loadingIcons = (state) => {
    return state.subIcons.isLoading;
}

export const errorIcons = (state) => {
    return state.subIcons.hasError;
}

export default subIconsSlice.reducer;