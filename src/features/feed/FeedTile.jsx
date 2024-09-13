import React from 'react';
import styles from './FeedTile.module.css';
//For testing what images of different sizes will look like and writing corresponding css
import { images } from '../../assets/images';

//To do
//Add functionality for upvoting and downvoting to impact state and nums presented
//Remove var declarations and conditionals at top of component into separate file
//Style upvote and downvote buttons


export const FeedTile = ( {feedResult} ) => {

    //Need to store following code in a utility file so this component is cleaner?

    const postCreatedUtcInMs = feedResult.created_utc * 1000;
    const currentDate = Date.now();
    const elapsedTimeInMs = currentDate - postCreatedUtcInMs;
    const elapsedTimeInMinutes = Math.floor(elapsedTimeInMs / (1000 * 60));
    const elapsedTimeInHours = Math.floor(elapsedTimeInMinutes / 60);
    const elapsedTimeInDays = Math.floor(elapsedTimeInHours / 24);
    const elapsedTimeInMonths = Math.floor(elapsedTimeInDays / 30);
    const elapsedTimeInYears = Math.floor(elapsedTimeInDays / 365);

    let postTime;
    if (elapsedTimeInMinutes < 60) {
        postTime = `${elapsedTimeInMinutes} min. ago`;
    } else if (elapsedTimeInHours < 24 ) {
        postTime = `${elapsedTimeInHours} hr. ago`;
    } else if (elapsedTimeInDays < 30) {
        if (elapsedTimeInDays === 1) {
            postTime = `${elapsedTimeInDays} day ago`;
        } else {
            postTime = `${elapsedTimeInDays} days ago`;
        }
    } else if (elapsedTimeInMonths < 12) {
        if (elapsedTimeInMonths === 1) {
            postTime = `${elapsedTimeInMonths} mo. ago`;
        } else {
            postTime = `${elapsedTimeInMonths} mos. ago`;
        }
    } else {
        if ( elapsedTimeInYears === 1) {
            postTime = `${elapsedTimeInYears} year ago`;
        } else {
            postTime = `${elapsedTimeInYears} years ago`;
        }
    };


    const upvotes = feedResult.ups;
    const upvotesInThousands = upvotes / 1000;
    const roundedTensUpvotesInThousands = upvotesInThousands.toFixed(1);
    const roundedUpvotesInThousands = Math.floor(upvotesInThousands);

    let postUpvotes;
    if (postUpvotes < 1000) {
        postUpvotes = upvotes;
    } else if (postUpvotes < 10000) {
        postUpvotes = `${roundedTensUpvotesInThousands}K`;
    } else {
        postUpvotes = `${roundedUpvotesInThousands}K`;
    };


    const numComments = feedResult.num_comments;
    const numCommentsInThousands = numComments / 1000;
    const roundedTensNumCommentsInThousands = numCommentsInThousands.toFixed(1);
    const roundedNumCommentsInThousands = Math.floor(numCommentsInThousands);

    let postNumComments;
    if (numComments < 1000) {
        postNumComments = `${numComments}`;
    } else if (numComments < 10000) {
        postNumComments = `${roundedTensNumCommentsInThousands}K`;
    } else {
        postNumComments = `${roundedNumCommentsInThousands}K`;
    }



    return (
        <div className={styles.feedTileDiv} key={feedResult.id}>
            <div className={styles.feedTileContainer}>
                {/*<p>{feedResult.author_fullname}</p>*/}
                <div className={styles.feedTileRowOne}>
                    <div className={styles.subredditContainer}>
                        {/* Placeholder for subreddit icon */}
                        <img src='https://png.pngtree.com/png-vector/20230120/ourmid/pngtree-neon-square-frame-clipart-png-image_6568438.png'></img>
                        <p><span className={styles.subredditName}>{`${feedResult.subreddit_name_prefixed}`}</span><span className={styles.timeSincePost}> • {postTime}</span></p>
                    </div>
                    
                    <button className={styles.joinButton}>Join</button>
                </div>
                <h4 className={styles.feedTileRowTwo}>{`${feedResult.title}`}</h4> {/*Should this be a header element, a p, a div, something else?*/}
                <div className={styles.feedTileRowThree} style={{backgroundImage: `url(${images.malibuTestWide})`}}>
                    {/*<p>Post Media - text, image, video, etc</p> */}{/* Will need to come up with a programmatic way of handling the type of media*/}
                    <img className={styles.feedTileRowThreeImage} src={images.malibuTestWide}></img>
                </div>
                {/*
                <div className={styles.bgTestContainer}>
                    <img className={styles.feedTileRowThreeImageTest} src={images.malibuTestWide}></img>
                    <div className={styles.rowThreeBgTest}><img className={styles.test} src={images.malibuTestWide}></img></div>
                </div>
                */}
                <div className={styles.feedTileRowFour}>
                    <div className={styles.voteInfo}>
                        <img className={styles.imgLeft} src='https://png.pngtree.com/png-vector/20230120/ourmid/pngtree-neon-square-frame-clipart-png-image_6568438.png'></img>
                        {/*<i class="fa-solid fa-thumbs-up"></i>*/}
                        <p>{postUpvotes}</p>
                        <img className={styles.imgRight} src='https://png.pngtree.com/png-vector/20230120/ourmid/pngtree-neon-square-frame-clipart-png-image_6568438.png'></img>
                    </div>
                    <div className={styles.commentInfo}>
                        {/*<img className={styles.imgLeft} src='https://png.pngtree.com/png-vector/20230120/ourmid/pngtree-neon-square-frame-clipart-png-image_6568438.png'></img>*/}
                        <i class="fa-solid fa-comment"></i>
                        <p>{postNumComments}</p>
                    </div>
                    <div className={styles.shareInfo}>
                        {/*<img className={styles.imgLeft} src='https://png.pngtree.com/png-vector/20230120/ourmid/pngtree-neon-square-frame-clipart-png-image_6568438.png'></img>*/}
                        <i class="fa-solid fa-share"></i>
                        <p>Share</p>
                    </div>
                </div>
                <div className={styles.commentsSection}>
                    <p>coomments</p>
                </div>
            </div>
        </div>
    )
}