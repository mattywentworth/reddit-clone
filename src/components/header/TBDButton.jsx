import { React } from 'react';
import styles from './TBDButton.module.css';
//Does every button need a "type"?
//How should this be structured? In a Nav element? Just an element in the Header?

export const HeaderButton = () => {
    return <button className={styles.button}>Inspire Me Please</button>
};