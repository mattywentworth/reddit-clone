import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
//import { selectFeed } from '../feed/FeedSlice';
import { useSelector } from 'react-redux';

//Fetching and updating state with comment arrays...
///Access the state array of feed posts - THIS IS IMPORTANT - needs to be performed at this level so that each post can be iterated on rather than just the comments within a post
///map through the array, first constructing a link for each loop to access comments
///for each loop, push the comments to the object in commentsByPost that match the id of the post

//New plan - come up with a way to dispatch the action only when someone clicks each post to expose the comments instead of adding all comments to state on the initial page load
/*
New process:
1. ***Will this cause an undesired re-render??*** In each feedTile, include an attribute that is the constructed url to each post ('reddit.com/${permalink}${dotJson})
2. Write an onClick event handler that follows a process something like:
    1. dispatch an action that fetches the .json url for that particular post (the url containing comment info).
        This action will take the .json url as the argument
    2. The corresponding extraReducer will take the returned value (the json page of comments) and push all the top level
        comments into the commentsByPost.comments array
    3. The event handler will then populate a corresponding component or JSX with the comment info just added to state
    4. The event handler will then change the css display value from none to block?
    5. Will need to add conditional logic that doesn't run the event handler in the case that state already exists for 
        comments for that post? First, see what performance is like to not add this. Functionally it could be better to
        be able to fetch new comments without refreshing the page.
*/
//const feedPosts = useSelector(selectFeed);
/*const constructCommentUrl = (postDetails) => {
    const postUrlExtension = postDetails.data.permalink;
    
    const baseUrl = 'reddit.com';
    const dotJson = '.json';

    const jsonUrl = baseUrl + postUrlExtension + dotJson;

    return jsonUrl;
}*/

//INVESTIGATE - still have no idea why the fetch isn't working
export const fetchComments = createAsyncThunk(
    'comments/fetchComments',
    async ({postId, postUrl} /*{ fulfillWithValue }*/) => {
        const response = await fetch(postUrl);
        const json = await response.json();
        const hugeCommentsArray = json[1].data.children;
        const topLevelCommentsArray = [];
        /*hugeCommentsArray.map((hugeCommentObject) => {
            const topLevelComment = hugeCommentObject.data.body;
            topLevelCommentsArray.push(topLevelComment);
        });*/
        
        for (let i = 0; i < 20; i++) {
            //alert(topLevelCommentsArray[0]);
            let topLevelComment = hugeCommentsArray[i].data.body;
            topLevelCommentsArray.push(topLevelComment);
        }
        //alert(json[1].data.children[0].data.body);
        const testObject = {
            postId: postId,
            comments: topLevelCommentsArray //rouote to coomments array: json[1].data.children.data.replies.data.children
        };
        //alert(testObject.postIdTest);
        //alert(testObject.comments);
        return testObject;
        })
        
        /*const response = await fetch(commentUrl);
        const json = response.json();
        const commentsObjectsToLoop = json[1].data.children //This produces an array. The comment values of each element in the
        //array can be accessed by commentsObjectsToLoop.data.body
        return commentsObjectsToLoop;*/
    /*}
)*/

const commentsSlice = createSlice({
    name: 'comments',
    initialState: {
        commentsByPost: {
            one: 'one' //This seems sloppy, but the extraReducer wasn't working without having an key/value pair already in the commentsByPost object
        },// [],
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
                state.commentsByPost[post.data.id] = {url: jsonUrl, comments: null};
                //state.commentsByPost.push({[post.data.id]: {url: jsonUrl, comments: []}});
                //state.commentsByPost = action.payload;
            })
        },
        addPostUrl: (state, action) => {
            //I want this action to take as an object args the post id and the permalink.
            //then it will construct the post json url
            const baseUrl = 'reddit.com';
            const postUrl = action.payload.postPermalink;
            const dotJson = '.json';
            const jsonUrl = baseUrl + postUrl + dotJson;
            state.commentsByPost[action.payload.postId] = {postUrl: jsonUrl, comments: null};
        },
        addCommentsForEachPost: (state, action) => {
            state.commentsByPost.comments = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchComments.pending, (state) => {
            state.isLoading = true;
            state.hasError = false
        })
        .addCase(fetchComments.fulfilled, (state, action) => {
            //need to iterate over the array generated by the payload and update commentsByPost accordingly
            //action.payload.map(())
            //const id = action.payload.postIdTest;
            //const idString = id.toString();
            //const comments = action.payload.comments;
            const test = '3xy57';
            const {postId, comments} = action.payload;
            //state.commentsByPost[idString] = comments; {/*}.comments*/}
            state.commentsByPost[postId] = comments; //action.payload.comments;
            state.isLoading = false;
            state.hasError = false;
        })
        .addCase(fetchComments.rejected, (state) => {
            state.isLoading = false;
            state.hasError = true;
        })
    }
})
//})

export const { addPostUrls, addCommentsForEachPost, addPostUrl } = commentsSlice.actions; //Not sure if this is correct, haven't checked against Codecad lesson

export const selectCommentsByPost = (state) => state.comments.commentsByPost;

export const selectIsLoading = (state) => state.comments.isLoading;

export const selectHasError = (state) => state.comments.hasError;

export default commentsSlice.reducer;


const testFetch = async () => {
    const response = await fetch('https://www.reddit.com/r/popular.json'); //https://www.reddit.com/r/climbing/.json
    const json = await response.json();
    return json;
    /*fetch('https://www.reddit.com/r/popular.json').then(r => r.json()).then(r => {
        try {
            return r;
        } catch (error) {
            return error.message;
        }
    })*/
}

//console.log(testFetch());

/*
const testCall = async () => {
    const response = await fetch('https://www.reddit.com/r/climbing/comments/1fjnmxy/good_whipper_while_clipping_the_anchor/.json');
    const json = await response.json();
    //console.log(json);
    return json;
}

console.log(await testCall());
*/