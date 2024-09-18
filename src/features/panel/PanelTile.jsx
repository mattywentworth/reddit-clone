import React from 'react';
import styles from './PanelTile.module.css';
//import { images } from '../../assets/images';


export const PanelTile = ( {popularSub} ) => {
    
    return (
        <div>
            <div className={styles.sectionResult}>
                <img src='https://png.pngtree.com/png-vector/20230120/ourmid/pngtree-neon-square-frame-clipart-png-image_6568438.png' ></img>
                <h6>{popularSub.data.display_name_prefixed}</h6>
            </div>
        </div>
    )
}