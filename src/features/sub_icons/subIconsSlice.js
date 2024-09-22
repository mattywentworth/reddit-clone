import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const fetchIcons = createAsyncThunk(
    'subIcons/fetchIcons',
    async (testArray) => { //Arg will be an array? Within this func, .map the array with a fetch within each loop? Seems like a horrible
        //solution to get this done.
        //testArray will look like [url1, url2, url3, ...]
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
        icons: {},
        isLoading: false,
        hasError: false
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase()
    }
});