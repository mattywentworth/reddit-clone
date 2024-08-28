import React, { useState } from 'react';
import styles from './TBDButton.module.css';
//Does every button need a "type"?
//How should this be structured? In a Nav element? Just an element in the Header?

export const HeaderButton = () => {
    {/*

    This is not the way to handle DOM manipulation. Haven't learned useRefs yet, but looks like that's what I need to do in
    order to accomplish a menu type functionality.

    const inspirationSection = document.getElementById('inspiration-section');

    const exposeInspiration = () => {
        inspirationSection.style.display = 'block';
    }

    */}

    return <button id='headerButton' className={styles.button} >Inspire Me Please</button>
};