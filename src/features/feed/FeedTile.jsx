import React from 'react';
import styles from './FeedTile.module.css';
//For testing what images of different sizes will look like and writing corresponding css
import { images } from '../../assets/images';

export const FeedTile = () => {

    return (
        <div className={styles.feedTileDiv}>
            <div className={styles.feedTileContainer}>
                <div className={styles.feedTileRowOne}>
                    <div className={styles.subredditContainer}>
                        {/* Placeholder for subreddit icon */}
                        <img src='https://png.pngtree.com/png-vector/20230120/ourmid/pngtree-neon-square-frame-clipart-png-image_6568438.png'></img>
                        <p><span className={styles.subredditName}>r/subredditname</span><span className={styles.timeSincePost}> • time since post</span></p>
                    </div>
                    
                    <button className={styles.joinButton}>Join</button>
                </div>
                <h4 className={styles.feedTileRowTwo}>Post Title</h4> {/*Should this be a header element, a p, a div, something else?*/}
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
                        <p>vote ct</p>
                        <img className={styles.imgRight} src='https://png.pngtree.com/png-vector/20230120/ourmid/pngtree-neon-square-frame-clipart-png-image_6568438.png'></img>
                    </div>
                    <div className={styles.commentInfo}>
                        <img className={styles.imgLeft} src='https://png.pngtree.com/png-vector/20230120/ourmid/pngtree-neon-square-frame-clipart-png-image_6568438.png'></img>
                        <p>comment ct</p>
                    </div>
                    <div className={styles.shareInfo}>
                        <img className={styles.imgLeft} src='https://png.pngtree.com/png-vector/20230120/ourmid/pngtree-neon-square-frame-clipart-png-image_6568438.png'></img>
                        <p>Share</p>
                    </div>
                </div>
            </div>
        </div>
    )
}