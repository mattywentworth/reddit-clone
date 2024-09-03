import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const apiTest = async () => {
    const feed = await fetch('https://www.reddit.com/r/popular.json');
    const data = await feed.json();
    return data;

}

const apiTestTwo = async () => {
    const feed = fetch('https://www.reddit.com/r/popular.json').then(res => res.json()).then(out => out);
    return feed;
}

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

const apiTestFour = () => { //Should consider using the url as an argument so that this function can be reused across the app

    fetch("https://www.reddit.com/r/popular.json")
    .then(r => r.json()).then((r) => {
        
        try{
            return r;
        } catch (error){console.log(error.message)}
        })
}

const fetchFeed = createAsyncThunk(
    'feed/fetchFeed',
    async () => {
        const response = await apiTestFour();
        const json = await response.json();
        return json;
    }
)


const feedSlice = createSlice({
    name: 'feed',
    initialState: {
        feedResults: [],
        isLoading: false,
        hasError: false
    }, //or should it be an array?
    extraReducers: {
        [feed.fetchFeed.pending]: (state, action) => {},
        [feed.fetchFeed.fulfilled]: {},
        [feed.fetchFeed.rejected]: {}
    }
})


//apiTestFour();