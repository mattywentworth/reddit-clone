import { React } from 'react';
import { images } from '../../assets/images';
import styles from './Logo.module.css';

export const Logo = () => {
    return <img className={styles.logoMain} src={images.logoMain} alt="Reddit logo, which is a comment bubble that contains a white alien-looking head with orange eyes and a single antennae. To the right of the comment bubble is the word 'Reddit.'"></img>
};