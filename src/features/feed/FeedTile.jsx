import React from 'react';
import styles from './FeedTile.module.css';
//For testing what images of different sizes will look like and writing corresponding css
import { images } from '../../assets/images';
import { selectCommentsByPost, addCommentsForEachPost, fetchComments } from '../comments/commentsSlice';
import { useSelector, useDispatch } from 'react-redux';

//To do
//Add functionality for upvoting and downvoting to impact state and nums presented
//Remove var declarations and conditionals at top of component into separate file
//Style upvote and downvote buttons


export const FeedTile = ( {feedResult} ) => {

    const dispatch = useDispatch();
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
    if (upvotes < 1000) {
        postUpvotes = `${upvotes}`;
    } else if (upvotes < 10000) {
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

    

    const commentsByPost = useSelector(selectCommentsByPost);
    //Rethink the work done to update the comments state. What is actually important, and how can it be streamlined? Eg, is it helpful to construct the url and save it in state?
    const fetchCommentsForPost = async (permalink) => {
        //const commentsUrl = commentsByPost[postId].url;
        const length = permalink.length;
        const lastIndex = length - 1;
        const poppedPermalink = permalink.substring(0, lastIndex);
        const commentsUrl = `reddit.com${poppedPermalink}.json`;
        //alert(commentsUrl);
        //alert(commentsUrl + 'https://www.reddit.com/r/meirl/comments/1fhaiid/meirl.json')
        const response = await fetch(commentsUrl);
        const json = await response.json();
        //alert(json[0].kind);
        const topLevelCommentsArray = json[1].data.children //This is an array comprised of objects. Within each element, .data.body accesses the text of each top-level comment
        let condensedCommentsArray = [];
        topLevelCommentsArray.map((commentDetails) => {
            topLevelComment = commentDetails.data.body;
            condensedCommentsArray.push(topLevelComment);
        });
        alert(condensedCommentsArray);
        //dispatch(addCommentsForEachPost(condensedCommentsArray));
    }

    const permalink = feedResult.permalink;
    const length = permalink.length;
    const lengthMinusOne = length - 1;
    const poppedPermalink = feedResult.permalink.substring(0, lengthMinusOne);

    const handleCommentIconClick = (e) => {
        //const testTarget = e.target.getAttribute('data-test');
        alert(e.target.id);
        dispatch(fetchComments({id: e.target.id, postUrl: `reddit.com${poppedPermalink}.json`}));
        //fetchCommentsForPost(e.target.id);
    };

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
                    <div className={styles.commentInfo} onClick={handleCommentIconClick} id={feedResult.id}>
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
                {/*<button onClick={handleCommentIconClick} id={feedResult.permalink}>
                        <p>test 1</p>
                        <p>test 2</p>
            </button>*/}
                <div className={styles.commentsSection}> {/* Need to create and import a Comments component instead?*/}
                    <p>coomments</p>
                </div>
            </div>
        </div>
    )
}