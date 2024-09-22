import React from 'react';
import { images } from '../../assets/images';
import styles from './Logo.module.css';
import { Link } from 'react-router-dom';

export const Logo = () => {
    return (
        <Link to='/'>{/* Would need to set up other url routing in order for a "Link to" value to be functional here */}
            <img className={styles.logoMain} src={images.logoMain} alt="Reddit logo, which is a comment bubble that contains a white alien-looking head with orange eyes and a single antennae. To the right of the comment bubble is the word 'Reddit.'"></img>
        </Link>
    )
};