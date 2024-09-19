import React from 'react';
import styles from './PanelTile.module.css';
//import { images } from '../../assets/images';
import { useDispatch } from 'react-redux';
import {fetchFeed } from '../feed/FeedSlice';


export const PanelTile = ( {popularSub} ) => {
    
    const dispatch = useDispatch();

    const permalink = popularSub.data.url;
    const lengthMinusOne = permalink.length - 1;
    const poppedPermalink = permalink.substring(0, lengthMinusOne);
    const url = `reddit.com${poppedPermalink}.json`;
    
    const handleSubredditClick = () => {
        const lengthMinusOne = popularSub.data.url.length - 1;
        const poppedUrl = popularSub.data.url.substring(0, lengthMinusOne);
        const subUrl = `reddit.com${poppedUrl}.json`;
        alert(url);
        dispatch(fetchFeed(url)); //reddit.com${popularSub.data.url}.json
    }

    return (
        <div onClick={handleSubredditClick}>
            <div className={styles.sectionResult}>
                <img src='https://png.pngtree.com/png-vector/20230120/ourmid/pngtree-neon-square-frame-clipart-png-image_6568438.png' ></img>
                <h6>{popularSub.data.display_name_prefixed}</h6>
            </div>
        </div>
    )
}