import { React } from 'react';
import styles from './Feed.module.css';

export const Feed = () => {
    return (
        <div className={styles.feed}>
            <h1>This is a test</h1>
            <p>The test continues</p>
            <p>and continues some more</p>
            <p>and is over for now.</p>
            <button className={styles.testButton}>another test</button>
        </div>
    )
}