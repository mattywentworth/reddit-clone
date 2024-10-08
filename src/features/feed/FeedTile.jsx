import React, { useEffect, useState } from 'react';
import styles from './FeedTile.module.css';
//For testing what images of different sizes will look like and writing corresponding css
import { images } from '../../assets/images';
import { selectCommentsByPost, addCommentsForEachPost, fetchComments, addPostUrl, selectIsLoading } from '../comments/commentsSlice';
import { fetchFeed } from './feedSlice';
import { useSelector, useDispatch } from 'react-redux';
import { CommentsTile} from '../comments/CommentsTile';

//To do
//Add functionality for upvoting and downvoting to impact state and nums presented
//Remove var declarations and conditionals at top of component into separate file
//Style upvote and downvote buttons


export const FeedTile = ( {feedResult} ) => {

    const [thumbsUpClicked, setThumbsUpClicked] = useState(false);
    const [thumbsDownClicked, setThumbsDownClicked] = useState(false);
    const [commentsVisible, setCommentsVisible] = useState(false);

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

    let selectedMedia;
    const imageStyles = styles.feedTileRowThreeImage;
    const rowThreeStylesVisualMedia = '';
    const rowThreeStylesText = '';
    //const textStyles = styles.feedTileRowThreeText;
    /*
    thumbnail values = self, a url (beginning with a. or b. or external-preview), default, spoiler. external-preview
    //post has a key that is secure_media.reddit_video object. Defauult also appears to have the secure_media object SOMETIMES
    //and sometimes comes with a preview.images object (like for a news article that's linked and has an image auto-populated)
    //BUT these are cdn images I can't access, so still need to use the thumbnail.*/
    /*const hiQualityImage = feedResult.url_overridden_by_dest;
    const hQCJpegAvail = hiQualityImage.includes('.jpeg');
    const hQCPngAvail = hiQualityImage.indexOf('.png');

    if (feedResult.thumbnail === 'self') {
        if (feedResult.selftext !== "" && feedResult.thumbnail === 'self') {
            selectedMedia = <p className={styles.feedTileRowThreeText}>{feedResult.selftext}</p>;
        } else {
            selectedMedia = <div></div>;
        }
    } else if (feedResult.secure_media) {
        if (feedResult.secure_media.reddit_video) {
            selectedMedia = <video controls style={{height: '500px'}} className={imageStyles}><source src={feedResult.secure_media.reddit_video.fallback_url} type='video/mp4'></source></video>;    
        } else if (feedResult.secure_media.type) {
            selectedMedia = <iframe src='https://www.youtube.com/embed/79P5PAacl9s' style={{height: '500px}'}} className={imageStyles}></iframe>
        }        
    } else if (feedResult.thumbnail) {
        if (feedResult.selftext === "") {
            if (hQCJpegAvail || hQCPngAvail) {
                selectedMedia = <img src={feedResult.url_overridden_by_dest} alt={feedResult.title} style={{height: '500px'}} className={imageStyles}></img>
            } else {
                selectedMedia = <img src={feedResult.thumbnail} alt={feedResult.title} style={{height: '500px'}} className={imageStyles}></img>
            }
        } else {
            if (hQCJpegAvail || hQCPngAvail) {
                selectedMedia = 
                    <div>
                        <img src={feedResult.url_overridden_by_dest} alt={feedResult.title} style={{height: '500px'}} className={imageStyles}></img>
                        <p className={styles.feedTileRowThreeText}>{feedResult.selftext}</p>
                    </div>
            } else {
                selectedMedia = 
                    <div>
                        <img src={feedResult.thumbnail} alt={feedResult.title} style={{height: '500px'}} className={imageStyles}></img>
                        <p className={styles.feedTileRowThreeText}>{feedResult.selftext}</p>
                    </div>
            }
        }
    }*/
/*USE url_overridden_by_dest whenever possible if it coontains .jpeg or .png (unless this value starts with WHAT??!! higher quality media.
    //so do if urloverriddenbydest includes .jpeg or .png do X, if not do Y and use the low qual thumbnail
    }
    
    */
    
    if (feedResult.secure_media === null) {
        if(feedResult.thumbnail === 'self' && feedResult.selftext !== "") {
            selectedMedia = <p className={styles.feedTileRowThreeText}>{feedResult.selftext}</p>;
        } else {
            selectedMedia = <img src={feedResult.thumbnail} alt={feedResult.title} style={{height: '500px'}} className={imageStyles}></img>
        }
    } else if (feedResult.secure_media.reddit_video) {
        selectedMedia = <video controls style={{height: '500px'}} className={imageStyles}><source src={feedResult.secure_media.reddit_video.fallback_url} type='video/mp4'></source></video>
    } else if (feedResult.url) {
        selectedMedia = <iframe src='https://www.youtube.com/embed/79P5PAacl9s' style={{height: '500px}'}} className={imageStyles}></iframe>
    } else {
        //need to use this to eliminate the parent div that's still taking up space
    }

    const handleSubredditClick = () => {
        const subredditExt = feedResult.subreddit_name_prefixed;
        const subUrl = `https://www.reddit.com/${subredditExt}.json`;
        dispatch(fetchFeed(subUrl)); //reddit.com${popularSub.data.url}.json
    }

    const permalink = feedResult.permalink;
    const length = permalink.length;
    const lengthMinusOne = length - 1;
    const poppedPermalink = feedResult.permalink.substring(0, lengthMinusOne);

    const commentsByPost = useSelector(selectCommentsByPost);
    const commentsForThisPost = commentsByPost[feedResult.id];
    const loadingComments = useSelector(selectIsLoading);
/*
    if (commentsForThisPost) {
    const commentCreatedUtcInMs = commentsForThisPost.createdTime * 1000;
    //const currentDate = Date.now();
    const elapsedTimeInMsComm = currentDate - commentCreatedUtcInMs;
    const elapsedTimeInMinutesComm = Math.floor(elapsedTimeInMsComm / (1000 * 60));
    const elapsedTimeInHoursComm = Math.floor(elapsedTimeInMinutes / 60);
    const elapsedTimeInDaysComm = Math.floor(elapsedTimeInHours / 24);
    const elapsedTimeInMonthsComm = Math.floor(elapsedTimeInDays / 30);
    const elapsedTimeInYearsComm = Math.floor(elapsedTimeInDays / 365);

    let commentTime;
    if (elapsedTimeInMinutesComm < 60) {
        commentTime = `${elapsedTimeInMinutesComm} min. ago`;
    } else if (elapsedTimeInHoursComm < 24 ) {
        commentTime = `${elapsedTimeInHoursComm} hr. ago`;
    } else if (elapsedTimeInDaysComm < 30) {
        if (elapsedTimeInDaysComm === 1) {
            commentTime = `${elapsedTimeInDaysComm} day ago`;
        } else {
            commentTime = `${elapsedTimeInDaysComm} days ago`;
        }
    } else if (elapsedTimeInMonthsComm < 12) {
        if (elapsedTimeInMonthsComm === 1) {
            commentTime = `${elapsedTimeInMonthsComm} mo. ago`;
        } else {
            commentTime = `${elapsedTimeInMonthsComm} mos. ago`;
        }
    } else {
        if ( elapsedTimeInYearsComm === 1) {
            commentTime = `${elapsedTimeInYearsComm} year ago`;
        } else {
            commentTime = `${elapsedTimeInYearsComm} years ago`;
        }
    };
}
*/
    //func to add post ids to panelslice before adding comments to each id
   /*const addPostIdAndFetchComments = () => {   
    //dispatch(addPostUrl({postId: feedResult.id, postPermalink: feedResult.permalink}));
        //setTimeout(()=> alert(commentsByPost[feedResult.id].postUrl), 5000); //this properly displayed the url added to state
        //alert(`reddit.com${poppedPermalink}.json`);
        /*setTimeout(()=> {
            dispatch(fetchComments({postId: feedResult.id, postUrl: `reddit.com${permalink}.json`}))
        }, 5000);*/
        //alert(commentsByPost[feedResult.id].postUrl);
        /*dispatch(fetchComments({postId: feedResult.id, postUrl: commentsByPost[feedResult.id].postUrl}))
    }*/

    const testHandleCommentsVis = () => {
        //const elementToExpose = document.getElementById(`${feedResult.id}commentSection`);
        //elementToExpose.style.display === 'none' ? elementToExpose.style.display = 'block' : elementToExpose.style.display = 'none';
        //alert(commentsVisible);
        commentsVisible ? setCommentsVisible(false) : setCommentsVisible(true);
    }

    const testXCommentsSection = (e) => {
        e.preventDefault();
        const elementToClose = document.getElementById(`${feedResult.id}commentSection`);
        //elementToClose.style.display = 'none';
        setCommentsVisible(false);
    }

    /*const commentsByPost = useSelector(selectCommentsByPost);*/
    //Rethink the work done to update the comments state. What is actually important, and how can it be streamlined? Eg, is it helpful to construct the url and save it in state?
    /*const fetchCommentsForPost = async (permalink) => {
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
    }*/

    //Due to the effort needed to manipulate state values, I'm choosing not to have the thumb clicks impact the actual upvote count
    const handleThumbUpClick = (e) => {
        const thumbUp = document.getElementById(e.target.id);
        const thumbDown = document.getElementById(`${feedResult.id}Down`);

        if (!thumbsUpClicked && !thumbsDownClicked) {
            setThumbsUpClicked(true);
            thumbUp.style.backgroundColor = 'green';
            thumbDown.style.backgroundColor = 'var(--color-bg-tertiary)';
        } else if (!thumbsUpClicked && thumbsDownClicked) {
            setThumbsUpClicked(true);
            setThumbsDownClicked(false);
            thumbUp.style.backgroundColor = 'green';
            thumbDown.style.backgroundColor = 'var(--color-bg-tertiary)';
        } else if (thumbsUpClicked && !thumbsDownClicked) {
            setThumbsUpClicked(false);
            thumbUp.style.backgroundColor = 'var(--color-bg-tertiary)';
        }
    }

    
    const handleThumbDownClick = (e) => {
        const thumbDown = document.getElementById(e.target.id);
        const thumbUp = document.getElementById(`${feedResult.id}Up`);

        if (!thumbsUpClicked && !thumbsDownClicked) {
            setThumbsDownClicked(true);
            thumbUp.style.backgroundColor = 'var(--color-bg-tertiary)';
            thumbDown.style.backgroundColor = 'red';
        } else if (!thumbsUpClicked && thumbsDownClicked) {
            setThumbsDownClicked(false);
            thumbDown.style.backgroundColor = 'var(--color-bg-tertiary)';
        } else if (thumbsUpClicked && !thumbsDownClicked) {
            setThumbsUpClicked(false);
            setThumbsDownClicked(true);
            thumbUp.style.backgroundColor = 'var(--color-bg-tertiary)';
            thumbDown.style.backgroundColor = 'red';
        }
    }
    

    const handleCommentIconClick = (e) => {
        dispatch(fetchComments({postId: feedResult.id, postUrl: `https://www.reddit.com${poppedPermalink}.json`}));
        testHandleCommentsVis();
    };

    //INVESTIGATE - Is this useEffect necessary? I haven't figured out a good alternate way to time the fetchComment dispatches
    //so that the comment id is actually available to the fetchComments func.
    //Does dispatch operate async? So can i have 2 async dispatch funcs in a row and have them execute in order?
    /*useEffect(() => {
        dispatch(addPostUrl({postId: feedResult.id, postPermalink: feedResult.permalink}));
    }, [dispatch]);*/
    
    //Accessibility - should the elements within each post that can be clicked be button elements?
    return (
        <div className={styles.feedTileDiv} key={feedResult.id}>
            <div className={styles.feedTileContainer}>
                
                {/*{feedResult.secure_media ? <p>{feedResult.secure_media.reddit_video.transcoding_status}</p> : <div>No Video</div>}*/}
                <div className={styles.feedTileRowOne}>
                    <div className={styles.subredditContainer} >
                        {/* Placeholder for subreddit icon */}
                        <img src='https://png.pngtree.com/png-vector/20230120/ourmid/pngtree-neon-square-frame-clipart-png-image_6568438.png'></img>
                        <p><span onClick={handleSubredditClick} className={styles.subredditName}>{`${feedResult.subreddit_name_prefixed}`}</span><span className={styles.timeSincePost}> • {postTime}</span></p>
                    </div>
                    <button className={styles.joinButton}>Join</button>
                </div>
                <h4 className={styles.feedTileRowTwo}>{`${feedResult.title}`}</h4> {/*Should this be a header element, a p, a div, something else?*/}
                <div className={feedResult.selftext !== "" ? styles.feedTileRowThreeVisualMediaContainer : styles.feedTileRowThreeTextContainer}> {/*style={{backgroundImage: `url(${images.malibuTestWide})`}*/}
                    {/*<p>Post Media - text, image, video, etc</p> */}{/* Will need to come up with a programmatic way of handling the type of media*/}
                    {/*<img className={styles.feedTileRowThreeImage} src={images.malibuTestWide}></img>*/}
                    {/*{feedResult.thumbnail === 'self' ? <p></p> : <img className={styles.feedTileRowThreeImage} src={feedResult.thumbnail} alt={feedResult.title} style={{height: '300px'}}></img>}*/}
                    {selectedMedia}
                </div>
                {/*
                <div className={styles.bgTestContainer}>
                    <img className={styles.feedTileRowThreeImageTest} src={images.malibuTestWide}></img>
                    <div className={styles.rowThreeBgTest}><img className={styles.test} src={images.malibuTestWide}></img></div>
                </div>
                */}
                <div className={styles.feedTileRowFour}>
                    <div className={styles.voteInfo}>
                        {/*<img className={styles.imgLeft} src='https://png.pngtree.com/png-vector/20230120/ourmid/pngtree-neon-square-frame-clipart-png-image_6568438.png'></img>*/}
                        {/*<div className={styles.iconLeft}><i class="fa-solid fa-arrow-up"></i></div>*/}
                        <p className={styles.imgLeft} id={`${feedResult.id}Up`} onClick={handleThumbUpClick}>👍</p>
                        <p>{postUpvotes}</p>
                        <p className={styles.imgRight} id={`${feedResult.id}Down`} onClick={handleThumbDownClick}>👎</p>
                        {/*<img className={styles.imgRight} src='https://png.pngtree.com/png-vector/20230120/ourmid/pngtree-neon-square-frame-clipart-png-image_6568438.png'></img>*/}
                    </div>
                    <div className={styles.commentInfo} onClick={handleCommentIconClick} id={feedResult.id}>{/* onClick={handleCommentIconClick}   onClick={testHandleCommentsVis} */}
                        <i class="fa-solid fa-comment"></i>
                        <p>{postNumComments}</p>
                    </div>
                    {/* Need to style this button */}
                    <button onClick={handleCommentIconClick}><i class="fa-solid fa-comment"></i>  {postNumComments}</button>
                    <div className={styles.shareInfo}>
                        {/*<img className={styles.imgLeft} src='https://png.pngtree.com/png-vector/20230120/ourmid/pngtree-neon-square-frame-clipart-png-image_6568438.png'></img>*/}
                        <i class="fa-solid fa-share"></i>
                        <p>Share</p>
                    </div>
                </div>
                
            </div>
            <div className={commentsVisible ? styles.commentsSectionVisible : styles.commentsSectionInvisible} id={`${feedResult.id}commentSection`}>
                <div className={styles.commentsSection} > {/* Need to create and import a Comments component instead? YES, and this will enable you to have the proper loading/error renders*/}
                    <div className={styles.commentsSectionTopRow}>
                        <p>{feedResult.title}</p>
                        <button onClick={testXCommentsSection} className={styles.closeButton}>❌</button>
                    </div>
                    
                    {/*<div className={styles.feedTileRowOne}>
                        <div className={styles.subredditContainer}>
                            <img src='https://png.pngtree.com/png-vector/20230120/ourmid/pngtree-neon-square-frame-clipart-png-image_6568438.png'></img>
                            <p><span className={styles.subredditName}>{`${feedResult.subreddit_name_prefixed}`}</span><span className={styles.timeSincePost}> • {postTime}</span></p>
                        </div>
                    </div>*/}
                    {loadingComments ? <p className={styles.commentsLoading}>Loading comments...</p> : <div></div>}
                    {commentsForThisPost ? commentsForThisPost.map((comment) => {
                        return (
                            <div className={styles.commentContainer} key={{/*NEED TO INSERT A COMMENT ID HERE */}}>
                                <div className={styles.commentTopRow}>
                                    <img className={styles.userIcon} src='https://png.pngtree.com/png-vector/20230120/ourmid/pngtree-neon-square-frame-clipart-png-image_6568438.png'></img>
                                    <p><span className={styles.userName}>{comment.author}</span><span className={styles.timeSincePost}> • *Need to fix time calculation* {/*{commentTime}*/}</span></p>
                                </div>
                                <p className={styles.commentText}>{comment.comment}</p>
                            </div>
                        )
                    }) : <div></div>}
                </div>
            </div>
            {/*{commentsForThisPost ? <CommentsTile className={commentsVisible ? styles.commentsSectionVisible : styles.commentsSectionInvisible} id={`${feedResult.id}commentSection`} feedResult={feedResult} comments={commentsForThisPost} commentsVisible={commentsVisible} /> : <div></div>}*/}
        </div>
    )
}