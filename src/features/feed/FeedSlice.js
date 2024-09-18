import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { selectSearchTerm } from '../search/searchTermSlice';

/*const apiTest = async () => {
    const feed = await fetch('https://www.reddit.com/r/popular.json');
    const data = await feed.json();
    return data;

}

const apiTestTwo = async () => {
    const feed = fetch('https://www.reddit.com/r/popular.json').then(res => res.json()).then(out => out);
    return feed;
}
*/

/*const apiTestThree = (path, success, error) => {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readystate === 4) {
            if (xhr.status === 200) {
                success(JSON.parse(xhr.responseText));
            }
            else {
                error(xhr);
            }
        }
    };
    xhr.open('GET', path, true);
    xhr.send();
}


const myData = (Data) => {
    console.log(Data);
}

apiTestThree('https://www.reddit.com/r/popular.json', myData, 'jsonp');
*/
/*
const apiTestFour = async () => { //Should consider using the url as an argument so that this function can be reused across the app

    fetch("https://www.reddit.com/r/popular.json")
    .then(r => r.json()).then((r) => {
        
        try{
            return r;
            //console.log(r);
        } catch (error){console.log(error.message)}
        })
}

const fetchFeed = createAsyncThunk(
    'feed/fetchFeed',
    async () => {
        const response = await apiTestFour();
        //const json = await response.json();
        //return json;
        return response;
    }
)
*/

export const fetchFeed = createAsyncThunk('feed/fetchFeed',
    async () => {
        const response = await fetch('https://www.reddit.com/r/popular.json');
        
        const json = await response.json();
        const testData = json.data.children;
        //alert(testData);
        return testData;
    }
)


const feedSlice = createSlice({
    name: 'feed',
    initialState: {
        feedResults: [],//[]
        isLoading: false,
    }, //or should it be an array?
    reducers: {},
    extraReducers: (builder) => {
        builder.
            addCase(fetchFeed.pending, (state) => {
                state.isLoading = true;
                state.hasError = false;
            })
            .addCase(fetchFeed.fulfilled, (state, action) => {
                //state.feedResults = action.payload;
                state.feedResults = action.payload //.push(action.payload); Initially I was unnecessarily nesting an array as a single element array in another array
                state.isLoading = false;
                state.hasError = false;
            })
            .addCase(fetchFeed.rejected, (state) => {
                state.isLoading = false;
                state.hasError = true;
            })
    }
    /*extraReducers: {
        [fetchFeed.pending]: (state, action) => {
            state.isLoading = true;
            state.hasError = false;
        },
        [fetchFeed.fulfilled]: (state, action) => {
            state.feedResults.push(action.payload); //not sure yet if this is what i want to do
            state.isLoading = false;
            state.hasError = false;
        },
        [fetchFeed.rejected]: (state, action) => {
            state.isLoading = false;
            state.hasError = true;
        }
    }*/
})

export const isLoading = (state) => {
    return state.feed.isLoading;
}

export const selectFeed = (state) => {
    return state.feed.feedResults;
}

export const selectError = (state) => {
    return state.feed.hasError;
}


//const searchTerm = useSelector(selectSearchTerm);
//const feed = useSelector(selectFeed);


export const selectSearchedFeedResults = (state) => {
    const searchTerm = selectSearchTerm(state);
    const feedResults = selectFeed(state);
    
    return feedResults.filter(feedResult => feedResult.data.title.toLowerCase().includes(searchTerm.toLowerCase()) || feedResult.data.selftext.toLowerCase().includes(searchTerm.toLowerCase()));
}


//export const {fetchFeed.pending, fetchFeed.fulfilled, fetchFeed.rejected} = feedSlice.actions; this is either unnecessary with extraReducers or congured incorrectly

export default feedSlice.reducer;


//apiTestFour();