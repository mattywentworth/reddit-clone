import { React } from 'react';
import styles from '../feed/FeedTile.module.css';


export const CommentsTile = ({feedResult, comments, commentsVisible}) => {

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

    return (
        <div className={commentsVisible ? styles.commentsSectionVisible : styles.commentsSectionInvisible} id={`${feedResult.id}commentSection`}>
            <div className={styles.commentsSection} > {/* Need to create and import a Comments component instead? YES, and this will enable you to have the proper loading/error renders*/}
                <button onClick={testXCommentsSection} className={styles.closeButton}>❌</button>
                <div className={styles.feedTileRowOne}>
                    <div className={styles.subredditContainer}>
                        {comments.map((comment) => {
                            return (
                                <div>
                                    <p>{comment}</p>
                                </div>
                            )
                        })}
                        {/* Placeholder for subreddit icon */}
                        {/*<img src='https://png.pngtree.com/png-vector/20230120/ourmid/pngtree-neon-square-frame-clipart-png-image_6568438.png'></img>*/}
                        {/*<p><span className={styles.subredditName}>{`${feedResult.subreddit_name_prefixed}`}</span><span className={styles.timeSincePost}> • {postTime}</span></p>*/}
                    </div>
                </div>
                <p>Post comment goes here.</p>
            </div>
        </div>
    )
}