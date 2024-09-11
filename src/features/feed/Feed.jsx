import React, { useEffect } from 'react';
import styles from './Feed.module.css';
import { FeedTile } from './FeedTile';
import { InspirationSection } from '../inspiration/InspirationSection';
import { useSelector, useDispatch } from 'react-redux';
import { selectFeed, isLoading, fetchFeed, selectError } from './feedSlice';

export const Feed = () => {
    
    const dispatch = useDispatch();
    
    


    const feedResults = useSelector(selectFeed);
    const isLoadingFeed = useSelector(isLoading);
    const hasError = useSelector(selectError);

    useEffect(() => {
        dispatch(fetchFeed());
    }, [dispatch]);

    //const dataTest = feedResults[0].data.after;
    
    if (isLoadingFeed) {
        return <div>Loading feed...</div>;
    } else if (hasError) {
        return <div>Error loading...</div>;
    }

    return (
        <div className={styles.feed}>
            <InspirationSection />
            {feedResults.map(feedResult => <FeedTile feedResult={feedResult.data} />)}
            {/*  <FeedTile feedResults={feedResults} />*/}
            <h1>This is a test</h1>
            {feedResults.map((post) => <p>{post.data.subreddit}</p>)}
            <p>The test continues</p>
            <p>and continues some more</p>
            <p>and is over for now.</p>
            <button className={styles.testButton}>another test</button>
        </div>
    )
}