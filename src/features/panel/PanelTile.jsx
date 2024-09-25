import React from 'react';
import styles from './PanelTile.module.css';
//import { images } from '../../assets/images';
import { useDispatch } from 'react-redux';
import { fetchFeed } from '../feed/feedSlice';
import { Link } from 'react-router-dom';


export const PanelTile = ( {popularSub, testUrl} ) => {
    
    const dispatch = useDispatch();

    const permalink = popularSub.data.url;
    const lengthMinusOne = permalink.length - 1;
    const poppedPermalink = permalink.substring(0, lengthMinusOne);
    const url = `reddit.com${poppedPermalink}.json`;
    
    const handleSubredditClick = () => {
        const lengthMinusOne = popularSub.data.url.length - 1;
        const poppedUrl = popularSub.data.url.substring(0, lengthMinusOne);
        const subUrl = `https://www.reddit.com${poppedUrl}.json`;
        dispatch(fetchFeed(subUrl));//Is this something that should trigger a change in the url?
        //I think ideally it would be the name of the sub that's loaded into the Feed component
    }

    return (
        <div>
        <Link >
        <div onClick={handleSubredditClick}> {/* Need to incorporate a way for the clicked subreddit tile to mimic :hover styling */}
            <div className={styles.sectionResult}>
                <img src='https://png.pngtree.com/png-vector/20230120/ourmid/pngtree-neon-square-frame-clipart-png-image_6568438.png' ></img>
                <h6>{popularSub.data.display_name_prefixed}</h6>
            </div>
        </div>
        </Link>
        </div>
    )
}