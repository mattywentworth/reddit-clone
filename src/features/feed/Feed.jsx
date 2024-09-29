import React, { useEffect } from 'react';
import styles from './Feed.module.css';
import { FeedTile } from './FeedTile';
import { InspirationSection } from '../inspiration/InspirationSection';
import { useSelector, useDispatch } from 'react-redux';
import { selectFeed, isLoading, fetchFeed, selectError, selectSearchedFeedResults } from './feedSlice';
import { addPostUrls } from '../comments/commentsSlice.js';
import { selectSearchTerm } from '../search/searchTermSlice';

export const Feed = () => {
    
    const dispatch = useDispatch();

    const feedResults = useSelector(selectFeed);
    const isLoadingFeed = useSelector(isLoading);
    const hasError = useSelector(selectError);
    const searchedFeedResults = useSelector(selectSearchedFeedResults);
    const searchTerm = useSelector(selectSearchTerm);
    

    useEffect(() => {
        dispatch(fetchFeed('https://www.reddit.com/r/popular.json')); //https://www.reddit.com/r/NoStupidQuestions.json
        //dispatch(addPostUrls(feedResults));
        /*if (feedResults) { //This worked until I added the post id to the commentsSlice state
            dispatch(addPostUrls(feedResults));
        }*/
    }, [dispatch]);

    
    //INVESTIGATE!! This is functioning, but do you need to use useEffect? Probably not, but I haven't figured out how to not use it yet.
    //Also decided to write the conditional in the first useEffect, and it's not working the way I want it to, so I commented it out and am using the second useEffect again.
    /*
    useEffect(() => {
        dispatch(addPostUrls(feedResults));
    }, [feedResults]);
    */

    //const dataTest = feedResults[0].data.after;
    
    //Change the loading image to an error image and find a better loading image. The reddit expletive guy makes more sense for an error
    if (isLoadingFeed || feedResults.length === 0) {
        return (
            <div className={styles.feed}>{/* Need to find out why the animation css isn't working */}
                <p>Loading feed. This might take a while...</p>
                <img src='https://pbs.twimg.com/profile_images/1729909787029078016/dBjB3Fnr_400x400.jpg' className={styles.feedLoadingImage}></img>
            </div>
        )
    } else if (!feedResults) {
        return <p className={styles.feed}>Could not find any data</p>
    } else if (hasError) {
        return <p className={styles.feed}>Error fetching posts. This is probably gonna take a while...</p>;
    }

    return (
        <div className={styles.feed}>
            <InspirationSection />
            {/*{feedResults.map(feedResult => <FeedTile feedResult={feedResult.data}/>)}*/}
            {/* Line below seems to be working well, but should I set it up differently? */}
            {searchTerm === '' ? feedResults.map(feedResult => <FeedTile feedResult={feedResult.data} key={feedResult.data.id}/>) : searchedFeedResults.map(searchedFeedResult => <FeedTile feedResult={searchedFeedResult.data} key={searchedFeedResult.data.id} />)}
        </div>
    )
}

//searchedFeedResults.map(searchedFeedResult => <FeedTile searchedFeedResult={searchedFeedResult.data} />)
{/*{searchTerm === '' ? feedResults.map(feedResult => <FeedTile feedResult={feedResult.data}/>) : searchedFeedResults.map(searchedFeedResult => <FeedTile searchedFeedResult={searchedFeedResult.data} />}*/}