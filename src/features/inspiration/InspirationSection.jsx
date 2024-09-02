import React from 'react';
import styles from './InspirationSection.module.css';
import { InspirationBlock } from './InspirationBlock';

export const InspirationSection = () => {

    return (
        <div id='inspiration-section' className={styles.inspirationSection}>
            <InspirationBlock />
        </div>
    )
}