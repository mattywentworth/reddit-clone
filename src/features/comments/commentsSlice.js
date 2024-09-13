import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


const fetchComments = createAsyncThunk(
    'comments/fetchComments',
    async () => {
        const response = await fetch();
    }
)

const commentsSlice = createSlice({
    name: 'comments',
    initialState: {
        commentsByPost: [],
        isLoading: false,
        hasError: false
    },
    reducers: {
        addPostUrls: (state, action) => { //I want this to create objects in the commentsByPost state valuewhich will contain
            //the url for each post loaded in the initial post state (***which will be the payload here for this action creator***)
            //Then I will need to have an async thunk(?) that fetches comments on each post and updates the commentsByPost state???
            action.payload.map(post => {
                
                const baseUrl = 'reddit.com';
                const postUrl = post.data.permalink;
                const dotJson = '.json';
                const jsonUrl = baseUrl + postUrl + dotJson;

                state.commentsByPost.push({url: jsonUrl, comments: []});
                //state.commentsByPost = action.payload;
            })
        }
    }})//,
    //extraReducers: {}
//})

export const { addPostUrls } = commentsSlice.actions; //Not sure if this is correct, haven't checked against Codecad lesson

export const selectCommentsByPost = (state) => state.comments.commentsByPost;

export const selectIsLoading = (state) => state.comments.isLoading;

export const selectHasError = (state) => state.comments.hasError;

export default commentsSlice.reducer;