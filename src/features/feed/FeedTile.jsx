import { React } from 'react';
import styles from './FeedTile.module.css';
//For testing what images of different sizes will look like and writing corresponding css
import { images } from '../../assets/images';

export const FeedTile = () => {

    return (
        <div className={styles.feedTileDiv}>
            <div className={styles.feedTileContainer}>
                <div className={styles.feedTileRowOne}>
                    <p><span className={styles.subredditName}>r/subredditname</span><span className={styles.timeSincePost}> • time since post</span></p>
                    <button className={styles.joinButton}>Join</button>
                </div>
                <h4 className={styles.feedTileRowTwo}>Post Title</h4> {/*Should this be a header element, a p, a div, something else?*/}
                <div className={styles.feedTileRowThree} style={{backgroundImage: `url(${images.malibuTestWide})`}}>
                    {/*<p>Post Media - text, image, video, etc</p> */}{/* Will need to come up with a programmatic way of handling the type of media*/}
                    <img className={styles.feedTileRowThreeImage} src={images.malibuTestWide}></img>
                </div>
                <div className={styles.feedTileRowThree} >
                    <div style={{backgroundImage: `url(${images.malibuTestWide})`}}></div>
                    <img className={styles.feedTileRowThreeImage} src={images.malibuTestWide}></img>
                </div>
                <div className={styles.feedTileRowFour}>
                    <div>
                        <img></img>
                        <p>vote ct</p>
                        <img></img>
                    </div>
                    <div>
                        <img></img>
                        <p>comment ct</p>
                    </div>
                    <div>
                        <img></img>
                        <p>Share</p>
                    </div>
                </div>
            </div>
        </div>
    )
}