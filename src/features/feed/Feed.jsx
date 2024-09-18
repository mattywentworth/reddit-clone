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
        dispatch(fetchFeed());
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
    
    if (isLoadingFeed || feedResults.length === 0) {
        return <div>Loading feed...</div>;
    } else if (hasError) {
        return <div>Error loading...</div>;
    }

    return (
        <div className={styles.feed}>
            <InspirationSection />
            {/*{feedResults.map(feedResult => <FeedTile feedResult={feedResult.data}/>)}*/}
            {/* Line below seems to be working well, but should I set it up differently? */}
            {searchTerm === '' ? feedResults.map(feedResult => <FeedTile feedResult={feedResult.data} key={feedResult.data.id}/>) : searchedFeedResults.map(searchedFeedResult => <FeedTile feedResult={searchedFeedResult.data} key={feedResult.data.id} />)}
        </div>
    )
}

//searchedFeedResults.map(searchedFeedResult => <FeedTile searchedFeedResult={searchedFeedResult.data} />)
{/*{searchTerm === '' ? feedResults.map(feedResult => <FeedTile feedResult={feedResult.data}/>) : searchedFeedResults.map(searchedFeedResult => <FeedTile searchedFeedResult={searchedFeedResult.data} />}*/}